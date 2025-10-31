import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import keycloak from "./KeyCloak";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    
    keycloak
      .init({ onLoad: "check-sso", pkceMethod: "S256" })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        if (authenticated) {
          navigate("/dashboard");
          localStorage.setItem("token", keycloak.token || "");
        }
      })
      .catch((err) => console.error("Keycloak init failed:", err));
  }, [navigate]);
   const token = localStorage.getItem("token");
   console.log('token',token)
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;