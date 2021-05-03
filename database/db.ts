import { createDb, migrate } from "postgres-migrations"

const Pool = require('pg').Pool;

const dbConfig = {
    user: "postgres",
    password: "GbkGS=nD6hfy",
    database: "quali_test",
    host: "localhost",
    port: 5432
}

const pool = new Pool({...dbConfig});

async function runMigrations(): Promise<void> {
    await createDb('quali_test', {
        ...dbConfig,
        defaultDatabase: "postgres", // defaults to "postgres"
    });

    await migrate(dbConfig, `${__dirname}\\migrations`);
}

module.exports = { pool, runMigrations };