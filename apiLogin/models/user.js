const bcrypt = require('bcrypt');

// Tạo hash thật cho mật khẩu (chạy 1 lần để lấy hash)
const hashNam123 = bcrypt.hashSync('nam123', 10);
const hashHuy123 = bcrypt.hashSync('huy123', 10);

const users = [
  {
    id: 1,
    email: 'namdeptrai@gmail.com',
    password: hashNam123,
    name: 'Nam Dep Trai'
  },
  {
    id: 2,
    email: 'huybinhthuong@gmail.com',
    password: hashHuy123,
    name: 'Huy Binh Thuong'
  }
];

module.exports = {
  findByEmail: (email) => users.find(user => user.email === email),
  findById: (id) => users.find(user => user.id === id)
};