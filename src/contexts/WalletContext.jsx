import { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('nayapay_balance');
    return savedBalance ? parseFloat(savedBalance) : 12500.50;
  });

  useEffect(() => {
    localStorage.setItem('nayapay_balance', balance.toString());
  }, [balance]);

  const addMoney = (amount) => {
    const newBalance = balance + parseFloat(amount);
    setBalance(newBalance);
    return newBalance;
  };

  const deductMoney = (amount) => {
    const newBalance = balance - parseFloat(amount);
    if (newBalance < 0) {
      throw new Error('Insufficient balance');
    }
    setBalance(newBalance);
    return newBalance;
  };

  const setBalanceDirect = (amount) => {
    setBalance(parseFloat(amount));
  };

  return (
    <WalletContext.Provider value={{ balance, addMoney, deductMoney, setBalance: setBalanceDirect }}>
      {children}
    </WalletContext.Provider>
  );
};

