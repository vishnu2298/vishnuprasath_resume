const path = require('path');

const config = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'dev-only-secret-change-me',
  dbFile: process.env.DB_FILE || path.join(__dirname, '..', 'data', 'connectly.db'),
  uploadDir: process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads'),
  insightsUrl: process.env.INSIGHTS_URL || 'http://127.0.0.1:5000',
  isProd: process.env.NODE_ENV === 'production',
};

if (config.isProd && config.jwtSecret === 'dev-only-secret-change-me') {
  throw new Error('JWT_SECRET must be set in production');
}

module.exports = config;
