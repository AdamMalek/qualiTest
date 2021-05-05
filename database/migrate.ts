import { createDb, migrate } from "postgres-migrations"

const dbConfig = {
    user: "postgres",
    password: "GbkGS=nD6hfy",
    database: "quali_test",
    host: "localhost",
    port: 5432
}

async function runMigrations(): Promise<void> {
    console.log("Migrations has been started.");

    await createDb('quali_test', {
        ...dbConfig,
        defaultDatabase: "postgres", // defaults to "postgres"
    });

    await migrate(dbConfig, `${__dirname}\\migrations`);

    console.log("Migrations has been finished.")
}

runMigrations();