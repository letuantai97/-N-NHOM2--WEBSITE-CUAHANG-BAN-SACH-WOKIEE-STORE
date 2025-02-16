const mongoose = require("mongoose"); // Import mongoose để làm việc với MongoDB
const Product = require("../models/product"); // Import model Product

// 🔹 Cập nhật đúng chuỗi kết nối từ MongoDB Atlas
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

// ✅ Hàm lấy danh sách sản phẩm
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    console.log("📦 Danh sách sản phẩm:", products);
  } catch (error) {
    console.error("❌ Lỗi truy vấn sản phẩm:", error.message);
  }
};

// ✅ Gọi hàm kết nối và lấy sản phẩm
const start = async () => {
  await connectDB();
  await getAllProducts();
};
// Gọi hàm chính
start();
