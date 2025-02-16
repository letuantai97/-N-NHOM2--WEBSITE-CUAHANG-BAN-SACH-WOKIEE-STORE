const mongoose = require("mongoose"); // Import thư viện mongoose
const Comment = require("../models/comment"); // Import model comment
// 🔹 Chuỗi kết nối đến MongoDB Atlas
const urlConnect = "mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority";
// ✅ Hàm kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(urlConnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error.message);
    process.exit(1); // Dừng chương trình nếu lỗi
  }
};

// ✅ Hàm tạo bình luận mới
const createComment = async () => {
  try {
    const newComment = new Comment({
      title: "Cuốn sách rất hay!", // Tiêu đề bình luận
      name: "Người đọc sách", // Người bình luận
      content: "Nội dung sách rất hấp dẫn, mang lại nhiều kiến thức bổ ích.", // Nội dung bình luận
      star: 5, // Số sao đánh giá (1-5)
      productID: "5df485878e98d6333450f7b6" // ID sách liên quan
    });

    await newComment.save();
    console.log("✅ Bình luận về sách đã được lưu thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi lưu bình luận:", error.message);
  }
};

// ✅ Gọi hàm kết nối và tạo bình luận
const start = async () => {
  await connectDB();
  await createComment();
};

// Gọi hàm chính
start();
