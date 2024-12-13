FROM python:3.11.8-slim

LABEL version="1.0"
LABEL description="This is the base docker python-backend image for workflow-automation"

WORKDIR /app

RUN apt-get update

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]