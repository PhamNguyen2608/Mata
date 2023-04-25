const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const Report = require('../models/reportModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.store = catchAsync(async (req, res, next) => {
  const { post } = req.body;
  const annunciator = req.user.id;

  const newReport = await Report.create({
    post,
    annunciator,
  });

  await newReport.save();

  res.status(200).json({
    status: 'success',
    data: newReport,
  });
});
