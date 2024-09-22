# Assignment Missions

This project is a **Next.js** application, designed for managing mission-based assignments, built with **Prisma** and styled using **Tailwind CSS**.

## Live Demo
[assignment-missions.vercel.app](https://assignment-missions.vercel.app)

## Features
- **Next.js** framework
- **Prisma** for database interaction
- **Tailwind CSS** for modern styling
- **TypeScript** for type safety
- **ShadCn** for type styling

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL database (or other Prisma-supported databases)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ujjwal-sharma221/assignment-missions.git
   cd assignment-missions

2. Setup environment variables:
   Make an .env file from copy.env and assign all the variables.
   In case you are not using Vercel Database, you do not need to assign all the db related variables and all of those can be encompassed within a variable of your choice,       preferably `DATABSE_URL`. Also make sure to change database variables in the schema.prisma file

3. Setup Prisma:
   After completing above steps, just run this command in your terminal
   ```bash
   npx prisma migrate dev
   
  
