// Lấy thông tin tài khoản của người dùng và các đơn hàng liên quan
exports.getAccount = (req, res, next) => {
  var cartProduct; // Khai báo biến để chứa các sản phẩm trong giỏ hàng
  if (!req.session.cart) {
    cartProduct = null; // Nếu không có giỏ hàng, gán null
  } else {
    var cart = new Cart(req.session.cart); // Lấy giỏ hàng từ session
    cartProduct = cart.generateArray(); // Chuyển giỏ hàng thành mảng sản phẩm để dễ dàng hiển thị
  }

  // Lấy thông báo thành công hoặc lỗi từ flash messages
  const messageSucc = req.flash("success")[0];
  const messageError = req.flash("error")[0];

  // Tìm kiếm tất cả các đơn hàng của người dùng
  Order.find({ user: req.user }).then(order => {
    res.render("account", { // Render trang "account" với thông tin tài khoản và đơn hàng
      title: "Thông tin tài khoản", // Tiêu đề trang
      user: req.user, // Thông tin người dùng
      cartProduct: cartProduct, // Các sản phẩm trong giỏ hàng
      order: order, // Các đơn hàng của người dùng
      messageSucc: messageSucc, // Thông báo thành công (nếu có)
      messageError: messageError // Thông báo lỗi (nếu có)
    });
  });
};
// Hiển thị trang thay đổi thông tin tài khoản
exports.getAccountChange = (req, res, next) => {
  var cartProduct; // Khai báo biến để chứa các sản phẩm trong giỏ hàng
  if (!req.session.cart) {
    cartProduct = null; // Nếu không có giỏ hàng, gán null
  } else {
    var cart = new Cart(req.session.cart); // Lấy giỏ hàng từ session
    cartProduct = cart.generateArray(); // Chuyển giỏ hàng thành mảng sản phẩm để dễ dàng hiển thị
  }
  res.render("account-change-info", { // Render trang "account-change-info" để thay đổi thông tin tài khoản
    title: "Thay đổi thông tin tài khoản", // Tiêu đề trang
    user: req.user, // Thông tin người dùng
    cartProduct: cartProduct // Các sản phẩm trong giỏ hàng
  });
};

// Xử lý khi người dùng thay đổi thông tin tài khoản
exports.postAccountChange = (req, res, next) => {
  req.user.firstName = req.body.firstName; // Cập nhật tên đầu
  req.user.lastName = req.body.lastName; // Cập nhật tên cuối
  req.user.email = req.body.email; // Cập nhật email
  req.user.address = req.body.address; // Cập nhật địa chỉ
  req.user.phoneNumber = req.body.phoneNumber; // Cập nhật số điện thoại
  req.user.save(); // Lưu các thay đổi vào cơ sở dữ liệu
  res.redirect("/account"); // Chuyển hướng về trang tài khoản sau khi lưu thay đổi
};
