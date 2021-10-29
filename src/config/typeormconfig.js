exports.default = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "v4n97GDBLLbLf6SV",
    database: process.env.DB_NAME || "test_db",
    synchronize: false,//!process.env.DB_NO_SYNC,
    logging: false,//!process.env.DB_NO_LOGS,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 2000,
    entities: [
        "src/models/entities/*.js"
    ],
    migrations: [
        "src/models/migration/*.js"
    ],
    cli: {
        "entitiesDir": "src/models/entities",
        "migrationsDir": "src/models/migration",
    },
};