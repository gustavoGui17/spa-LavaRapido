import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./route/ProtectRoute";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import Home from './assets/pages/Home/Home'
import Login from './assets/pages/Login/Login';
import Dashbord from "./assets/pages/Dashbord/Dashbord";

function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}

const MotionPage = ({ children, from = -50 }) => (
  <motion.div
    initial={{ opacity: 0, x: from }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -from }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route
          path="/home"
          element={
            <MotionPage from={-50}>
              <Home />
            </MotionPage>
          }
        />

        <Route
          path="/login"
          element={
            <MotionPage from={50}>
              <Login />
            </MotionPage>
          }
        />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MotionPage from={50}>
              <Dashbord />
            </MotionPage>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <AnimatedRoutes />
    </Router>
  );
}