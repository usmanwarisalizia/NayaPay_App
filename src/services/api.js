// API Service for Nayapay
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.nayapay.com/v1';

/**
 * Generic API request handler
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('nayapay_token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  getProfile: async () => {
    return apiRequest('/auth/profile');
  },
};

// Wallet APIs
export const walletAPI = {
  getBalance: async () => {
    return apiRequest('/wallet/balance');
  },

  getTransactions: async (page = 1, limit = 10) => {
    return apiRequest(`/wallet/transactions?page=${page}&limit=${limit}`);
  },

  sendMoney: async (recipientId, amount, description) => {
    return apiRequest('/wallet/send', {
      method: 'POST',
      body: JSON.stringify({ recipientId, amount, description }),
    });
  },

  requestMoney: async (requesterId, amount, description) => {
    return apiRequest('/wallet/request', {
      method: 'POST',
      body: JSON.stringify({ requesterId, amount, description }),
    });
  },

  addMoney: async (amount, paymentMethod) => {
    return apiRequest('/wallet/add', {
      method: 'POST',
      body: JSON.stringify({ amount, paymentMethod }),
    });
  },
};

// Payment APIs
export const paymentAPI = {
  createPayment: async (paymentData) => {
    return apiRequest('/payments/create', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },

  getPaymentStatus: async (paymentId) => {
    return apiRequest(`/payments/${paymentId}/status`);
  },

  getPaymentHistory: async (page = 1, limit = 10) => {
    return apiRequest(`/payments/history?page=${page}&limit=${limit}`);
  },
};

// User APIs
export const userAPI = {
  updateProfile: async (profileData) => {
    return apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  getContacts: async () => {
    return apiRequest('/user/contacts');
  },

  searchUsers: async (query) => {
    return apiRequest(`/user/search?q=${encodeURIComponent(query)}`);
  },
};

export default {
  authAPI,
  walletAPI,
  paymentAPI,
  userAPI,
};

