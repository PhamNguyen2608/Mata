const mongoose = require('mongoose');
const User = require('../models/userModel');
const Friend = require('../models/friendsModel');
const Reaction = require('../models/reactionModel');
const NotificationModel = require('../models/notificationModel');

const Follow = require('../models/followModel');
const Post = require('../models/postModel');
const Report = require('../models/reportModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const APIFeatures = require('../utils/apiFeatures');
const { getImages, uploadToCloudinary } = require('../utils/cloudinaryHandler');
const multer = require('multer');
const sharp = require('sharp');
const getRelationship = require('../utils/getRelationship');

const ObjectId = mongoose.Types.ObjectId;

exports.indexUser = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    User.find(),
    req.query
  )
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: { users: users },
  });
});

exports.actionUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { is_active } = req.body;

  const existingUser = await User.findById(userId);
  if (!existingUser) return next(new AppError('No user found', 400));
  existingUser.is_active = is_active
  await existingUser.save({ validateBeforeSave: false });

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: { user: existingUser },
  });
});

exports.indexPost = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const posts = await features.query;
  
  // console.log(reactions);
  res.status(200).json({
    status: 'success',
    length: posts.length,
    data: posts,
  });
});


exports.getPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const existingPost = await Post.findById(postId);
  if (!existingPost) return next(new AppError('No post found', 400));
  
  // Send reponse
  res.status(200).json({
    status: 'success',
    data: { post: existingPost },
  });
});

exports.actionPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const { is_active } = req.body;

  const existingPost = await Post.findById(postId);
  console.log(postId, existingPost);
  if (!existingPost) return next(new AppError('No post found', 400));
  existingPost.is_active = is_active
  await existingPost.save({ validateBeforeSave: false });

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: { post: existingPost },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const existingPost = await Post.findById(postId);
  
  if (!existingPost) return next(new AppError('No post found', 400));
  existingPost.deleted = true;
  await existingPost.save({ validateBeforeSave: false });

  // Send reponse
  res.status(200).json({
    status: 'success',
    data: { post: existingPost },
  });
});

exports.indexReport = catchAsync(async (req, res, next) => {
  const countReportPost = await Report.aggregate([
    {"$group" : {_id:"$post", count_report:{$sum:1}}}
  ]).exec()

  const rs =  await Promise.all(countReportPost.map(async (post) => {
    post.post = await Post.findById(post._id)
    return post
  }));
  
  res.status(200).json({
    status: 'success',
    data: rs,
  });
});

exports.statistical = catchAsync(async (req, res, next) => {
  const startDate = new Date();
  startDate.setUTCHours(0,0,0,0);
  const endDate = new Date();
  endDate.setUTCHours(23,59,59,999);

  const countUser = await User.aggregate([
    {"$match":{"createdAt":{"$gte":startDate, "$lte":endDate}}},
    {"$group" : {_id: null, count: { $sum:1 }}}
  ]).exec()
  const countPost = await Post.aggregate([
    {"$match":{"createdAt":{"$gte":startDate, "$lte":endDate}}},
    {"$group" : {_id: null, count: { $sum:1 }}}
  ]).exec()
  
  res.status(200).json({
    status: 'success',
    data: {user: countUser, post: countPost},
  });
});