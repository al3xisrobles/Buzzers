// AuthContext.jsx
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // Import default styles

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  return (
    <Authenticator.Provider>
      <AuthContext.Provider value={{}}>
        {children}
      </AuthContext.Provider>
    </Authenticator.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
