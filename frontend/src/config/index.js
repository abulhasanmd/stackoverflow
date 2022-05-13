/* eslint-disable no-undef */
const config = {
  BASE_URL: process.env.REACT_APP_API_URL,
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  config.BASE_URL =
    // "http://28e8-2600-1700-65aa-d910-8070-2137-b6b-332f.ngrok.io"
    "http://28e8-2600-1700-65aa-d910-8070-2137-b6b-332f.ngrok.io"
  // 'http://localhost:3001';
}

export default config
