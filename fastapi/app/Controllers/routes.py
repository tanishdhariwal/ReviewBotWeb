from fastapi import APIRouter, Depends, HTTPException
from typing import List
from pymongo import MongoClient
from app.Schemas.models import User  # Assuming you have a User model defined in models.py
from app.DB.session import dbConnection  # Import the dbConnection function

router = APIRouter()

@router.get("/users", response_model=List[User])
async def get_all_users(db: MongoClient = Depends(dbConnection)):
    users_collection = db["Users"]  # Assuming the collection name is "users"
    users = list(users_collection.find({}))
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users