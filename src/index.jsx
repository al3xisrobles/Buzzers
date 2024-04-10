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

// Amplify
import { Amplify } from 'aws-amplify';
import { Button, Heading } from '@aws-amplify/ui-react';
import { AuthProvider } from './Components/Dashboard/Auth/AuthContext';
import awsconfig from './aws-exports';
import { useAuthenticator } from '@aws-amplify/ui-react';
Amplify.configure(awsconfig);

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

  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  return (
    <div>
      {authStatus === 'configuring' && 'Loading...'}
      {authStatus !== 'authenticated' ? <LoginPage /> : <Dashboard />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="bg-cloud">
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  </div>
);
