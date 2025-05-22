const baseUrl = import.meta.env.VITE_BASE_URL;

export const constructUrl = (path: string) => baseUrl + path;