const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema)
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
​const protect = async (req, res, next) => {
let token;
​if (
req.headers.authorization &&
req.headers.authorization.startsWith('Bearer')
) {
try {
token = req.headers.authorization.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id).select('-password');
next();
} catch (error) {
console.error(error);
res.status(401).json({ message: 'Not authorized, token failed' });
}
}
​if (!token) {
res.status(401).json({ message: 'Not authorized, no token' });
}
};
​module.exports = { protect };
