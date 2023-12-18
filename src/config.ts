function getBaseApiUrl(value: string) {
  if (value !== null && value !== undefined) {
    return `${value}api`;
  } else {
    return undefined;
  }
}

export const BASE_API_URL = getBaseApiUrl(import.meta.env.VITE_BASE_API_URL);
export const LOCALHOST_SITE_URL = import.meta.env.VITE_BASE_SITE_URL;
export const PROD_SITE_URL = import.meta.env.VITE_PROD_URL;
export const SOCKET_URL = import.meta.env.VITE_BASE_API_URL;
