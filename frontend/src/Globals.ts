import packageJson from '../package.json';

export const API_URL = process.env.REACT_APP_API_URL || "";

export const FRONTEND_VERSION = packageJson.version || "Version Not Found";
