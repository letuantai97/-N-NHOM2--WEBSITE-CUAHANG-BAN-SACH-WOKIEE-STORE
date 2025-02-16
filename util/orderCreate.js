// Import thư viện mongoose để kết nối và làm việc với MongoDB
const mongoose = require("mongoose");

// Import model Order từ thư mục models (giả sử có model này trong dự án)
const Order = require("../models/order");

// URL kết nối đến MongoDB, bao gồm thông tin tài khoản và tên cơ sở dữ liệu
const urlConnect = "mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority";

// Kết nối đến MongoDB với các tùy chọn kết nối mới (useNewUrlParser để sử dụng parser URL mới)
mongoose.connect(urlConnect, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  // Nếu có lỗi kết nối, ném lỗi ra ngoài
  if (err) throw err;
  
  // In ra thông báo nếu kết nối thành công
  console.log("Connect successfully!!");

  // Tạo một đối tượng mới từ model Order
  var order = new Order({});

  // Lưu đối tượng order vừa tạo vào cơ sở dữ liệu
  order.save(function(err) { 
    // Nếu có lỗi trong quá trình lưu, ném lỗi ra ngoài
    if (err) throw err;

    // In ra thông báo nếu lưu thành công
    console.log("Order successfully saved.");
  });
});
