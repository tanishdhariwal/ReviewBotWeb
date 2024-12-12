FROM python:3.10-slim

WORKDIR /app

# Copy requirements.txt first to leverage Docker cache
COPY requirements.txt .

# Create and activate virtual environment, then install dependencies
RUN python -m venv venv && \
    /bin/bash -c "source venv/bin/activate && \
    pip install --upgrade pip && \
    pip install -r requirements.txt --no-cache-dir && \
    pip install torch torchvision torchaudio --no-cache-dir"

# Copy the rest of the application files
COPY . .

EXPOSE 8000

# Use the virtual environment to run the application
CMD ["/bin/bash", "-c", "source venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"]