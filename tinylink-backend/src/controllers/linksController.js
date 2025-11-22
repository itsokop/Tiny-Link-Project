// import { saveLink } from '../models/linkModel.js';
// import { generateCode } from '../utils/helpers.js';
// import { validateUrl } from '../utils/validators.js';

// export const createShortLink = async (req, res, next) => {
//     try {
//         const { url } = req.body;

//         // Validate input
//         if (!validateUrl(url)) {
//             return res.status(400).json({ error: 'Invalid URL format' });
//         }

//         // Generate short code
//         const code = generateCode();

//         // Save to DB
//         const newLink = await saveLink(url, code);

//         res.status(201).json({
//             message: 'Short link created',
//             data: newLink,
//         });
//     } catch (err) {
//         next(err);
//     }
// };



import * as linkService from '../services/linksService.js';

export const createShortLink = async (req, res, next) => {
    try {
        const { url } = req.body;

        const result = await linkService.createShortLinkService(url);

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (err) {
        next(err);
    }
};
