const mongoose = require('mongoose');
const validator = require('validator');

const { ObjectId } = mongoose.Schema;

const reportSchema = new mongoose.Schema(
  {
    post: {
      type: ObjectId,
      ref: 'Post',
      required: true,
    },

    annunciator: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },

    blocked: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

reportSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'post',
  })
  next();
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
