FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./

RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    cmake \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6 \
    libgl1-mesa-glx \
 && pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]