const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Products = require("../models/product");

// API thêm một sản phẩm (POST)
router.post("/products", async (req, res) => {
  try {
    const {
      name,
      description = "",
      stock,
      price,
      size = [],
      productType = {},
      color = [],
      images = [],
      materials = [],
      userId,
      oldPrice = null,
      isSale = { status: false, percent: 0 },
      comment = { total: 0, items: [] },
      pattern = [],
      tags = [],
      labels = "",
      buyCounts = 0,
      viewCounts = 0,
      dateAdded,
      slug = "",
      catolog = ""
    } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !price || !stock || !userId) {
      return res.status(400).json({ message: "Tên, giá, số lượng và userId không được để trống" });
    }
    // Kiểm tra userId có phải ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "User ID không hợp lệ" });
    }
    const newProduct = new Products({
      name,
      description,
      stock,
      price,
      size,
      productType,
      color,
      images,
      materials,
      oldPrice,
      isSale,
      comment,
      pattern,
      tags,
      labels,
      buyCounts,
      viewCounts,
      dateAdded: dateAdded ? new Date(dateAdded) : new Date(),
      slug,
      catolog,
      ofSellers: { userId },
    });

    await newProduct.save();
    res.status(201).json({ message: "Sản phẩm đã được thêm thành công!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
});

// API lấy danh sách sản phẩm (GET)
router.get("/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error: err.message });
  }
});

// API cập nhật sản phẩm (PUT - cập nhật toàn bộ dữ liệu)
router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
    }

    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.json({ message: "Sản phẩm đã cập nhật thành công", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error: err.message });
  }
});

// API cập nhật sản phẩm (PATCH - cập nhật từng phần dữ liệu)
router.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
    }

    const updatedProduct = await Products.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.json({ message: "Sản phẩm đã cập nhật thành công", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error: err.message });
  }
});

// API xóa sản phẩm (DELETE)
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
    }

    const deletedProduct = await Products.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.json({ message: "Sản phẩm đã xóa thành công", product: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error: err.message });
  }
});

// API thêm danh sách sản phẩm (POST nhiều sản phẩm)
router.post("/products/batch", async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Danh sách sản phẩm không hợp lệ" });
    }
    // Kiểm tra từng sản phẩm trong danh sách
    for (const product of products) {
      if (!product.name || !product.price || !product.stock || !product.userId) {
        return res.status(400).json({ message: "Một số sản phẩm thiếu thông tin bắt buộc (name, price, stock, userId)" });
      }
      if (!mongoose.Types.ObjectId.isValid(product.userId)) {
        return res.status(400).json({ message: `User ID không hợp lệ cho sản phẩm: ${product.name}` });
      }
    }

    const insertedProducts = await Products.insertMany(products);
    res.status(201).json({ message: "Danh sách sản phẩm đã thêm thành công", products: insertedProducts });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm danh sách sản phẩm", error: err.message });
  }
});

module.exports = router;
