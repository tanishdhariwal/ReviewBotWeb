from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.Controllers.routes import router

app = FastAPI() 
app.include_router(router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
