#  The Legend It 

> Professional Software Solution by The Legend It  
> Building Scalable Digital Systems for the Future

---

## About

**The Legend It** is a modern, scalable, and high-performance software solution developed by **The Legend It**.  
This system is designed to deliver secure, efficient, and user-friendly digital experiences.

It focuses on:
- Performance optimization
- Clean architecture
- Security-first development
- Scalable deployment structure

---

## Key Features

- Secure Authentication System
- Optimized Performance
- Advanced Dashboard
- Fully Responsive Design
- Production Ready Deployment
- Clean & Scalable Code Structure

---

## Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB
- Tailwind CSS
- REST API
- JWT Authentication

---

## Installation

```bash
git clone https://github.com/The Legend It/project-name.git
cd project-name
npm install
npm run dev


## Hostinger Static Deploy (with Contact Form)

Use this flow when deploying as a static site (no VPS / no Node runtime on Hostinger).

1. Create a Formspree form and copy your endpoint, for example: `https://formspree.io/f/your_form_id`.
2. Set frontend production env in `.env.production`:

```env
VITE_API_BASE_URL=
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your_form_id
```

3. Build locally:

```bash
npm run build
```

4. Upload the full `dist/` contents to Hostinger public web root.
5. Ensure `.htaccess` is uploaded too (SPA routing for `/contact`, `/about`, etc.).
6. Test contact form on production domain.

## Optional: Separate Backend API Deploy

If you deploy `server.js` on Render/Railway/VPS, set backend env vars from `server.env.production.example` there.

Then set:

```env
VITE_API_BASE_URL=https://your-api-domain
VITE_CONTACT_FORM_ENDPOINT=
# thelegendit
