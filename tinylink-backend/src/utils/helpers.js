import { customAlphabet } from 'nanoid';

// Generates a random code of 6–8 characters
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const generateCode = (length = 6) => {
    const nanoid = customAlphabet(alphabet, length);
    return nanoid();
};
