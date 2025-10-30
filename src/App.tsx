import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CallbackPage from "./CallbackPage";
import KeyCloak from "./KeyCloak";

function App() {
  const [isauth, setIsauth] = useState(false);
  const [loading, setLoading] = useState(true);
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;

    KeyCloak.init({ onLoad: "login-required" })
      .then((auth) => {
        setIsauth(auth);
        setLoading(false);
        if (!auth) {
          KeyCloak.login();
        } else {
          console.log("Authenticated");
          localStorage.setItem("token", KeyCloak.token || "");

          setInterval(() => {
            KeyCloak.updateToken(60).then((refreshed) => {
              if (refreshed) {
                localStorage.setItem("token", KeyCloak.token || "");
              }
            });
          }, 60000);
        }
      })
      .catch((err) => console.error("Keycloak init failed:", err));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isauth) return <div>Not authenticated</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
