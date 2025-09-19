# PowerShell script to initialize the School Management System

# Colors for output
$GREEN = "\e[32m"
$YELLOW = "\e[33m"
$NC = "\e[0m" # No Color

Write-Host "${YELLOW}🚀 Initializing School Management System Setup${NC}"

# Check if .env file exists
if (Test-Path -Path ".env") {
    Write-Host "${YELLOW}⚠️  .env file already exists. Backing up to .env.backup${NC}"
    Copy-Item -Path ".env" -Destination ".env.backup" -Force
}

# Copy .env.example to .env
Copy-Item -Path ".env.example" -Destination ".env" -Force
Write-Host "${GREEN}✅ Created .env file from .env.example${NC}"

# Generate random secrets
$DJANGO_SECRET_KEY = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 50 | ForEach-Object {[char]$_})
$NEXTAUTH_SECRET = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Update the .env file with generated secrets
(Get-Content .env) -replace 'SECRET_KEY=.*', "SECRET_KEY=$DJANGO_SECRET_KEY" | Set-Content .env
(Get-Content .env) -replace 'NEXTAUTH_SECRET=.*', "NEXTAUTH_SECRET=$NEXTAUTH_SECRET" | Set-Content .env

Write-Host "${GREEN}✅ Generated secure secrets for Django and NextAuth${NC}"

# Create necessary directories
Write-Host "${YELLOW}Creating necessary directories...${NC}"
New-Item -ItemType Directory -Force -Path "backend\static" | Out-Null
New-Item -ItemType Directory -Force -Path "backend\media" | Out-Null

# Initialize git if not already
if (-not (Test-Path -Path ".git")) {
    Write-Host "${YELLOW}Initializing git repository...${NC}"
    git init | Out-Null
}

# Display next steps
Write-Host "`n${GREEN}✨ Setup complete! Here's what to do next:${NC}"
Write-Host "1. Review the .env file and update any settings as needed"
Write-Host "2. Start the development environment with: ${YELLOW}.\scripts\docker-dev.ps1 start${NC}"
Write-Host "3. Access the application at ${GREEN}http://localhost:3000${NC}"
Write-Host "4. Access the admin panel at ${GREEN}http://localhost:8000/admin${NC}"
Write-Host "`nFor more information, check the README.md file"
