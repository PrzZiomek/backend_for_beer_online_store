export const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sklepinternetowy',
    database: 'beer_store_app_database',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}