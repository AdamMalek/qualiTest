require('dotenv').config();
import { createDb, migrate } from "postgres-migrations";
import dbConfig from "../config/database";

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