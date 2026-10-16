/**
 * Format numeric price into Kyrgyz som string
 */
export const formatPrice = (price: number): string => {
  return `${Math.round(price).toLocaleString('ru-RU')} сом`;
};

/**
 * Format ISO date string into readable Russian timestamp
 */
export const formatDateTime = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
};

/**
 * Get base URL for QR codes.
 * Respects VITE_PUBLIC_BASE_URL if set, otherwise falls back to current origin.
 */
export const getBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const pathname = window.location.pathname.replace(/\/+$/, '');
    return pathname ? `${origin}${pathname}` : origin;
  }
  return 'http://localhost:5173';
};

/**
 * Generate full table URL
 */
export const getTableUrl = (tableId: number, customBase?: string): string => {
  const base = (customBase || getBaseUrl()).replace(/\/+$/, '');
  return `${base}/?table=${tableId}`;
};

/**
 * Copy text to clipboard safely
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  } catch (err) {
    console.warn('Clipboard write failed:', err);
    return false;
  }
};
