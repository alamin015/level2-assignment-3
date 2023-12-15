import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  PORT: process.env.PORT,
  DATABASE_URL_PROD: process.env.DATABASE_URL_PROD,
  DATABASE_URL_LOCAL: process.env.DATABASE_URL_LOCAL,
};
