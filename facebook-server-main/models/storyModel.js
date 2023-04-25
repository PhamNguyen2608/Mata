const mongoose = require('mongoose');
const Follow = require('./followModel'); // Đảm bảo đường dẫn đến file followModel.js chính xác

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});
storySchema.statics.getAllStories = async function (userId) {
  const following = await Follow.find({ sender: userId });
  const followingIds = following.map((follow) => follow.recipient);
  followingIds.unshift(mongoose.Types.ObjectId(userId));

  const allStories = await this.aggregate([
    {
      $match: {
        user: { $in: followingIds },
        is_active: true,
        expiresAt: { $gt: new Date() },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $addFields: {
        'user.fullName': {
          $concat: ['$user.first_name', ' ', '$user.last_name'],
        },
      },
    },
    {
      $project: {
        'user.fullName': 1,
        'user.photo': 1,
        'user._id': 1,
        content: 1,
      },
    },
  ]);
  return { stories: allStories };
};

storySchema.statics.getStoryById = async function (storyId, userId) {
  // Tìm story có storyId
  const story = await this.findOne({
    _id: storyId,
    is_active: true,
    expiresAt: { $gt: new Date() },
  }).populate('user', 'username', 'last_name');

  // Kiểm tra xem story có thuộc về người dùng hiện tại không
  if (
    story &&
    (story.user._id.toString() === userId.toString() ||
      (await Follow.findOne({ sender: userId, recipient: story.user._id })) !==
        null)
  ) {
    return story;
  } else {
    return null;
  }
};

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
