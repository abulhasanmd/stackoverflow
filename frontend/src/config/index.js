/* eslint-disable no-undef */
const config = {
  BASE_URL: process.env.REACT_APP_API_URL,
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  config.BASE_URL =
    "https://d856-2600-1700-65aa-d910-247f-d015-ed79-5090.ngrok.io"
}

export default config
