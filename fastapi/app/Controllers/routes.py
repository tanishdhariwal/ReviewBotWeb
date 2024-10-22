import random
from fastapi import APIRouter, Depends, HTTPException, status, Request
from typing import List
from pymongo import MongoClient
from app.Schemas.models import User, TextInput, responses  # Assuming you have a User model defined in models.py
from app.DB.session import dbconnection  # Import the dbConnection function
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from app.Schemas.models import QueryInput
from jose import JWTError, jwt
import os
from dotenv import load_dotenv
import time

load_dotenv()

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def verify_token(request: Request):
    token = request.headers.get("Authorization")
    if not token or token.strip() == "":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token Not Received",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        token = token.split(" ")[1]  # Remove 'Bearer' prefix
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # You can also return user information if needed
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token Expired",
            headers={"WWW-Authenticate": "Bearer"},
        ) from e

@router.post("/random_text")
async def get_random_text(input: TextInput, token: dict = Depends(verify_token)):
    
    try:
        username = token.get("username")
        time.sleep(5)
        print("I came here bruh !!")
        random_response = random.choice(responses)
        print( input ," ---> ", random_response)
        random_response = random_response + "----------- " + username
        return {"response": random_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# # Load the model and tokenizer (you can load this once when the app starts)
# model = AutoModelForCausalLM.from_pretrained(
#     "microsoft/Phi-3.5-mini-instruct",
#     device_map="cuda",
#     torch_dtype="auto",
#     trust_remote_code=True,
# )
#
#
# print("Model is loaded !")
# tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3.5-mini-instruct")
# print("Tokenizer loaded")
#
#
# pipe = pipeline(
#     "text-generation",
#     model=model,
#     tokenizer=tokenizer,
# )
#
#
# generation_args = {
#     "max_new_tokens": 700,
#     "return_full_text": False,
#     "temperature": 0.0,
#     "do_sample": False,
# }
#
#
#
#
# # Route to handle the generation
# @router.post("/generate")
# async def generate_text(query: QueryInput):
#     try:
#
#         print("I came here bruh !!")
#         messages = [
#             {"role": "system", "content": "You are an AI Assistant"},
#             {"role": "user", "content": query.query},
#         ]
#
#         output = pipe(messages, **generation_args)
#         return {"response": output[0]['generated_text']}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


@router.get("/users", response_model=List[User])
async def get_all_users(db: MongoClient = Depends(dbconnection)):
    users_collection = db["users"]  # Assuming the collection name is "users"
    users = list(users_collection.find({}))

    # Map MongoDB _id to id
    for user in users:
        user["id"] = str(user.pop("_id"))

    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users