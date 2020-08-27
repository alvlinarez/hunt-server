require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  DB_MONGO,
  JWT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} = process.env;

module.exports = {
  env: NODE_ENV,
  port: PORT,
  dbMongo: DB_MONGO,
  jwtSecret: JWT_SECRET,
  facebookClientId: FACEBOOK_CLIENT_ID,
  facebookClientSecret: FACEBOOK_CLIENT_SECRET,
  googleClientId: GOOGLE_CLIENT_ID,
  googleClientSecret: GOOGLE_CLIENT_SECRET
};
