// AuthContext.jsx
import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // Import default styles
import { fetchUserAttributes } from 'aws-amplify/auth';

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  // Loading user data
  const [loadingAttributes, setLoadingAttributes] = useState()

  // User attributes
  const [userAttributes, setUserAttributes] = useState({});

  // Fetch the user attributes
  useEffect(() => {
    async function fetchAttributes() {
      try {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
        setLoadingAttributes(false);
      } catch (error) {
        console.log("Error fetching user attributes:", error);
        setLoadingAttributes(false);
      }
    }
    fetchAttributes();
  }, []);

  return (
    <Authenticator.Provider>
      <AuthContext.Provider value={{
        userAttributes,
        loadingAttributes,
      }}>
        {children}
      </AuthContext.Provider>
    </Authenticator.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
