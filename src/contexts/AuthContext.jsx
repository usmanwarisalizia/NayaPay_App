import { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('nayapay_token');
      if (token) {
        // const userData = await authAPI.getProfile();
        // Mock user data
        setUser({
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+92 300 1234567',
          kycVerified: false,
          role: 'user',
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('nayapay_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email) => {
    // eslint-disable-next-line no-useless-catch
    try {
      // const response = await authAPI.login(email, password);
      // Mock login
      const mockToken = 'mock_token_' + Date.now();
      localStorage.setItem('nayapay_token', mockToken);
      setUser({
        id: '1',
        name: 'John Doe',
        email: email,
        phone: '+92 300 1234567',
        kycVerified: false,
        role: 'user',
      });
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // await authAPI.logout();
      localStorage.removeItem('nayapay_token');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      // const response = await authAPI.register(userData);
      // Mock registration
      return { success: true, message: 'Registration successful' };
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

