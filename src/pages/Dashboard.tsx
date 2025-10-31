import { Button } from "@/components/ui/button";
import keycloak from "@/KeyCloak";
import React from "react";

const Dashboard: React.FC = () => {
  const logout = () => keycloak.logout({ redirectUri: "http://localhost:5173" });

  return (
    <div>
      <h2>Welcome </h2>
      <p>You are logged in as: <b>{keycloak.tokenParsed?.preferred_username}</b></p>
      <Button
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
