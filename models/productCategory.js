const mongoose = require("mongoose"); // Kết nối với thư viện mongoose để làm việc với MongoDB
const Schema = mongoose.Schema; // Khai báo Schema từ mongoose để định nghĩa cấu trúc dữ liệu

// Định nghĩa schema cho danh mục sản phẩm
const productCategorySchema = new Schema({
  name: { // Tên danh mục, ví dụ: "sách văn h0c", "sách giáo khoa", v.v. (bắt buộc phải có)
    type: String,
    required: true
  },
  childName: { // Các tên con trong danh mục (ví dụ: các loại sách,...)
    type: [String], // Đây là một mảng các chuỗi, ví dụ: ["sách văn học", "sách thể loại"]
    required: true
  }
});
// Tạo mô hình "productCategory" từ schema trên và xuất mô hình này để sử dụng ở nơi khác trong dự án
const productCategory = mongoose.model(
  "productCategory", // Tên mô hình
  productCategorySchema // Schema định nghĩa cấu trúc dữ liệu cho danh mục sản phẩm
);

module.exports = productCategory; // Xuất mô hình để sử dụng trong các phần khác của ứng dụng
