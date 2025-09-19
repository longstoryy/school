# =======================================
# Prisma builder stage
# =======================================
FROM node:18 as prisma-builder

WORKDIR /app

# Install Prisma
RUN npm install -g prisma

# Copy only the prisma directory
COPY prisma ./prisma

# Generate Prisma client
RUN cd prisma && prisma generate

# =======================================
# Development stage
# =======================================
FROM python:3.11-slim as development

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    DJANGO_SETTINGS_MODULE=core.settings \
    DJANGO_DEBUG=True

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    gnupg \
    libjpeg-dev \
    zlib1g-dev \
    libwebp-dev \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Copy generated Prisma client from the builder
COPY --from=prisma-builder /app/prisma ./prisma

# Expose the port the app runs on
EXPOSE 8000

# Create necessary directories
RUN mkdir -p /app/staticfiles /app/media

# Command to run the application
CMD ["sh", "-c", "python manage.py collectstatic --noinput && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

# =======================================
# Production stage
# =======================================
FROM python:3.11-slim as production

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    DJANGO_SETTINGS_MODULE=core.settings \
    DJANGO_DEBUG=False

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY --from=development /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/
COPY --from=development /usr/local/bin/ /usr/local/bin/
COPY requirements.txt .

# Copy project
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application using gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi"]
