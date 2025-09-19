#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Initializing School Management System Setup${NC}"

# Check if .env file exists
if [ -f ".env" ]; then
  echo -e "${YELLOW}⚠️  .env file already exists. Backing up to .env.backup${NC}"
  cp .env .env.backup
fi

# Copy .env.example to .env
cp .env.example .env

echo -e "${GREEN}✅ Created .env file from .env.example${NC}"

# Generate a random secret key for Django
DJANGO_SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(50))")
NEXTAUTH_SECRET=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")

# Update the .env file with generated secrets
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' "s|SECRET_KEY=.*|SECRET_KEY='$DJANGO_SECRET_KEY'|" .env
  sed -i '' "s|NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET='$NEXTAUTH_SECRET'|" .env
else
  # Linux
  sed -i "s|SECRET_KEY=.*|SECRET_KEY='$DJANGO_SECRET_KEY'|" .env
  sed -i "s|NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET='$NEXTAUTH_SECRET'|" .env
fi

echo -e "${GREEN}✅ Generated secure secrets for Django and NextAuth${NC}"

# Make scripts executable
echo -e "${YELLOW}Setting up script permissions...${NC}"
chmod +x scripts/*.sh
chmod +x scripts/docker-dev.sh

# Create necessary directories
echo -e "${YELLOW}Creating necessary directories...${NC}"
mkdir -p backend/static
mkdir -p backend/media

# Initialize git if not already
echo -e "${YELLOW}Initializing git repository...${NC}"
git init

echo -e "\n${GREEN}✨ Setup complete! Here's what to do next:${NC}"
echo "1. Review the .env file and update any settings as needed"
echo "2. Start the development environment with: ${YELLOW}./scripts/docker-dev.sh start${NC}"
echo "3. Access the application at ${GREEN}http://localhost:3000${NC}"
echo "4. Access the admin panel at ${GREEN}http://localhost:8000/admin${NC}"
echo "\nFor more information, check the README.md file"
