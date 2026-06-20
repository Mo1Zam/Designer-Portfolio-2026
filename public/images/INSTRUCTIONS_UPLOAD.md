# 🖼️ Brand Output & Static Artwork Uploads Folder

Welcome to your specialized output images folder. Any image you place inside this folder will be bundled as a static asset by the Vite build system and made available globally throughout the portfolio.

---

## 🎨 How to Upload Your Assets

1. **Locate this folder** in the sidebar's File Explorer (`/public/images/`).
2. **Drag and drop** your static assets (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`) directly into this directory, or upload them using the file explorer's upload button.
3. Rename your assets clearly, avoiding special characters or complex spaces (e.g., use `social_card_01.jpg` or `brand_mockup_v1.png`).

---

## 🔗 How to Reference Uploaded Artwork in App Code

All assets in this folder are mapped directly to the server root. To reference them anywhere in `/src/App.tsx` or your page components, simply reference the direct path starting from `/images/...`:

### Example in `App.tsx` Projects Array:

```typescript
 galleryImages: [
   "/images/social_card_01.jpg",
   "/images/brand_mockup_v1.png",
   "/images/another_creative_render.jpg"
 ]
```

---

*Enjoy crafting and showcasing your high-fidelity, high-contrast creative outputs!*
