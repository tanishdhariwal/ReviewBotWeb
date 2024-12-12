FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN python -m venv venv
RUN /bin/bash -c "source venv/bin/activate"
RUN pip install --upgrade pip && \
    pip install -r requirements.txt --no-cache-dir

RUN pip install torch torchvision torchaudio --no-cache-dir

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]