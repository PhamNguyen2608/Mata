const mongoose = require('mongoose');
const { Schema } = mongoose;

const userIPSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: null,
  },
});

const UserIP = mongoose.model('UserIP', userIPSchema);

module.exports = UserIP;
