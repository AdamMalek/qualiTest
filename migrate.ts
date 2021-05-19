import { createDb, migrate } from "postgres-migrations";
require('dotenv').config();
import dbConfig from "./config/database";

async function runMigrations(): Promise<void> {
    console.log("Migrations has been started.");

    await createDb('quali_test', {
        ...dbConfig,
        defaultDatabase: "postgres", // defaults to "postgres"
    });

    await migrate(dbConfig, `${__dirname}\\database\\migrations`);

    console.log("Migrations has been finished.")
}

runMigrations();