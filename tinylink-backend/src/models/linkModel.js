// This file handles all DB operations for links
import pool from '../config/db.js';

// Save a new link
export const saveLink = async (originalUrl, code) => {
    const query = `
        INSERT INTO links (original_url, code)
        VALUES ($1, $2)
        RETURNING id, original_url, code, total_clicks, last_clicked, created_at;
    `;
    const values = [originalUrl, code];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// Find a link by its code
export const findLinkByCode = async (code) => {
    const query = `
        SELECT id, original_url, code, total_clicks, last_clicked, created_at
        FROM links
        WHERE code = $1
    `;
    const result = await pool.query(query, [code]);
    return result.rows[0]; // null if not found
};

// Get all links (for dashboard)
export const getAllLinksFromDB = async () => {
    const query = `
        SELECT id, original_url, code, total_clicks, last_clicked, created_at
        FROM links
        ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
};

// Delete a link by code
export const deleteLinkFromDB = async (code) => {
    const query = `
        DELETE FROM links
        WHERE code = $1
        RETURNING id
    `;
    const result = await pool.query(query, [code]);
    return result.rows[0]; // null if not found
};

// Increment click count and update last_clicked
export const incrementClick = async (code) => {
    const query = `
        UPDATE links
        SET total_clicks = total_clicks + 1,
            last_clicked = NOW()
        WHERE code = $1
        RETURNING id, total_clicks, last_clicked
    `;
    const result = await pool.query(query, [code]);
    return result.rows[0]; // null if not found
};
