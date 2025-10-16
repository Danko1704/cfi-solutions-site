import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`./src/messages/${locale || 'en'}.json`)).default;
  return { messages };
});
