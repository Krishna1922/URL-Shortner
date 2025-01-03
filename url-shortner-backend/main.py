import uuid
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from fastapi import Request
from fastapi.responses import HTMLResponse, RedirectResponse
from models import MappingTable, Base
from typing import Annotated
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://url-shortner-three-orcin.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind = engine)
def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


def getUniqueId():
    return uuid.uuid4().int & (1 << 64)- 1

def idToShortURL(id: int):

    """
    code to convert unique id into short url
    """

    values = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    short_url = ""
    while id:
        short_url += values[id%62]
        id //= 62
    
    return short_url[::-1]
 
def health_check():
    return {"status": "site is up"}

class LongURLschema(BaseModel):
    longURL : str

@app.get("/{shortned_url}")
def get_shortned_url(request : Request, db : db_dependency, shortned_url : str):
    result = db.query(MappingTable).filter(MappingTable.ShortUrl == shortned_url).first()
    if result is not None:
        return JSONResponse(content={'url' : result.LongUrl})
    else:
        return JSONResponse(content={'content' : 'URL is not is database'})

@app.post("/generate_url", response_model=LongURLschema)
def ShortTheUrl(request : Request, db : db_dependency, url :  LongURLschema):
    # check whether URL exist on db on not
    result = db.query(MappingTable).filter(MappingTable.LongUrl == url.longURL).first()
    if result is not None:
        return JSONResponse(content={'content' : result.ShortUrl})
    
    unique_id = getUniqueId()
    shorturl = idToShortURL(unique_id)

    mapping_model = MappingTable()
    mapping_model.longID = str(unique_id)
    mapping_model.LongUrl = url.longURL
    mapping_model.ShortUrl = shorturl

    db.add(mapping_model)
    db.commit()

    fullurl = f'https://url-shortner-three-orcin.vercel.app/{shorturl}'
    json = {
        'url' : fullurl
    }
    return JSONResponse(content = json)

