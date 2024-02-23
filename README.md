# Clav backend

Clav backend API

## Running in local dev:

`cp .env.template .env`
`docker compose up` - on first run, to init postgres
`npm install`
`npm run dev`

## Seeding database:

1. Create your database
`psql -U $(your db username, probably postgres)` - `psql -U postgres`
`CREATE DATABASE clav;`

2. Setup snaplet
`npx snaplet setup` (You might create a snaplet account to get access token)

3. Sync Typeorm <> Database
`npm run typeorm:sync`

4. Prepare Snaplet
`npm run seed:generate`

5. Dry run to check if it's ok
`npm run seed:dry`

6. Normal run to apply seed records to the database
`npm run seed:apply`
