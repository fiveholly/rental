# Rental Management System - Backend (NestJS skeleton)

This repository is a runnable skeleton that implements the requested backend structure and the core entities/logic you specified.

## What is included
- NestJS project structure (modules, controllers, services)
- TypeORM entities for User, Property, Tenant, Contract, Bill, MaintenanceRequest
- DTOs with class-validator
- Auth module using Passport + JWT (skeleton)
- A scheduled job skeleton to generate bills daily using @nestjs/schedule
- Multer-based file upload handler (uploads stored in /uploads)
- A SQL migration file to initialize database schema
- README with instructions

## Quick start (development)
1. Install dependencies:
```bash
npm install
```

2. Create a MySQL database and update `.env` (copy `.env.example` to `.env`).

3. Run database migration (SQL provided in `migrations/init_schema.sql`) or use TypeORM migrations.

4. Start in dev mode:
```bash
npm run start:dev
```

## Notes & next steps
- This is a skeleton to accelerate development — core business logic (detailed validation, payment integrations, file storage to cloud, production hardening) should be expanded for production.
- Contract creation, bill generation, and tenant permission checks are implemented as core examples and need to be expanded with full test coverage.

Download the ZIP from the link provided after generation.
