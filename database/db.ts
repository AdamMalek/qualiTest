import dbConfig from "../config/database";
import { Pool } from 'pg';

const dbPool = new Pool({ ...dbConfig });

export { dbPool };