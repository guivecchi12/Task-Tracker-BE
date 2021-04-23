// Update with your config settings.

module.exports = {

  // development: {
  //   client: 'sqlite',
  //   connection: { filename: './data/tracker.db3' },
  //   pool: {
  //     afterCreate: (conn, done) => {
  //       conn.run("PRAGMA foreign_keys = ON", done)
  //     }
  //   },
  //   useNullAsDefault: true
  // },
  development: {
    client: 'pg',
    connection: {
      connectionString:process.env.DATABASE_URL,
      ssl: {rejectUnauthorized: false}
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './migrations'
    }
  },
  
  production: {
    client: 'pg',
    connection: {
      connectionString:process.env.DATABASE_URL,
      ssl: {rejectUnauthorized: false}
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './migrations'
    }
  }

};
