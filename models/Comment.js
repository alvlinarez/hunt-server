const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Method to fill comments with creator field
const autoPopulate = function (next) {
  this.populate([
    {
      path: 'creator'
    }
  ]);
  next();
};

commentSchema
  .pre('find', autoPopulate)
  .pre('findOne', autoPopulate)
  .pre('findOneAndUpdate', autoPopulate)
  .pre('update', autoPopulate);

commentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Comment', commentSchema);
