
// export default instance;

import axios from "axios";

const API_BASE = "http://localhost:3000/api/links"; // adjust for deployment
    // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',

export const getLinks = async () => {
    const res = await axios.get(API_BASE);
    return res.data.data; // array of links
};

export const createLink = async (url, customCode) => {
    const payload = { url };
    if (customCode) payload.customCode = customCode;

    const res = await axios.post(API_BASE, payload);
    return res.data.data; // newly created link
};

export const deleteLink = async (code) => {
    const res = await axios.delete(`${API_BASE}/${code}`);
    return res.data;
};

export const getLinkStats = async (code) => {
    const res = await axios.get(`${API_BASE}/${code}`);
    return res.data.data;
};
