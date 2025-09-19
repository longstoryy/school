# School Management System

A modern, responsive school management system built with Next.js, TypeScript, Tailwind CSS, and Django. This application provides a comprehensive solution for managing school operations including student information, teacher management, class scheduling, attendance tracking, and more.

## Features

- **Dashboard**: Overview of key metrics and recent activities
- **Student Management**: Add, view, edit, and manage student records
- **Teacher Management**: Manage teacher information and assignments
- **Class Management**: Organize classes and subjects
- **Attendance Tracking**: Record and monitor student attendance
- **Fee Management**: Handle fee collection and receipts
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Built-in dark theme support

## Tech Stack

- **Frontend**:
  - Next.js 14 with App Router
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui components
  - React Hook Form
  - Zod for validation

- **Backend**:
  - Django
  - Django REST Framework
  - PostgreSQL
  - JWT Authentication

- **DevOps**:
  - Docker
  - Docker Compose
  - Multi-stage builds
  - Development/Production configurations

## Prerequisites

- [Docker](https://www.docker.com/get-started) (with Docker Compose)
- [Git](https://git-scm.com/)

## Quick Start with Docker (Recommended)

The easiest way to get started is using our initialization script, which will set up all the necessary services with a single command.

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/school-management-system.git
   cd school-management-system
   ```

2. **Run the initialization script**
   
   For Windows (PowerShell):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   .\scripts\init.ps1
   ```
   
   For macOS/Linux:
   ```bash
   chmod +x ./scripts/init.sh
   ./scripts/init.sh
   ```
   
   This will:
   - Create a `.env` file from the example
   - Generate secure random secrets
   - Set up necessary directories
   - Initialize a git repository (if not already one)

3. **Start the application**
   
   For Windows:
   ```powershell
   .\scripts\docker-dev.ps1 start
   ```
   
   For macOS/Linux:
   ```bash
   ./scripts/docker-dev.sh start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin Interface: http://localhost:8000/admin
   - PGAdmin: http://localhost:5050 (email: admin@school.com, password: admin)

## Manual Setup (Without Docker)

If you prefer to run the application without Docker, follow these steps:

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/school-management-system.git
   cd school-management-system
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install Python dependencies (from backend directory)
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Frontend
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   
   # Backend
   SECRET_KEY=your-secret-key
   DEBUG=True
   DATABASE_URL=postgresql://user:password@db:5432/school_management
   ALLOWED_HOSTS=localhost,127.0.0.1
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   ```

4. **Run with Docker**
   ```bash
   docker-compose up --build
   ```

5. **Or run locally**
   ```bash
   # Start frontend
   npm run dev
   
   # In a new terminal, start backend
   cd backend
   python manage.py migrate
   python manage.py runserver
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin

## Project Structure

```
school-management-system/
├── app/                    # Next.js app directory
│   ├── dashboard/          # Dashboard pages
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
│   ├── ui/                 # Shadcn/ui components
│   └── dashboard/          # Dashboard specific components
├── lib/                    # Utility functions
├── public/                 # Static files
├── styles/                 # Global styles
├── backend/                # Django backend
│   ├── core/               # Core Django app
│   ├── accounts/           # User management
│   ├── students/           # Student management
│   ├── teachers/           # Teacher management
│   └── manage.py
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Frontend Dockerfile
├── Dockerfile.backend      # Backend Dockerfile
└── package.json            # Frontend dependencies
```

## Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Docker Commands

#### Windows (PowerShell)
- `.\scripts\docker-dev.ps1 start` - Start all services
- `.\scripts\docker-dev.ps1 stop` - Stop all services
- `.\scripts\docker-dev.ps1 logs [service]` - View logs
- `.\scripts\docker-dev.ps1 shell` - Open shell in web container
- `.\scripts\docker-dev.ps1 backend` - Open shell in backend container
- `.\scripts\docker-dev.ps1 db` - Open PostgreSQL shell

#### macOS/Linux
- `./scripts/docker-dev.sh start` - Start all services
- `./scripts/docker-dev.sh stop` - Stop all services
- `./scripts/docker-dev.sh logs [service]` - View logs
- `./scripts/docker-dev.sh shell` - Open shell in web container
- `./scripts/docker-dev.sh backend` - Open shell in backend container
- `./scripts/docker-dev.sh db` - Open PostgreSQL shell

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)