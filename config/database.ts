require('dotenv').config();

export default {
    user:  process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    host: process.env.DATABASE_HOST as string,
    port: +process.env.DATABASE_PORT!
};
