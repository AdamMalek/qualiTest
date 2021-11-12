import { Pool, QueryResult } from 'pg';

export abstract class BaseRepository {

    protected constructor(protected dbPool: Pool) {
    }

    protected async query<T>(query: string, queryParams: any[] = []) : Promise<QueryResult<T>> {
        try {
            return this.dbPool.query<T>(query, queryParams);
        }
        catch (e)
        {
            console.error(e)
            throw e;
        }
    }
}