const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      error: 'Email and password are required.'
    });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'User does not exists.'
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Incorrect password.'
      });
    }
    user = user.toJSON();
    const { id, name } = user;
    const payload = {
      sub: id,
      name,
      email
    };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '7d'
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: config.env !== 'development'
    });
    return res.status(200).json({
      user: {
        id,
        name,
        email
      }
    });
  } catch (e) {
    return res.status(500).json({
      error: 'Internal server error.'
    });
  }
};

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: 'Email already exists.'
      });
    }
    user = new User({ name, email, password });
    try {
      await user.save();
      return res.status(200).json({
        message: 'Sign up success. Please sign in.'
      });
    } catch (e) {
      return res.status(401).json({
        error: 'Error creating user. Try signing up again.'
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: 'Internal server error.'
    });
  }
};

exports.authenticatedUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({});
  }
  const { sub: id, name, email } = jwt.verify(token, config.jwtSecret);
  if (!id || !name || !email) {
    return res.status(401).json({
      error: 'Invalid token.'
    });
  }
  res.status(200).json({
    user: {
      id,
      name,
      email
    }
  });
};

exports.signOut = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({
    message: 'Signed out successfully'
  });
};
