const jwt = require('jsonwebtoken');
// Middleware xác thực token JWT
module.exports.verifyToken = function(req, res, next) {
  // Lấy token từ header Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Không có token, yêu cầu xác thực' });
  }
  try {
    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET là secret key của bạn
    req.user = decoded; // Gán thông tin người dùng vào request
    next(); // Tiếp tục xử lý yêu cầu
  } catch (err) {
    res.status(400).json({ message: 'Token không hợp lệ' });
  }
};
