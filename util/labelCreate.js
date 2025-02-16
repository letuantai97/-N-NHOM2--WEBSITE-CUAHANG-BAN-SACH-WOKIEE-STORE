const mongoose = require("mongoose"); // Import thư viện mongoose
const Label = require("../models/label"); // Import model label

// 🔹 Chuỗi kết nối đến MongoDB Atlas
const urlConnect = "mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority";

// ✅ Hàm kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(urlConnect, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error.message);
    process.exit(1); // Dừng chương trình nếu lỗi
  }
};

// ✅ Hàm tạo danh sách nhãn hiệu mới
const createLabels = async () => {
  try {
    const newLabel = new Label({
      list: [
        "Kim Đồng",
        "Nhà Xuất Bản Trẻ",
        "Alpha Books",
        "NXB Giáo Dục",
        "First News - Trí Việt",
        "NXB Văn Học",
        "NXB Chính Trị Quốc Gia",
        "NXB Khoa Học & Kỹ Thuật",
        "NXB Thế Giới"
      ]
    });

    await newLabel.save();
    console.log("✅ Danh sách nhãn hiệu đã được lưu thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi lưu danh sách nhãn hiệu:", error.message);
  }
};

// ✅ Gọi hàm kết nối và tạo danh sách nhãn hiệu
const start = async () => {
  await connectDB();
  await createLabels();
};

// Gọi hàm chính
start();
