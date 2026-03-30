/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_WHITELISTED_ADMIN_EMAILS: string;
  VITE_SESSION_COOKIE_NAME: string;
  VITE_SESSION_SECRET_KEY: string;
}
