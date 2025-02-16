const mongoose = require("mongoose"); // Kết nối với thư viện mongoose để làm việc với MongoDB
const Schema = mongoose.Schema; // Khai báo Schema từ mongoose để định nghĩa cấu trúc dữ liệu

// Định nghĩa một schema mới cho Order (Đơn hàng)
const orderSchema = new Schema({
  user: { // Liên kết tới bảng người dùng (User), dùng ObjectId để lưu trữ ID của người dùng đã đặt đơn hàng
    type: Schema.Types.ObjectId, // Kiểu dữ liệu là ObjectId, liên kết tới bảng "User"
    ref: "User" // Tham chiếu tới mô hình "User"
  },
  cart: { 
    type: Object, // Lưu trữ thông tin giỏ hàng dưới dạng đối tượng
    required: true // Bắt buộc phải có giá trị cho trường này
  },
  address: { // Địa chỉ nhận hàng
    type: String, // Kiểu dữ liệu là chuỗi
    required: true // Bắt buộc phải có địa chỉ
  },
  date: { // Ngày đặt đơn hàng
    type: Date, // Kiểu dữ liệu là Date
    required: false, // Không bắt buộc phải có ngày
    default: Date.now // Mặc định là thời gian hiện tại khi không có giá trị
  },
  phoneNumber: { // Số điện thoại của người đặt hàng
    type: Number, // Kiểu dữ liệu là số
    required: true // Bắt buộc phải có số điện thoại
  }
});
// Tạo mô hình "Order" từ schema trên và xuất mô hình này để sử dụng ở nơi khác trong dự án
module.exports = mongoose.model("Order", orderSchema);
