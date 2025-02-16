const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const removeAccent = require("../util/removeAccent");

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: "Một sản phẩm từ chúng tôi"
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: [String],
    required: true
  },
  productType: {
    main: {
      type: String,
      required: true
    },
    sub: {
      type: String,
      required: false
    }
  },
  color: {
    type: [String],
    required: true
  },
  pattern: {
    type: [String],
    required: false
  },
  tags: {
    type: [String],
    required: false
  },
  images: {
    type: [String],
    required: true
  },
  dateAdded: {
    type: Date,
    required: false,
    default: Date.now
  },
  isSale: {
    status: {
      type: Boolean,
      default: false
    },
    percent: {
      type: Number,
      default: 0
    },
    end: {
      type: Date,
      required: false
    }
  },
  ofSellers: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User "
    },
    name: {
      type: String,
      required: false
    }
  },
  labels: {
    type: String,
    required: false,
    default: "Shiro"
  },
  materials: {
    type: [String],
    required: true
  },
  buyCounts: {
    type: Number,
    required: false,
    default: 0
  },
  viewCounts: {
    type: Number,
    required: false,
    default: 0
  },
  rating: {
    by: {
      type: String,
      required: false
    },
    content: {
      type: String,
      required: false
    },
    star: {
      type: Number,
      required: false
    }
  },
  index: {
    type: Number,
    required: false,
    default: 0 // Thêm giá trị mặc định nếu cần
  },
  comment: {
    total: {
      type: Number,
      required: false,
      default: 0
    },
    items: [
      {
        title: {
          type: String,
          required: false
        },
        content: {
          type: String,
          required: false
        },
        name: {
          type: String,
          required: false
        },
        date: {
          type: Date,
          default: Date.now
        },
        star: {
          type: Number,
          required: false
        }
      }
    ]
  }
});

// Tạo chỉ mục cho các trường tìm kiếm
const index = {
  name: "text",
  description: "text",
  labels: "text",
  "productType.main": "text",
  tags: "text",
  ofSellers: "text"
};
productSchema.index(index);

// Phương thức để lấy loại không dấu
productSchema.methods.getNonAccentType = function() {
  return removeAccent(this.productType.main);
};
// Tạo model Product
const Product = mongoose.model("Product", productSchema);
module.exports = Product;