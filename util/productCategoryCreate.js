// Import thư viện mongoose để kết nối và làm việc với MongoDB
const mongoose = require("mongoose");

// Import model ProductCategory từ thư mục models (giả sử có model này trong dự án)
const ProductCategory = require("../models/productCategory");

// URL kết nối đến MongoDB, bao gồm thông tin tài khoản và tên cơ sở dữ liệu
const urlConnect = "mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority";

// Kết nối đến MongoDB với các tùy chọn kết nối mới
mongoose.connect(urlConnect, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) throw err;
  
  console.log("✅ Kết nối MongoDB thành công!");

  // Danh sách các thư mục sách
  const categories = [
    {
      name: "Chính trị - Lịch sử",
      childName: [
        { name: "Chính trị - Lịch sử", subCategories: [] },
        { name: "Văn học - Chính trị", subCategories: [] },
        { name: "Truyền thống - Cách mạng", subCategories: [] }
      ]
    },
    {
      name: "Khoa học - Tri thức",
      childName: [
        { name: "Tri thức - Khoa học", subCategories: [] },
        { name: "Khoa học - Khám phá", subCategories: [] }
      ]
    },
    {
      name: "Văn học - Tiểu thuyết",
      childName: [
        { name: "Tiểu thuyết - Văn học", subCategories: [] },
        { name: "Văn học - Nghệ thuật", subCategories: [] }
      ]
    },
    {
      name: "Giáo khoa - Giáo trình",
      childName: [
        { name: "Giáo trình - Sách giáo khoa", subCategories: [] },
        { name: "Lập trình - Giáo khoa", subCategories: [] }
      ]
    },
    {
      name: "Kinh tế - Quản lý",
      childName: [
        { name: "Quản lý - Kinh tế", subCategories: [] }
      ]
    },
    {
      name: "Gia đình - Tâm lý",
      childName: [
        { name: "Gia đình - Trẻ em", subCategories: [] },
        { name: "Tâm lý học", subCategories: [] }
      ]
    },
    {
      name: "Nấu ăn - Ẩm thực",
      childName: [
        { name: "Thể loại nấu ăn - Bếp núc", subCategories: [] }
      ]
    },
    {
      name: "Tổng hợp - Kiến thức",
      childName: [
        { name: "Kiến thức - Tổng hợp", subCategories: [] },
        { name: "Sách bản quyền", subCategories: [] }
      ]
    }
  ];
  
  // Lưu các danh mục vào MongoDB
  categories.forEach(category => {
    const newCategory = new ProductCategory(category);
    
    newCategory.save((err) => {
      if (err) {
        console.log("❌ Lỗi khi lưu danh mục:", err);
      } else {
        console.log(`✅ Danh mục "${category.name}" đã được lưu thành công!`);
      }
      
    });
  });
});
