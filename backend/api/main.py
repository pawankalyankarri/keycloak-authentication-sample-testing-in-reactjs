from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from auth import verify_token

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/protected")
def protected_route(user=Depends(verify_token)):
    return {
        "message": "Access granted",
        "user": user.get("preferred_username"),
        "roles": user.get("realm_access", {}).get("roles", [])
    }

@app.get("/")
def public_route():
    return {"message": "Public access"}
