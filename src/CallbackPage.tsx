import { useEffect } from "react";
import KeyCloak from "./KeyCloak";

const CallbackPage = () => {
  useEffect(() => {
    console.log("Access Token:", KeyCloak.token);
    console.log("ID Token:", KeyCloak.idToken);
    console.log("Parsed Token:", KeyCloak.tokenParsed);
  }, []);

  return null; 
};

export default CallbackPage;
