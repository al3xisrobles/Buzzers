import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from './Components/Dashboard/Pages/Dashboard'
import PageNotFound from './Components/Landing/Pages/PageNotFound'
import TermsOfService from './Components/Landing/Pages/TermsOfService'
import PrivacyPolicy from './Components/Landing/Pages/PrivacyPolicy'
import LoginPage from "./Components/Dashboard/Auth/Login"

// Components
import Hero from './Components/Landing/Hero'
import Navbar from './Components/Landing/Navbar'
import Footer from './Components/Landing/Footer'

// Assets
import BuzzersText from "./Assets/Dashboard/BuzzersText.svg"
import BuzzersLogo from "./Assets/Dashboard/LogoYellow.svg"

// Contexts
import { AuthProvider } from './Components/Dashboard/Auth/AuthContext';
import { UserProvider } from './Components/Dashboard/UserContext';

// Amplify
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { useAuth } from './Components/Dashboard/Auth/AuthContext';
import { useAuthenticator } from '@aws-amplify/ui-react';
Amplify.configure(awsconfig);

// React hot toast notifications
import { Toaster } from 'react-hot-toast';

// Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

function FixedNavbar() {
  return (
    <div className="fixed bg-salt md:border-0 top-0 w-full z-50">
      <Navbar />
    </div>
  )
}

// Component for the home page
function HomePage() {
  return (
    <div>
      <Hero />
      <Footer />
    </div>
  );
}

// Component for the privacy policy page
function PrivacyPolicyPage() {
  return (
    <div>
      <FixedNavbar />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}

// Component for the terms of service page
function TermsOfServicePage() {
  return (
    <div>
      <FixedNavbar />
      <TermsOfService />
      <Footer />
    </div>
  );
}

// Component for the terms of service page
function PageNotFoundPage() {
  return (
    <div>
      <FixedNavbar />
      <PageNotFound />
      <Footer />
    </div>
  );
}

// Component for the terms of service page
function DashboardPage() {
  const { loadingAttributes } = useAuth();
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const [showLoading, setShowLoading] = useState(true);

  // Wait before fade out starts
  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingAttributes == false) {
        setShowLoading(false);
        clearInterval(interval);
      }
    }, 100);
  }, [loadingAttributes]);

  const loadingVariants = {
    initial: {
      opacity: 1
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.1 }  // Fade out over 0.1 seconds
    }
  };

  return (
    <div>
      {authStatus === 'configuring' && <div className='bg-salt w-screen h-screen fixed'>HELLO</div>}
      {(authStatus !== 'configuring' && authStatus !== 'authenticated') ? <LoginPage /> : (
        <>
          <AnimatePresence>
            {showLoading && (
              <motion.div
                className='fixed z-[99] w-screen h-screen bg-salt flex justify-center items-center'
                variants={loadingVariants}
                initial="initial"
                exit="exit"
              >
                <div className='mb-10 flex flex-row gap-4'>
                  <img src={BuzzersLogo} className='w-10 spin' alt=""/>
                  <img src={BuzzersText} className="w-28" alt="Buzzers"/>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Dashboard/>
        </>
      )}
    </div>
  );
}

export default DashboardPage;

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="bg-cloud">

    <Toaster
      toastOptions={{
        success: {
          iconTheme: {
            primary: '#FCD13B',
          },
        },
      }}
    />

    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<PageNotFoundPage />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  </div>
);
