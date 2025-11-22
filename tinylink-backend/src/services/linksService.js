import { saveLink } from '../models/linkModel.js';
import { generateCode } from '../utils/helpers.js';
import { validateUrl } from '../utils/validators.js';

export const createShortLinkService = async (url) => {

    if (!validateUrl(url)) {
        throw new Error('Invalid URL format');
    }

    const code = generateCode();

    const saved = await saveLink(url, code);

    return saved;
};
