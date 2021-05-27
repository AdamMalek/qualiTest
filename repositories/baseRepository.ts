import { QueryResult } from 'pg';
import { dbPool } from '../database/db';

export abstract class BaseRepository {
    protected async query<T>(query: string, queryParams: any[] = []) : Promise<QueryResult<T>> {
        try {
            return dbPool.query<T>(query, queryParams);
        }
        catch (e)
        {
            console.error(e)
            throw e;
        }
    }
}