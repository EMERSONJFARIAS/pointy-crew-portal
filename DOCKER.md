
# TimePulse Docker Image

This repository contains a Docker image for the TimePulse time tracking application.

## How to use this image

### Pull the image from Docker Hub

```bash
docker pull youruser/timepulse:latest
```

### Run the container

```bash
docker run -p 8080:80 youruser/timepulse:latest
```

The application will be available at http://localhost:8080

### Run with Docker Compose

```yaml
version: '3'

services:
  timepulse:
    image: youruser/timepulse:latest
    ports:
      - "8080:80"
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

## Building the image locally

```bash
# Clone the repository
git clone https://github.com/youruser/timepulse.git
cd timepulse

# Build the image
docker build -t youruser/timepulse:latest .

# Run the container
docker run -p 8080:80 youruser/timepulse:latest
```

## Publishing to Docker Hub

```bash
# Login to Docker Hub
docker login

# Build the image
docker build -t youruser/timepulse:latest .

# Push the image
docker push youruser/timepulse:latest
```

Replace `youruser` with your Docker Hub username.
