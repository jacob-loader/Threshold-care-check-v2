#!/bin/bash

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "Created .env.local file. Please update the environment variables."
fi

# Create database
npx prisma db push

# Start the development server
npm run dev 