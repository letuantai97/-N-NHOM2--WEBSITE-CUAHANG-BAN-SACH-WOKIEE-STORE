const mongoose = require('mongoose'); // Kết nối với thư viện mongoose để làm việc với MongoDB
const Schema = mongoose.Schema; // Khai báo Schema từ mongoose để định nghĩa cấu trúc dữ liệu

// Định nghĩa schema cho người dùng (User)
const userSchema = new Schema({
  username: { // Tên người dùng (Bắt buộc)
    type: String,
    required: true
  },
  password: { // Mật khẩu của người dùng (Bắt buộc)
    type: String,
    required: true
  },
  firstName: { // Tên của người dùng (Không bắt buộc)
    type: String,
    required: false
  },
  lastName: { // Họ của người dùng (Không bắt buộc)
    type: String,
    required: false
  },
  email: { // Email của người dùng (Không bắt buộc)
    type: String,
    required: false
  },
  address: { // Địa chỉ của người dùng (Không bắt buộc)
    type: String,
    required: false
  },
  phoneNumber: { // Số điện thoại của người dùng (Không bắt buộc)
    type: String,
    required: false
  },
  role: { // Vai trò của người dùng (Không bắt buộc, mặc định là 0 - có thể là người dùng bình thường)
    type: Number,
    required: false,
    default: 0
  },
  isAuthenticated: { // Trạng thái xác thực của người dùng (Không bắt buộc, mặc định là false)
    type: Boolean,
    required: false,
    default: false
  },
  isLock: { // Trạng thái khóa tài khoản người dùng (Không bắt buộc, mặc định là false)
    type: Boolean,
    required: false,
    default: false
  },
  verify_token: { // Token xác minh (dùng khi xác thực email hoặc tài khoản, không bắt buộc)
    type: String,
    required: false
  },
  cart: { // Giỏ hàng của người dùng (Không bắt buộc, có thể chứa thông tin về các sản phẩm trong giỏ hàng)
    type: Object,
    required: false
  }
});

// Tạo mô hình User từ schema đã định nghĩa
const User = mongoose.model('User', userSchema);
// Xuất mô hình User để có thể sử dụng trong các phần khác của ứng dụng
module.exports = User;
