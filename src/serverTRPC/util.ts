function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  if (process.env.WEBSITE_URL)
    return `${process.env.WEBSITE_URL}`;
  else {
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }
}


export const base_url = getBaseUrl();