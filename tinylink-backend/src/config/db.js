import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Test DB connection
pool.query('SELECT NOW()')
    .then(res => {
        console.log('Connected to DB at', res.rows[0].now);
    })
    .catch(err => {
        console.error('DB connection error:', err.message);
    });

export default pool;
