param(
    [string]$Command = "start",
    [string]$Service = ""
)

# Set environment variables
$env:NODE_ENV = "development"
$env:COMPOSE_DOCKER_CLI_BUILD = 1
$env:DOCKER_BUILDKIT = 1

# Function to check if a command exists
function Test-CommandExists {
    param (
        [string]$command
    )
    $exists = $null -ne (Get-Command $command -ErrorAction SilentlyContinue)
    return $exists
}

# Check if Docker is installed
if (-not (Test-CommandExists "docker")) {
    Write-Error "Error: Docker is not installed. Please install Docker and try again."
    exit 1
}

# Check if Docker Compose is installed
if (Test-CommandExists "docker-compose") {
    $DOCKER_COMPOSE_CMD = "docker-compose"
} elseif (docker compose version) {
    $DOCKER_COMPOSE_CMD = "docker compose"
} else {
    Write-Error "Error: Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
}

# Function to start the containers
function Start-Containers {
    Write-Host "Starting development environment..." -ForegroundColor Green
    & $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml up -d --build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to start containers"
        exit $LASTEXITCODE
    }
}

# Function to stop the containers
function Stop-Containers {
    Write-Host "Stopping development environment..." -ForegroundColor Yellow
    & $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml down
}

# Function to view logs
function View-Logs {
    param (
        [string]$service = ""
    )
    
    if ($service) {
        & $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml logs -f $service
    } else {
        & $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml logs -f
    }
}

# Function to open a shell in the web container
function Enter-WebShell {
    & $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml exec web sh
}

# Function to open a shell in the backend container
function Enter-BackendShell {
    & $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml exec backend sh
}

# Function to open a shell in the database container
function Enter-DbShell {
    & $DOCKER_COMPOSE_CMD -f docker-compose.yml -f docker-compose.override.yml exec db psql -U postgres -d school_management
}

# Function to show help
function Show-Help {
    Write-Host "Usage: .\scripts\docker-dev.ps1 [command] [service]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Yellow
    Write-Host "  start       Start the development environment"
    Write-Host "  stop        Stop the development environment"
    Write-Host "  restart     Restart the development environment"
    Write-Host "  logs        View logs from all containers"
    Write-Host "  logs [service] View logs from a specific service (web, backend, db, redis, pgadmin)"
    Write-Host "  shell       Open a shell in the web container"
    Write-Host "  backend     Open a shell in the backend container"
    Write-Host "  db          Open a PostgreSQL shell in the database"
    Write-Host "  help        Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Green
    Write-Host "  .\scripts\docker-dev.ps1 start"
    Write-Host "  .\scripts\docker-dev.ps1 logs web"
    Write-Host "  .\scripts\docker-dev.ps1 shell"
}

# Main script logic
switch ($Command.ToLower()) {
    "start" {
        Start-Containers
    }
    "stop" {
        Stop-Containers
    }
    "restart" {
        Stop-Containers
        Start-Containers
    }
    "logs" {
        View-Logs -service $Service
    }
    "shell" {
        Enter-WebShell
    }
    "backend" {
        Enter-BackendShell
    }
    "db" {
        Enter-DbShell
    }
    { @("help", "--help", "-h") -contains $_ } {
        Show-Help
    }
    default {
        Write-Error "Error: Unknown command '$Command'"
        Write-Host ""
        Show-Help
        exit 1
    }
}

exit 0
