#!/bin/bash

# Set environment variables
export NODE_ENV=development
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if Docker is installed
if ! command_exists docker; then
  echo "Error: Docker is not installed. Please install Docker and try again."
  exit 1
fi

# Check if Docker Compose is installed
if ! command_exists docker-compose; then
  # Check if Docker Compose V2 is available
  if ! docker compose version &>/dev/null; then
    echo "Error: Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
  else
    # Use Docker Compose V2
    DOCKER_COMPOSE_CMD="docker compose"
  fi
else
  DOCKER_COMPOSE_CMD="docker-compose"
fi

# Function to start the containers
start_containers() {
  echo "Starting development environment..."
  $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml up -d --build
}

# Function to stop the containers
stop_containers() {
  echo "Stopping development environment..."
  $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml down
}

# Function to view logs
view_logs() {
  $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml logs -f $1
}

# Function to open a shell in the web container
web_shell() {
  $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml exec web sh
}

# Function to open a shell in the backend container
backend_shell() {
  $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml exec backend sh
}

# Function to open a shell in the database container
db_shell() {
  $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml exec db psql -U postgres -d school_management
}

# Function to show help
show_help() {
  echo "Usage: ./scripts/docker-dev.sh [command]"
  echo ""
  echo "Commands:"
  echo "  start       Start the development environment"
  echo "  stop        Stop the development environment"
  echo "  restart     Restart the development environment"
  echo "  logs        View logs from all containers"
  echo "  logs [service] View logs from a specific service (web, backend, db, redis, pgadmin)"
  echo "  shell       Open a shell in the web container"
  echo "  backend     Open a shell in the backend container"
  echo "  db          Open a PostgreSQL shell in the database"
  echo "  help        Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./scripts/docker-dev.sh start"
  echo "  ./scripts/docker-dev.sh logs web"
  echo "  ./scripts/docker-dev.sh shell"
}

# Main script logic
case "$1" in
  start)
    start_containers
    ;;
  stop)
    stop_containers
    ;;
  restart)
    stop_containers
    start_containers
    ;;
  logs)
    view_logs "$2"
    ;;
  shell)
    web_shell
    ;;
  backend)
    backend_shell
    ;;
  db)
    db_shell
    ;;
  help|--help|-h)
    show_help
    ;;
  *)
    echo "Error: Unknown command '$1'"
    echo ""
    show_help
    exit 1
    ;;
esac

exit 0
