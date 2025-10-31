import keycloak from "@/KeyCloak";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    console.log("Authorization code:", code); 
  },);
  useEffect(() => {

    if (keycloak.authenticated) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h3> Processing login...</h3>
    </div>
  );
};
export default CallbackPage;
