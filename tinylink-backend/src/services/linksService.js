import { saveLink, findLinkByCode, getAllLinksFromDB, deleteLinkFromDB, incrementClick } from '../models/linkModel.js';
import { generateCode } from '../utils/helpers.js';
import { validateUrl } from '../utils/validators.js';

export const createLinkService = async (url, customCode) => {
    if (!validateUrl(url)) {
        throw new Error('Invalid URL format');
    }

    // Use custom code if provided; otherwise generate random
    let code = customCode || generateCode();

    // Check if code already exists
    const existing = await findLinkByCode(code);
    if (existing) {
        const err = new Error('Code already exists');
        err.code = 'DUPLICATE_CODE';
        throw err;
    }

    // Save to DB
    const saved = await saveLink(url, code);
    return saved;
};

// Stats for single code
export const getLinkStatsService = async (code) => {
    const link = await findLinkByCode(code);
    if (!link) return null;

    return {
        code: link.code,
        originalUrl: link.original_url,
        totalClicks: link.total_clicks,
        lastClicked: link.last_clicked,
        createdAt: link.created_at,
    };
};

// Get all links
export const getAllLinksService = async () => {
    return await getAllLinksFromDB();
};

// Delete link
export const deleteLinkService = async (code) => {
    return await deleteLinkFromDB(code);
};

// Get original URL for redirect and increment clicks
export const getOriginalUrlService = async (code) => {
    const link = await findLinkByCode(code);
    if (!link) return null;

    // Increment click count and update last_clicked
    await incrementClick(code);

    return link.original_url;
};
