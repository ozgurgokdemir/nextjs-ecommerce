module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      connectionString: env("DATABASE_URL"),
      host: env("PGHOST", "127.0.0.1"),
      port: env.int("PGPORT", 5931),
      database: env("PGDATABASE", "railway"),
      user: env("PGUSER", "postgres"),
      password: env("PGPASSWORD", "password"),
      ssl: env.bool(true),
    },
  },
});
