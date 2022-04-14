require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 8000,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  API_PREFIX: process.env.API_PREFIX || '/api',
  API: process.env.API || 'https://rickandmortyapi.com/api',
  MAX_PAGES: process.env.MAX_PAGES || 42
}
