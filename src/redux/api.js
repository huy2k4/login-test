import axios from 'axios';

// Cấu hình base URL cho API
const API_URL = 'http://localhost:5000/api/auth';

// Tạo instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Hàm xử lý lỗi
const handleError = (error) => {
  if (error.response) {
    // Server trả về response với status code ngoài 2xx
    throw new Error(error.response.data.message || 'Đã xảy ra lỗi');
  } else if (error.request) {
    // Request được gửi đi nhưng không nhận được response
    throw new Error('Không thể kết nối đến server');
  } else {
    // Có lỗi khi thiết lập request
    throw new Error('Đã xảy ra lỗi khi thiết lập yêu cầu');
  }
};

// API đăng nhập
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    
    // Lưu token vào localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// API lấy thông tin user hiện tại
export const getCurrentUser = async () => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Không tìm thấy token');
    }
    
    const response = await api.get('/me', {
      headers: {
        'x-auth-token': token
      }
    });
    
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// API đăng xuất (xóa token)
export const logout = () => {
  localStorage.removeItem('token');
};