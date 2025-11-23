import * as linkService from '../services/linksService.js';

// Create a new short link
export const createLink = async (req, res, next) => {
    try {
        const { url, customCode } = req.body; // support optional custom code

        const result = await linkService.createLinkService(url, customCode);

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (err) {
        // If service throws a 409 error for duplicate
        if (err.code === 'DUPLICATE_CODE') {
            return res.status(409).json({ success: false, message: err.message });
        }
        // Default error
        next(err);
    }
};

// Get stats for a single code
export const getLinkStats = async (req, res, next) => {
    try {
        const { code } = req.params;
        const stats = await linkService.getLinkStatsService(code);
        if (!stats) return res.status(404).json({ success: false, message: 'Link not found' });
        res.json({ success: true, data: stats });
    } catch (err) {
        next(err);
    }
};

// Get all links
export const getAllLinks = async (req, res, next) => {
    try {
        const links = await linkService.getAllLinksService();
        res.json({ success: true, data: links });
    } catch (err) {
        next(err);
    }
};

// Delete a link
export const deleteLink = async (req, res, next) => {
    try {
        const { code } = req.params;
        const deleted = await linkService.deleteLinkService(code);
        if (!deleted) return res.status(404).json({ success: false, message: 'Link not found' });
        res.json({ success: true, message: 'Link deleted successfully' });
    } catch (err) {
        next(err);
    }
};

// Redirect link (/:code)
export const redirectLink = async (req, res, next) => {
    try {
        const { code } = req.params;
        const originalUrl = await linkService.getOriginalUrlService(code);
        if (!originalUrl) return res.status(404).send('Link not found');

        // redirection 302 Found
        res.redirect(302, originalUrl);
    } catch (err) {
        next(err);
    }
};
