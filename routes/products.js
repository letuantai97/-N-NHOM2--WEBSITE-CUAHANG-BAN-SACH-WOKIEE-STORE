const express = require("express");
const router = express.Router();
const Products = require('../models/product');  // Đảm bảo đường dẫn đúng
// API thêm sản phẩm (POST)
router.post("/products", async (req, res) => {
  try {
    const { name, description, stock, price, size, productType, color, images, materials } = req.body;

    // Kiểm tra dữ liệu đầu vào (có thể mở rộng theo yêu cầu)
    if (!name || !price || !stock) {
      return res.status(400).json({ message: "Tên, giá và số lượng không được để trống" });
    }
    // Tạo mới sản phẩm
    const newProduct = new Products({
      name: { type: String, required: true },
      description: { type: String },
      stock: { type: Number, required: true },
      price: { type: Number, required: true },
      size: { type: String },
      productType: {
        main: { type: String, required: true },  // Trường bắt buộc
        sub: { type: String }
      },
      color: { type: String },
      images: [{ type: String }],
      materials: { type: String },
      ofSellers: {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }  // Trường bắt buộc
      }
    });
    // Lưu sản phẩm vào MongoDB
    await newProduct.save();
    res.status(201).json({ message: "Sản phẩm đã thêm thành công", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm sản phẩm", error: err.message });
  }
});

// API lấy danh sách sản phẩm (GET)
router.get("/products", async (req, res) => {
  try {
    // Lấy tất cả sản phẩm từ MongoDB
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error: err.message });
  }
});
// API lấy danh sách sản phẩm (PUT)

router.put("/products/:id", async (req, res) => {
  try {
    // Tìm sản phẩm theo ID và cập nhật
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Kiểm tra sản phẩm có tồn tại không
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json({ message: "Sản phẩm đã cập nhật thành công", product });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error: err.message });
  }
});

// API xóa sản phẩm (DELETE)

router.delete("/products/:id", async (req, res) => {
  try {
    // Tìm sản phẩm theo ID
    const product = await Products.findByIdAndDelete(req.params.id);

    // Kiểm tra sản phẩm đã tồn tại
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.json({ message: "Sản phẩm đã xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: "L��i khi xóa sản phẩm", error: err.message });
  }
});
// API THÊM danh sách sản phẩm 

router.post("/products", async (req, res) => {
  try {
    // Lấy danh sách sản phẩm từ request body
    const products = req.body;

    // Thêm tất cả sản phẩm vào MongoDB
    await Products.insertMany(products);
    res.json({ message: "Danh sách sản phẩm đã thêm thành công" });
  } catch (err) {
    res.status(500).json({ message: "L��i khi thêm danh sách sản phẩm", error: err.message });
  }
});
// API CẬP NHẬT danh sách sản phẩm (PATCH)

router.patch("/products/:id", async (req, res) => {
  try {
    // Lấy danh sách sản phẩm từ request body
    const updates = req.body;

    // Cập nhật tất cả sản phẩm trong MongoDB
    await Products.updateMany({}, updates);
    res.json({ message: "Danh sách sản phẩm đã cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ message: "LỖI khi cập nhật danh sách sản phẩm", error: err.message });
  }
});
module.exports = router;  // Xuất router để sử dụng ở các tệp khác
