-- Create additional database users if needed
-- CREATE USER readonly WITH PASSWORD 'readonly';
-- GRANT CONNECT ON DATABASE school_management TO readonly;
-- GRANT USAGE ON SCHEMA public TO readonly;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types if needed
-- CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

-- Create tables and other database objects here
-- This file will be executed when the PostgreSQL container starts
