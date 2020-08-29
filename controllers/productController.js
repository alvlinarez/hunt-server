const Product = require('../models/Product');
const Comment = require('../models/Comment');

exports.getProducts = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const products = await Product.find({ creator: userId });
    if (!products) {
      return res.status(401).json({ error: 'No products found' });
    }
    return res.status(200).json({ products });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProduct = async (req, res) => {
  const { productId } = req.params;
  const { id: userId } = req.user;
  if (!productId) {
    return res.status(401).json({ error: 'productId required' });
  }
  try {
    const product = await Product.findOne({ _id: productId, creator: userId });
    if (!product) {
      return res.status(401).json({ error: 'Product not found' });
    }
    return res.status(200).json({ product });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createProduct = async (req, res) => {
  const { id: userId } = req.user;
  const { name, description, company, url, urlImage } = req.body;
  try {
    let product = await Product.findOne({ creator: userId, name });
    if (product) {
      return res
        .status(401)
        .json({ error: 'Product with that name already exists' });
    }
    product = Product({
      name,
      description,
      company,
      url,
      urlImage,
      creator: userId,
      comments: [],
      hasVoted: []
    });
    product = await product.save();
    product = product.toJSON();
    return res.status(200).json({ product });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(401).json({ error: 'productId required' });
  }
  const { id: userId } = req.user;
  const { name, description, company, url, urlImage, votes } = req.body;
  try {
    let product = await Product.findOneAndUpdate(
      {
        _id: productId,
        creator: userId
      },
      {
        name,
        description,
        company,
        url,
        urlImage
      },
      {
        new: true
      }
    );
    if (!product) {
      return res.status(401).json({ error: 'Product not found' });
    }
    return res.status(200).json({ product });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.voteProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(401).json({ error: 'productId required' });
  }
  const { id: userId } = req.user;
  try {
    let product = await Product.findOneAndUpdate(
      { _id: productId, hasVoted: { $ne: userId } },
      { $addToSet: { hasVoted: userId }, $inc: { votes: 1 } },
      { new: true }
    );
    if (!product) {
      return res
        .status(401)
        .json({ error: 'Product not found or vote already exists' });
    }
    return res.status(200).json({ product });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.unvoteProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(401).json({ error: 'productId required' });
  }
  const { id: userId } = req.user;
  try {
    let product = await Product.findOneAndUpdate(
      { _id: productId, hasVoted: userId },
      { $pull: { hasVoted: userId }, $inc: { votes: -1 } },
      { new: true }
    );
    if (!product) {
      return res
        .status(401)
        .json({ error: 'Product not found or not voted yet' });
    }
    return res.status(200).json({ product });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addCommentToProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(401).json({ error: 'productId required' });
  }
  const { id: userId } = req.user;
  const { message } = req.body;
  if (!message) {
    return res.status(401).json({ error: 'message is required' });
  }
  try {
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(401).json({ error: 'Product not found' });
    }
    let comment = new Comment({ message, creator: userId });
    await comment.save();
    product = await Product.findOneAndUpdate(
      { _id: productId },
      { $addToSet: { comments: comment._id } },
      { new: true }
    );
    if (!product) {
      return res.status(401).json({ error: 'Product not found' });
    }
    return res.status(200).json({ product });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeCommentFromProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(401).json({ error: 'productId required' });
  }
  const { commentId } = req.body;
  if (!commentId) {
    return res.status(401).json({ error: 'commentId is required' });
  }
  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      { $pull: { comments: commentId } },
      { new: true }
    );
    if (!product) {
      return res.status(401).json({ error: 'Product not found' });
    }
    const comment = await Comment.findOneAndDelete({ _id: commentId });
    if (!comment) {
      return res.status(401).json({ error: 'Comment not found' });
    }
    return res.status(200).json({ product });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(401).json({ error: 'productId required' });
  }
  const { id: userId } = req.user;
  try {
    let product = await Product.findOne({
      _id: productId,
      creator: userId
    });
    if (!product) {
      return res.status(401).json({ error: 'Project not found.' });
    }
    const commentIds = product.comments.map((comment) => comment.id);
    await Comment.deleteMany({ _id: { $in: commentIds } });
    await product.delete();
    return res.status(200).json({
      message: 'Product deleted'
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
