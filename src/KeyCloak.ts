import Keycloak from "keycloak-js"

const KeyCloak = new Keycloak({
    url : "http://localhost:8080/",
    realm : "my-realm",
    clientId : "react-client"
})
export default KeyCloak;