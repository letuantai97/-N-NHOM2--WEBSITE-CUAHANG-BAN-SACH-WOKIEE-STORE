module.exports = function (str) {
  // Mảng chứa các nhóm ký tự có dấu và ký tự không dấu tương ứng
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",  // Nhóm các ký tự "a" có dấu và không dấu
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",  // Nhóm các ký tự "A" có dấu và không dấu
    "dđ",                    // Nhóm ký tự "d" và "đ"
    "DĐ",                    // Nhóm ký tự "D" và "Đ"
    "eèẻẽéẹêềểễếệ",          // Nhóm các ký tự "e" có dấu và không dấu
    "EÈẺẼÉẸÊỀỂỄẾỆ",          // Nhóm các ký tự "E" có dấu và không dấu
    "iìỉĩíị",                // Nhóm các ký tự "i" có dấu và không dấu
    "IÌỈĨÍỊ",                // Nhóm các ký tự "I" có dấu và không dấu
    "oòỏõóọôồổỗốộơờởỡớợ",    // Nhóm các ký tự "o" có dấu và không dấu
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",    // Nhóm các ký tự "O" có dấu và không dấu
    "uùủũúụưừửữứự",          // Nhóm các ký tự "u" có dấu và không dấu
    "UÙỦŨÚỤƯỪỬỮỨỰ",          // Nhóm các ký tự "U" có dấu và không dấu
    "yỳỷỹýỵ",                // Nhóm các ký tự "y" có dấu và không dấu
    "YỲỶỸÝỴ"                 // Nhóm các ký tự "Y" có dấu và không dấu    
  ];
  // Duyệt qua từng nhóm trong AccentsMap
  for (var i = 0; i < AccentsMap.length; i++) {
      // Tạo biểu thức chính quy để tìm các ký tự có dấu trong chuỗi
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      // Lấy ký tự không dấu đầu tiên trong nhóm để thay thế
      var char = AccentsMap[i][0];
      // Thay thế các ký tự có dấu bằng ký tự không dấu
      str = str.replace(re, char);
  }

  // Trả về chuỗi đã được loại bỏ dấu
  return str;
}
