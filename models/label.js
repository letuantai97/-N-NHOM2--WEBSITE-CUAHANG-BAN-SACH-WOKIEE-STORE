const mongoose = require("mongoose"); // Kết nối với thư viện mongoose để làm việc với MongoDB
const Schema = mongoose.Schema; // Khai báo Schema từ mongoose để định nghĩa cấu trúc dữ liệu

// Định nghĩa một schema mới cho Label
const labelSchema = new Schema({
  list: { // Mảng các nhãn (labels) dưới dạng chuỗi
    type: [String], // Định dạng kiểu dữ liệu của mảng là chuỗi
    required: true // Bắt buộc phải có giá trị cho trường này
  }
})
// Tạo một mô hình Label từ schema trên
const Label = mongoose.model("Label", labelSchema);

// Xuất mô hình Label để có thể sử dụng ở nơi khác trong dự án
module.exports = Label;
