import dotenv from 'dotenv';
dotenv.config();
export const ENV = {
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    PORT: process.env.PORT || 3000,
    CORS_ORIGIN: process.env.FRONTEND_URL || 'http://localhost:5173',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret',
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    NODE_ENV: process.env.NODE_ENV || 'development',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret',
}