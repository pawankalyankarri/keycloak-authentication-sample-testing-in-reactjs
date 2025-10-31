from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
import requests

KEYCLOAK_URL = "https://your-keycloak-domain/auth"
REALM = "my-realm"
ALGORITHM = "RS256"

bearer_scheme = HTTPBearer()

def get_public_key():
    # Fetch Keycloak public key from JWKS endpoint
    jwks_url = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/certs"
    response = requests.get(jwks_url)
    jwks = response.json()
    return jwks["keys"][0]  # Assumes only one key is active

def verify_token(credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)):
    token = credentials.credentials
    key = get_public_key()

    try:
        payload = jwt.decode(
            token,
            key=key,
            algorithms=[ALGORITHM],
            options={"verify_aud": False}  # Disable audience check if needed
        )
        return payload
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
