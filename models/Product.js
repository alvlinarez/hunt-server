const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    company: {
      type: String,
      trim: true,
      required: true
    },
    url: {
      type: String,
      trim: true,
      required: true
    },
    urlImage: {
      type: String,
      trim: true,
      required: true
    },
    votes: {
      type: Number,
      default: 0
    },
    hasVoted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Method to fill products with creator, hasVoted, and comments fields
const autoPopulate = function (next) {
  this.populate([
    {
      path: 'creator'
    },
    {
      path: 'hasVoted'
    },
    {
      path: 'comments'
    }
  ]);
  next();
};

productSchema
  .pre('find', autoPopulate)
  .pre('findOne', autoPopulate)
  .pre('findOneAndUpdate', autoPopulate)
  .pre('update', autoPopulate);

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Product', productSchema);
