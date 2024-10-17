# app/Schemas/models.py
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: Optional[str]
    username: str
    email: str
    password: str

    class Config:
        from_attributes = True


class QueryInput(BaseModel):
    query:str


class TextInput(BaseModel):
    text: str

responses = [
    "This is a random response 1.",
    "Here is another random response.",
    "Yet another random text for you.",
    "Random response number four.",
    "This is the fifth random response."
]
