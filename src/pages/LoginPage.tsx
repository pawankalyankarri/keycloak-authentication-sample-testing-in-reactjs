import { Button } from "@/components/ui/button";
import keycloak from "@/KeyCloak";
import React from "react";

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    keycloak.login({
      redirectUri: "http://localhost:5173",  
    });
  };

  return (
    <div>
      <Button variant="outline" onClick={handleLogin}>
        Login with Keycloak
      </Button>
    </div>
  );
};

export default LoginPage;