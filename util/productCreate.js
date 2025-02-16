const mongoose = require("mongoose");
const Product = require("../models/product");

const urlConnect = "mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(urlConnect, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Kết nối MongoDB thành công!");

    const product = new Product({
      name: "Clean Code - Mã Sạch",  // Tên sách
      description: "Cuốn sách này giúp lập trình viên hiểu cách viết mã nguồn sạch, dễ bảo trì và hiệu quả.",  // Mô tả sách
      stock: 100,  // Số lượng tồn kho
      price: 350000,  // Giá sách
      tags: ["#cleancode", "#programming", "#book"],  // Các thẻ liên quan
      size: ["Bản in", "Ebook"],  // Các định dạng sách
      productType: { main: "Sách", sub: "Lập trình" },  // Loại sách
      color: ["Trắng", "Xanh dương"],  // Màu sắc của sách
      pattern: ["Kỹ thuật lập trình"],  // Chủ đề sách
      images: ["clean-code-cover1.jpg", "clean-code-cover2.jpg"],  // Hình ảnh sách
      dateAdded: new Date(),  // Ngày thêm sách
      isSale: { status: true, percent: 20, end: new Date("2024-08-16T18:00:20.818+00:00") },  // Thông tin khuyến mãi
      ofSellers: { userId: "60c72b2f9af1b4c708d4f8c9", name: "Fashion Store", labels: "Premium" },  // Thông tin người bán
      materials: ["Giấy chất lượng cao"],  // Chất liệu sách
      buyCounts: 0,  // Số lần mua
      viewCounts: 0,  // Số lượt xem
      rating: {
        byUser: "john_doe",  // Người đánh giá
        content: "Great quality and fits well!",  // Nội dung đánh giá
        star: 5,  // Đánh giá 5 sao
        index: 0
      },
      comment: {
        total: 1,  // Tổng số bình luận
        items: [
          {
            byUser: "john_doe",  // Người bình luận
            content: "Great quality and fits well!",  // Nội dung bình luận
            star: 5  // Đánh giá 5 sao
          }
        ]
      }
    });

    product.save()
      .then(() => console.log("✅ Sách đã được lưu thành công!"))
      .catch(err => console.error("❌ Lỗi khi lưu sách:", err));
  })
  .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));
