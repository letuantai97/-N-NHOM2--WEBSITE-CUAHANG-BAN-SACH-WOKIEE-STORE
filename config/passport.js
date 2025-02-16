const User = require('../models/user'); // Mô hình người dùng
const LocalStrategy = require('passport-local').Strategy; // Chiến lược Local của Passport
const bcrypt = require('bcryptjs'); // Mã hóa mật khẩu
const nodemailer = require('nodemailer'); // Gửi email
const crypto = require('crypto'); // Tạo mã OTP

module.exports = function (passport) {
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, null);
    }
  });

  // Chiến lược đăng nhập
  passport.use(
    'local-signin',
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: 'Sai tên đăng nhập hoặc mật khẩu.' });
        }
        if (user.isLock) {
          return done(null, false, { message: 'Tài khoản đã bị khoá.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Sai tên đăng nhập hoặc mật khẩu.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  // Chiến lược đăng ký
  passport.use(
    'local-signup',
    new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return done(null, false, { message: 'Tên đăng nhập đã tồn tại!' });
        }
        if (password.length <= 6) {
          return done(null, false, { message: 'Mật khẩu phải trên 6 ký tự!' });
        }
        if (password !== req.body.password2) {
          return done(null, false, { message: 'Hai mật khẩu không khớp!' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
          return done(null, false, { message: 'Địa chỉ email không hợp lệ!' });
        }
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
          return done(null, false, { message: 'Địa chỉ email đã tồn tại!' });
        }

        // Tạo mã OTP
        const otp = crypto.randomInt(100000, 999999).toString(); // Mã OTP 6 chữ số
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 12);

        // Tạo người dùng mới
        const newUser = new User({
          username,
          password: hashedPassword,
          email: req.body.email,
          isVerified: false,
          otp, // Lưu OTP vào cơ sở dữ liệu
        });

        // Lưu người dùng vào cơ sở dữ liệu
        await newUser.save();

        // Gửi email xác thực
        sendVerificationEmail(newUser); // Gửi email OTP

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    })
  );
  // Hàm gửi email xác thực
  async function sendVerificationEmail(user) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Đặt trong .env
          pass: process.env.EMAIL_PASS, // Đặt mật khẩu ứng dụng ở đây
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER, // Địa chỉ email của bạn
        to: user.email,
        subject: 'Xác thực tài khoản của bạn',
        text: `Chào ${user.username},\n\nMã xác thực (OTP) của bạn là: ${user.otp}\nVui lòng nhập mã này để kích hoạt tài khoản của bạn.\n\nCảm ơn!`,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email xác thực đã gửi thành công.');
    } catch (error) {
      console.error('Lỗi gửi email:', error);
    }
  }
};
exports.postVerifyEmail = (req, res, next) => {
  const { token } = req.body;
  const storedToken = req.session.verificationToken;

  if (token === storedToken) {
    Users.findOne({ username: req.user.username }, (err, user) => {
      if (err) {
        return next(err);
      }

      user.isAuthenticated = true;
      user.save();
      req.flash("success", "Xác thực thành công!");
      res.redirect("/login");
    });
  } else {
    req.flash("error", "Mã xác thực không hợp lệ");
    res.redirect("/verify-email");
  }
};
