require('dotenv').config(); // Đảm bảo biến môi trường được tải từ .env
const createError = require('http-errors'); // Dùng để xử lý lỗi HTTP
const express = require('express'); // Web framework
const path = require('path'); // Để xử lý đường dẫn
const cookieParser = require('cookie-parser'); // Xử lý cookies
const logger = require('morgan'); // Ghi log request
const mongoose = require('mongoose'); // Kết nối MongoDB
const session = require('express-session'); // Quản lý session người dùng
const passport = require('passport'); // Quản lý xác thực người dùng
const flash = require('connect-flash'); // Xử lý flash messages
const compression = require('compression'); // Nén dữ liệu
const MongoDBStore = require('connect-mongodb-session')(session); // Lưu trữ session vào MongoDB
const Cart = require('./models/cart'); // Model giỏ hàng
const jwt = require('jsonwebtoken'); // Để tạo JWT (nếu cần)
const Product = require('./models/product'); // Model sản phẩm
const shopRouter = require('./routes/shop'); // Routes cho cửa hàng
const authRouter = require('./routes/auth'); // Routes cho đăng nhập/đăng ký
const productRouter = require('./routes/products'); // Routes cho sản phẩm
const app = express();

// Kích hoạt nén dữ liệu để tăng hiệu suất
app.use(compression());
// Middleware hỗ trợ log request
app.use(logger('dev')); // Ghi log request vào console
app.use(express.json()); // Xử lý dữ liệu JSON từ request body
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu URL-encoded
app.use(express.static(path.join(__dirname, 'public'))); // Cung cấp tệp tĩnh từ thư mục public
app.use(cookieParser()); // Xử lý cookies từ request
app.use(flash()); // Sử dụng flash messages để thông báo người dùng

// Kết nối cơ sở dữ liệu MongoDB
const urlConnect = process.env.DB;
mongoose.connect(urlConnect, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Cấu hình session để lưu thông tin đăng nhập
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'notsecret', // Mật khẩu bảo mật session
    saveUninitialized: false, // Không lưu session nếu không có thay đổi
    resave: false, // Không lưu lại session nếu không có thay đổi
    store: new MongoDBStore({ uri: process.env.DB, collection: 'sessions' }), // Lưu session vào MongoDB
    cookie: { maxAge: 180 * 60 * 1000 }, // Thời gian sống của session 180 phút
  })
);

// Cấu hình Passport để xác thực người dùng
require('./config/passport')(passport); // Đảm bảo file passport.js cấu hình đúng
app.use(passport.initialize());
app.use(passport.session());
// Middleware quản lý giỏ hàng
app.use((req, res, next) => {
  req.session.cart = new Cart(req.session.cart ? req.session.cart : {}); // Khởi tạo giỏ hàng từ session
  res.locals.session = req.session; // Lưu thông tin session vào locals để dùng trong views
  next();
});
// Định tuyến API
app.use('/api', productRouter); // API quản lý sản phẩm
app.use(shopRouter); // API cho cửa hàng (có thể xử lý giỏ hàng, thanh toán)
app.use(authRouter); // API cho đăng nhập/đăng ký
// Cấu hình view engine để render giao diện
app.set('views', path.join(__dirname, 'views')); // Đặt thư mục chứa views
app.set('view engine', 'ejs'); // Sử dụng EJS làm view engine

// Xử lý lỗi 404 - Không tìm thấy trang
app.use((req, res, next) => {
  next(createError(404)); // Nếu không tìm thấy trang, sẽ chuyển đến handler lỗi 404
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
  const cartProduct = req.session.cart ? new Cart(req.session.cart).generateArray() : null; // Lấy danh sách sản phẩm trong giỏ
  res.locals.message = err.message; // Lưu thông điệp lỗi vào locals
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Cung cấp lỗi chi tiết khi môi trường là development
  res.status(err.status || 500); // Đặt mã lỗi
  res.render('error', { cartProduct }); // Render view lỗi và truyền giỏ hàng vào
});
module.exports = app; 
