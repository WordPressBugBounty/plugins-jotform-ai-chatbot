const currencyLocales = {
  TRY: 'tr-TR',
  EUR: 'de-DE',
  USD: 'en-US',
  GBP: 'en-GB',
  JPY: 'ja-JP',
  INR: 'hi-IN',
  BRL: 'pt-BR',
  CHF: 'fr-CH',
  CAD: 'en-CA',
  AUD: 'en-AU',
  CNY: 'zh-CN',
  HKD: 'zh-HK',
  SGD: 'en-SG',
  KRW: 'ko-KR',
  ZAR: 'en-ZA'
};

export const orderLocale = currency => currencyLocales[currency] || navigator.language;

export const formatPrice = (value, currency) => {
  if (typeof value !== 'number' && typeof value !== 'string') return '';
  if (value === '' || !currency || !Number.isFinite(Number(value))) return String(value);
  const locale = orderLocale(currency);
  // Match the TL suffix used on Jotform's Turkish store cards.
  if (currency === 'TRY') {
    return `${Number(value).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;
  }
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    return `${value} ${currency}`;
  }
};

export const storeUrl = value => {
  if (typeof value !== 'string') return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
};
