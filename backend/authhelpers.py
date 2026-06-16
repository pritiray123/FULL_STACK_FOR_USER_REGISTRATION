import bcrypt
import jwt
from datetime import datetime ,timedelta, timezone 

SECRET_KEY="super_secret_key_that_is_long_enough_for_sha256_bhai_bhai"
ALGORITHM="HS256"

def hashpass(password: str)-> str:
    password_bytes= password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed= bcrypt.hashpw(password_bytes,salt)
    
    return hashed.decode("utf-8")
def verifypass(plain_pass:str,hashed_Pass:str)->bool:
    plain_pass_byte=plain_pass.encode('utf-8')
    hashed_pass_byte= hashed_Pass.encode("utf-8")
    return bcrypt.checkpw(plain_pass_byte,hashed_pass_byte)

def create_access_token(data:dict)->str:
    toencode=data.copy()
    expiry= datetime.now(timezone.utc) +  timedelta(minutes=30)
    toencode.update({"exp":expiry})
    encoded_jwt=jwt.encode(toencode,SECRET_KEY,algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token:str)->dict|None:
    try:
        decoded_token=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        return decoded_token
    except jwt.PyJWTError as e:
        print(f"🚨 JWT Decode Error: {str(e)}") 
        return None
    
    