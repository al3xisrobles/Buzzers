import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageNotFound from './Components/Landing/Pages/PageNotFound'
import TermsOfService from './Components/Landing/Pages/TermsOfService'
import PrivacyPolicy from './Components/Landing/Pages/PrivacyPolicy'

import Hero from './Components/Landing/Hero'
import Navbar from './Components/Landing/Navbar'
import Footer from './Components/Landing/Footer'

import Dashboard from './Components/Dashboard/Pages/Dashboard'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRJ_7b6BXQ1ZNwzVeWFrZ8kWfks8dKyjg",
  authDomain: "buzzers-6a2da.firebaseapp.com",
  projectId: "buzzers-6a2da",
  storageBucket: "buzzers-6a2da.appspot.com",
  messagingSenderId: "216395387521",
  appId: "1:216395387521:web:110b2294c1c1763c29f380",
  measurementId: "G-J4JQN51STR"
};

// Initialize Firebase
initializeApp(firebaseConfig);

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
  return (
    <div>
      <Dashboard />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="bg-cloud">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </Router>
  </div>
);
