import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/guest/Home';
import StudyPage from './pages/user/StudyPage';
import QuizPage from './pages/user/QuizPage';
import AppointmentsPage from './pages/user/AppointmentsPage';
import AboutPage from './pages/guest/AboutPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import LoginModal from "./pages/auth/LoginModal";
import RegisterModal from "./pages/auth/RegisterModal";
import { useAuthStore } from './store/authStore';
import { ModalProvider } from './context/ModalContext';

function AppContent() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Protected User Routes */}
          <Route 
            path="/study" 
            element={isAuthenticated ? <StudyPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/quiz" 
            element={isAuthenticated ? <QuizPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/appointments" 
            element={isAuthenticated ? <AppointmentsPage /> : <Navigate to="/" />} 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/*" 
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>
      <Footer />
      <LoginModal />
      <RegisterModal />
    </>
  );
}

function App() {
  return (
    <ModalProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <AppContent />
        </div>
      </Router>
    </ModalProvider>
  );
}

export default App;