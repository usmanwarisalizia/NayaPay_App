import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ColorThemeProvider } from './contexts/ColorThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Help from './pages/Help';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyOTP from './pages/VerifyOTP';
import ForgotPassword from './pages/ForgotPassword';

// Protected Pages
import Wallet from './pages/Wallet';
import AddMoney from './pages/AddMoney';
import SendMoney from './pages/SendMoney';
import ReceiveMoney from './pages/ReceiveMoney';
import Transactions from './components/Transactions';
import Bills from './pages/Bills';
import Cards from './pages/Cards';
import Analytics from './pages/Analytics';
import KYC from './pages/KYC';
import Profile from './components/Profile';
import Admin from './pages/Admin';

function App() {
  return (
    <ThemeProvider>
      <ColorThemeProvider>
        <AuthProvider>
          <WalletProvider>
            <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/help" element={<Help />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<Wallet />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/send-money" element={<SendMoney />} />
            <Route path="/receive-money" element={<ReceiveMoney />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />

            {/* Additional Routes */}
            <Route path="/add-money" element={<AddMoney />} />
            <Route path="/recharge" element={<Bills />} />
          </Routes>
        </Router>
        </WalletProvider>
      </AuthProvider>
      </ColorThemeProvider>
    </ThemeProvider>
  );
}

export default App;