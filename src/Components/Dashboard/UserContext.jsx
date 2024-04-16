import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  // Ideally, you'd sync the cartQuantity with a backend or storage here
  useEffect(() => {
    // Assuming localStorage is used for persistence:
    const storedQuantity = localStorage.getItem('cartQuantity');
    if (storedQuantity) {
      setCartQuantity(parseInt(storedQuantity, 10));
    }
  }, []);

  // Whenever cartQuantity changes, store it in localStorage
  useEffect(() => {
    localStorage.setItem('cartQuantity', cartQuantity);
  }, [cartQuantity]);

  return (
    <UserContext.Provider value={{
      cartQuantity,
      setCartQuantity
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useCart = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useCart must be used within a UserProvider');
  }
  return context;
};
