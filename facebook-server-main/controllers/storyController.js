const cloudinary = require('cloudinary').v2;
const Story = require('../models/storyModel'); // Đảm bảo đường dẫn đến file storyModel.js chính xác
const User = require('../models/userModel');
const uploadStory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No image file provided');
    }
    console.log('Original file name:', req.file.originalname); // Thêm dòng này để gỡ lỗi
    console.log('File size:', req.file.size, 'bytes'); // Thêm dòng này để gỡ lỗi

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      {
        resource_type: 'image',
        public_id: req.file.originalname,
        folder: 'stories',
      }
    );
    const expiresIn = 24 * 60 * 60 * 1000; // 24 giờ tính bằng mili giây
    const expiresAt = new Date(Date.now() + expiresIn);
    // Tạo một đối tượng Story mới với URL của ảnh
    const newStory = new Story({
      // user: req.user ? req.user.id : '60a7e25b6f986e7f1848b5e7', // Giả sử req.user chứa thông tin người dùng hiện tại đã đăng nhập
      user: req.body.user,
      content: result.secure_url, // Sử dụng trường 'content' thay vì 'imageUrl'
      expiresAt,
      // Thêm các trường khác của schema Story nếu cần thiết
    });

    // Lưu đối tượng Story vào cơ sở dữ liệu
    await newStory.save();

    res.status(201).json({ url: result.secure_url });
  } catch (error) {
    console.error('Error uploading story:', error);
    res.status(500).send('Error uploading story');
  }
};
const getAllStories = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).send('User not authenticated');
    }

    const allStories = await Story.getAllStories(req.user.id);

    res.status(200).json({ stories: allStories.stories });
  } catch (error) {
    console.error('Error getting all stories:', error);
    res.status(500).send('Error getting all stories');
  }
};

module.exports = {
  uploadStory,
  getAllStories,
};
