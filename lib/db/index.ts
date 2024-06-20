import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon("postgresql://neondb_owner:3lOyYWp8FLrG@ep-still-night-a55jzlf5.us-east-2.aws.neon.tech/neondb?sslmode=require" || process.env.DATABASE_URL);
export const db = drizzle(sql, {schema});