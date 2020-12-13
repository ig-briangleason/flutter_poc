module.exports = {
  databaseUrl: process.env.PG_DEV_URL || 'postgres://localhost/--REPLACE ME--',
  server: {
    requireAuth: false,
    requireSsl: false
  }
};
