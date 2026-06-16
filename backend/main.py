from fastapi import FastAPI,HTTPException,status,Header
from models import UserSignup ,UserLogin
from database import db
from authhelpers import hashpass,verifypass,create_access_token,verify_access_token
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/signup")
def signup(user:UserSignup):
    
    existing_user=db.users.find_one({"email":user.email})
    if existing_user:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="USER EXISTs"
        )
    hashed_pwd=hashpass(user.password)
    new_user_data={
        "name":user.name,
        "email":user.email,
        "password":hashed_pwd
    }
    db.users.insert_one(new_user_data)
    return(
        "user created successfully"
    )
    
@app.post("/login")
def login(user:UserLogin):
    email=user.email
    password=user.password
    existing_user=db.users.find_one({"email":email})
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="invalid credentials"
        )
    is_correct_password=verifypass(password,existing_user["password"])
    if not is_correct_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="invalid credentials"
        )
    token_data={
        "sub":existing_user["email"]
        
    }
    access_token=create_access_token(token_data)
    return {
        "access_token":access_token,
        "token_type":"bearer",
        "message":"login successful"
    }
    
@app.get("/dashboard")
def dashboard(authorization:str= Header(None)):
    if not authorization:
        raise HTTPException(status_code=401,detail="token missing")
    token = authorization.split(" ")[1]
    user_data=verify_access_token(token)
    if not user_data:
        raise HTTPException(status_code=401,detail="check token may be expired or unavailable")
    user_email=user_data["sub"]
    user_in_db=db.users.find_one({"email":user_email})
    
    if not user_in_db:
        raise HTTPException(status_code=404,detail="User not found")
    
    return{
        "name":user_in_db["name"],
        "email":user_in_db["email"]
    }