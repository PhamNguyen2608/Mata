// const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '../.env') });
// const Post = require('../models/postModel');
// const User = require('../models/userModel');
// const mongoose = require('mongoose');
// const catchAsync = require('../utils/catchAsync');
// const APIFeatures = require('../utils/apiFeatures');
// const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');
// const axios = require('axios');
// const sharp = require('sharp');
// const Notification = require('../utils/notification');
// require('dotenv').config();

// const PROTO_PATH = path.join(__dirname, './image_service.proto');

// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });

// const image_service_proto =
//   grpc.loadPackageDefinition(packageDefinition).image_service;

// async function deactivatePosts(postIds) {
//   await Post.updateMany(
//     { _id: { $in: postIds } },
//     { $set: { is_active: false } }
//   );
// }

// async function processImages(postImages) {
//   const images = await Promise.all(
//     postImages.map(async (postImage) => {
//       const response = await axios.get(postImage.imageUrl, {
//         responseType: 'arraybuffer',
//       });
//       const buffer = Buffer.from(response.data, 'binary');
//       const imageBuffer = await sharp(buffer).toBuffer();
//       return {
//         image_data: imageBuffer,
//         post_id: postImage.postId,
//       };
//     })
//   );

//   const client = new image_service_proto.ImageService(
//     'localhost:50051',
//     grpc.credentials.createInsecure()
//   );

//   const imageRequests = {
//     images,
//   };

//   return new Promise((resolve, reject) => {
//     client.ProcessImages(imageRequests, (err, response) => {
//       if (err) {
//         console.error('Error:', err);
//         reject(err);
//       } else {
//         console.log('Response:', response);
//         resolve(response.post_ids);
//       }
//     });
//   });
// }

// exports.PostScanner = catchAsync(async () => {
//   const features = new APIFeatures(
//     Post.find({ is_active: true }).populate('user', '_id'),
//     {
//       limit: 10,
//       sort: '-createdAt',
//     }
//   )
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const posts = await features.query;

//   const postsWithImages = posts.filter(
//     (post) => post.images && post.images.length > 0
//   );
//   console.log('postsWithImages: ', postsWithImages);
//   const allPostImages = await Promise.all(
//     postsWithImages.map(async (post) => {
//       return await Promise.all(
//         post.images.map(async (image) => {
//           const buffer = await axios
//             .get(image, { responseType: 'arraybuffer' })
//             .then((response) => {
//               const buffer = Buffer.from(response.data, 'binary');
//               return sharp(buffer).toBuffer();
//             });
//           return { postId: post._id, imageUrl: image, buffer };
//         })
//       );
//     })
//   );
//   async function sendNotificationsToUsers(userIds) {
//     const recipients = await User.find({ _id: { $in: userIds } }).select(
//       'fcmToken username'
//     );
//     const systemSender = {
//       _id: mongoose.Types.ObjectId(),
//       first_name: 'Mata',
//       username: 'system',
//       photo:  `${process.env.FRONTEND_URL}/images/mata-logo-main.png`,
//     };

//     const notifications = await Promise.all(
//       recipients.map(async (recipient) => {
//         const notification = new Notification({
//           recipient: recipient,
//           sender: systemSender,
//         });
//         await notification.sendPolicyViolation();
//         return notification;
//       })
//     );
//     return notifications;
//   }

//   const postImages = allPostImages.flat();
//   const postIdsToDeactivate = await processImages(postImages);

//   // Tạo một Set từ mảng postIdsToDeactivate để tìm kiếm nhanh hơn
//   const postIdsToDeactivateSet = new Set(postIdsToDeactivate);

//   // Lọc ra những bài đăng có id nằm trong danh sách postIdsToDeactivate
//   const postsToDeactivate = postsWithImages.filter((post) =>
//     postIdsToDeactivateSet.has(post._id.toString())
//   );

//   // Lấy id của người dùng từ những bài đăng cần hủy kích hoạt
//   const userIdsToDeactivate = postsToDeactivate.map((post) => post.user._id);

//   console.log('User IDs to deactivate:', userIdsToDeactivate);
//   // Gửi thông báo đến người dùng
//   await sendNotificationsToUsers(userIdsToDeactivate);
//   await deactivatePosts(postIdsToDeactivate);
// });
