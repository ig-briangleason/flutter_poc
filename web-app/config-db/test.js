module.exports = {
  databaseUrl: process.env.PG_TEST_URL || 'postgres://localhost/--REPLACE ME--',
  server: {
    requireAuth: false,
    requireSsl: false
  }
};
