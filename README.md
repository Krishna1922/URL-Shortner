# URL Shortner

This is a webapp similar to tinyurl or bitly where you can short your long URLs into short one. I made this app with help the of famous system design book 
by Alex Xu.

## Installation

### Frontend

```bash
cd url-shortner-frontend
npm install
npm start
```

### Backend
Add the Database url here in database.py
```
SQLALCHEMY_DATABASE_URL = os.getenv("MYSQL_HOST")
```
Replace with
```
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://<username>:<password>@<host>/<dbname>"
```
Enter username, password, host and db details
```bash
cd url-shortner-backend
python3 -m venv env
source /env/bin/acivate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Docker

```docker
docker compose up
```
## Tech stack
- React
- FastAPI

