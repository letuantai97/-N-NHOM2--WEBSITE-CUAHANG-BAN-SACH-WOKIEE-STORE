module.exports = function Cart(oldCart) {
  // Khởi tạo các thuộc tính giỏ hàng từ đối tượng giỏ hàng cũ nếu có
  this.items = oldCart.items || {}; // Lưu trữ các sản phẩm trong giỏ hàng
  this.totalQty = oldCart.totalQty || 0; // Tổng số lượng sản phẩm trong giỏ hàng
  this.totalPrice = oldCart.totalPrice || 0; // Tổng giá trị của các sản phẩm trong giỏ hàng
  this.numItems = oldCart.numItems || 0; // Tổng số loại sản phẩm trong giỏ hàng
  // Thêm sản phẩm vào giỏ hàng
  this.add = (item, id, qty) => {
    const itemQty = qty ? Number(qty) : 1; // Kiểm tra và sử dụng số lượng nếu có, mặc định là 1
    var storeItem = this.items[id]; // Tìm sản phẩm trong giỏ hàng theo ID
    if (!storeItem) {
      storeItem = this.items[id] = { item: item, qty: 0, price: 0, images: '' }; // Nếu chưa có, tạo mới
      this.numItems++; // Tăng số loại sản phẩm
    }
    storeItem.qty += itemQty; // Cập nhật số lượng của sản phẩm
    storeItem.price = storeItem.item.price * storeItem.qty; // Tính lại giá trị tổng của sản phẩm
    storeItem.images = storeItem.item.images[0]; // Lấy ảnh đại diện của sản phẩm
    this.totalQty += itemQty; // Cập nhật tổng số lượng sản phẩm trong giỏ
    this.totalPrice += storeItem.item.price; // Cập nhật tổng giá trị giỏ hàng
  };

  // Thay đổi số lượng sản phẩm trong giỏ hàng
  this.changeQty = (item, id, qty) => {
    const itemQty = qty ? Number(qty) : 1; // Kiểm tra và sử dụng số lượng mới nếu có, mặc định là 1
    var storeItem = this.items[id]; // Tìm sản phẩm trong giỏ hàng theo ID
    if (!storeItem) {
      storeItem = this.items[id] = { item: item, qty: 0, price: 0, images: '' }; // Nếu chưa có, tạo mới
      this.numItems++; // Tăng số loại sản phẩm
    }
    let oldQty = storeItem.qty; // Lưu lại số lượng cũ để tính lại tổng số lượng và giá trị
    storeItem.qty = itemQty; // Cập nhật số lượng mới của sản phẩm
    storeItem.price = storeItem.item.price * storeItem.qty; // Cập nhật giá trị sản phẩm
    storeItem.images = storeItem.item.images[0]; // Cập nhật ảnh đại diện
    this.totalQty += itemQty - oldQty; // Cập nhật tổng số lượng giỏ hàng
    this.totalPrice += storeItem.price - storeItem.item.price * oldQty; // Cập nhật tổng giá trị giỏ hàng
  };

  // Xóa sản phẩm khỏi giỏ hàng
  this.deleteItem = id => {
    var storeItem = this.items[id]; // Tìm sản phẩm cần xóa theo ID
    this.totalQty -= storeItem.qty; // Cập nhật tổng số lượng sau khi xóa
    this.totalPrice -= storeItem.price; // Cập nhật tổng giá trị sau khi xóa
    this.numItems--; // Giảm số loại sản phẩm
    delete this.items[id]; // Xóa sản phẩm khỏi giỏ hàng
  };

  // Hợp nhất giỏ hàng hiện tại với giỏ hàng của người dùng
  this.addCart = cart => {
    for (var id in cart.items) { // Duyệt qua tất cả sản phẩm trong giỏ hàng của người dùng
      var storeItem = this.items[id];

      if (!storeItem) { // Nếu sản phẩm chưa có trong giỏ hàng hiện tại
        storeItem = this.items[id] = {
          item: cart.items[id].item,
          qty: cart.items[id].qty,
          price: cart.items[id].price,
          images: cart.items[id].images
        };
        this.numItems++; // Tăng số loại sản phẩm
      } else { // Nếu sản phẩm đã có, chỉ cần cộng thêm số lượng và giá trị
        storeItem.qty += parseInt(cart.items[id].qty);
        storeItem.price += cart.items[id].price;
      }
      this.totalQty += cart.items[id].qty; // Cập nhật tổng số lượng giỏ hàng
      this.totalPrice += cart.items[id].price; // Cập nhật tổng giá trị giỏ hàng
    }
    return this; // Trả về giỏ hàng đã được hợp nhất
  };

  // Chuyển giỏ hàng thành mảng để dễ dàng hiển thị
  this.generateArray = () => {
    var arr = [];
    for (var id in this.items) { // Duyệt qua tất cả các sản phẩm trong giỏ hàng
      arr.push(this.items[id]); // Thêm sản phẩm vào mảng
    }
    return arr; // Trả về mảng sản phẩm
  };
};
