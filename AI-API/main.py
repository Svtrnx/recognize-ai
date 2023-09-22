from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai import main_ai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FileUrlInput(BaseModel):
    file_url: str

    
@app.post("/ai/recognize")
async def recognize(file_url_input: FileUrlInput):
    file_url = file_url_input.file_url
    result = main_ai(file_url)
    return {"result": [result]}


