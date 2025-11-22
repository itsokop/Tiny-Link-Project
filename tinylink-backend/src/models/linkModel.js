// This file will handle DB operations.
import pool from '../config/db.js';

export const saveLink = async (originalUrl, code) => {
    const query = `
    INSERT INTO links (original_url, code)
    VALUES ($1, $2)
    RETURNING id, original_url, code, created_at;
  `;
    const values = [originalUrl, code];

    const result = await pool.query(query, values);
    return result.rows[0];
};

