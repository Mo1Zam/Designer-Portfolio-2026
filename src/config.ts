/**
 * SECURITY WARNING: FRONTEND CLIENT CONFIGURATION
 * 
 * CRITICAL INFO FOR DEVELOPERS:
 * - This is client-side code executed directly in the user's browser.
 * - NEVER hardcode private API keys, backend credentials, database secrets, or production tokens here.
 * - Only public-facing client keys (e.g. public map tokens, public analytics IDs) are safe.
 * - Any sensitive communication (like database queries or SMS/Email dispatching APIs) must go through 
 *   a secure backend proxy server (e.g. Express, Firebase Functions) using server-side environment variables.
 */

export const CLIENT_SECURITY_CONFIG = {
  // Media endpoints structure (Cloudinary, Vimeo, etc.)
  mediaCDN: {
    cloudinaryCloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "darldfhin",
    baseUrl: "https://res.cloudinary.com",
    isSecure: true,
  },

  // Abstract placeholder configurations for hypothetical or future third-party APIs
  contactFormService: {
    // DO NOT put private service secret keys here.
    // If using services like EmailJS, Formspree, or webhooks, use public keys/IDs only.
    publicKey: import.meta.env.VITE_CONTACT_SERVICE_PUBLIC_KEY || "PUBLIC_KEY_PLACEHOLDER",
    serviceId: import.meta.env.VITE_CONTACT_SERVICE_ID || "SERVICE_ID_PLACEHOLDER",
    templateId: import.meta.env.VITE_CONTACT_TEMPLATE_ID || "TEMPLATE_ID_PLACEHOLDER",
    endpoint: import.meta.env.VITE_SECURE_API_ENDPOINT || "/api/contact",
  },

  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GA_MEASUREMENT_ID || "G-PLACEHOLDER",
  }
};

export default CLIENT_SECURITY_CONFIG;
