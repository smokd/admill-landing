# 🛡️ Admill Systems - Landing Page

Modern, high-performance landing page for Admill Systems - Zimbabwe's premier electronic security and IT solutions provider.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38bdf8)](https://tailwindcss.com/)

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/smokd/admill-landing.git
cd admill-landing/admill-landing-page
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your SMTP credentials

# Run development
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📋 Features

- ✅ **SEO Optimized** - Structured data, meta tags, sitemap
- ✅ **Contact Form** - Server-side email with Nodemailer
- ✅ **Analytics** - Google Analytics + Matomo
- ✅ **Testimonials** - Client reviews with ratings
- ✅ **FAQ Section** - Accordion-style Q&A
- ✅ **Stats Counter** - Animated metrics display
- ✅ **Trust Badges** - Certifications and partnerships
- ✅ **Responsive** - Mobile-first design
- ✅ **Fast** - Optimized for Core Web Vitals

---

## 🏗️ Production Build

```bash
npm run build
npm start
```

---

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Email**: Nodemailer
- **Type Safety**: TypeScript

---

## 🚀 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for full guide.

**Quick deploy to production:**

```bash
# Server setup
npm ci
npm run build
pm2 start ecosystem.config.js
```

---

## 📧 Environment Variables

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@admill.co.zw
SMTP_PASS=your-password
```

---

## 📊 Project Structure

```
app/
├── api/contact/route.js    # Contact form API
├── layout.tsx              # Root layout + SEO
├── page.js                 # Landing page
└── globals.css             # Tailwind styles

public/                     # Static assets
ecosystem.config.js         # PM2 configuration
nginx.conf                  # Nginx reverse proxy
```

---

## 🔧 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
npm run lint     # Code linting
```

---

## 📝 License

Private - © 2025 Admill Systems

---

## 🔗 Links

- **Website**: https://admill.co.zw
- **Email**: info@admill.co.zw
- **Phone**: +263 715 017 744

---

**Version**: 1.0.0 | **Last Updated**: November 2025
