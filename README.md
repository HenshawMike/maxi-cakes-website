# MAXI CAKES 'N' PASTERIES 🍰

**One-Page Minimalist Cake Website**

---

## 📌 Project Overview

**MAXI CAKES 'N' PASTERIES** is a modern, single-page bakery website designed to showcase cake products and allow customers to easily place orders through WhatsApp.

The website focuses on a clean, elegant user experience with horizontal scrolling cake cards, smooth animations, and a warm, premium visual style.

---

## 🎯 Objectives

* Present cake products in a visually appealing way
* Provide a simple ordering flow via WhatsApp
* Maintain a minimalist, fast, and responsive design
* Create a warm and trustworthy brand presence

---

## 🧱 Features

### ✅ Single-Page Layout

All content is accessible through smooth scrolling sections:

* Hero
* Cake Showcase
* About the Baker
* How to Order
* Contact / CTA
* Footer

### 🎠 Horizontal Cake Carousel

* Auto-scrolling cake cards
* Hover to pause animation
* Mobile swipe support
* Each card includes image, name, description, and order button

### 💬 WhatsApp Ordering

Primary conversion action:

* “Order on WhatsApp” buttons across the site
* Prefilled message opens directly in WhatsApp

### 📱 Fully Responsive

* Mobile-first design
* Optimized spacing and typography
* Smooth performance on all screen sizes

---

## 🎨 Design System

### Color Palette

| Purpose              | Color   |
| -------------------- | ------- |
| Primary Background   | #2c3424 |
| Light Background     | #DADED8 |
| Neutral              | #959581 |
| Accent               | #768064 |
| Buttons / Highlights | #4c583e |

### Style Direction

* Minimalist UI
* Soft shadows and subtle glass effects
* Generous whitespace
* Warm bakery tone

---

## 🧭 User Flow

1. User opens the website
2. Browses cakes in the horizontal showcase
3. Clicks **Order on WhatsApp**
4. Chat opens with prefilled message
5. Customer confirms order with baker

---

## 🛠️ Tech Stack (Suggested)

* **Frontend:** HTML, CSS, JavaScript (or React + Tailwind)
* **Animations:** CSS / Framer Motion (optional)
* **Hosting:** Vercel / Netlify

---

## 📂 Project Structure (Example)

```
├── 📁 public
│   ├── 📄 favicon.ico
│   ├── 🖼️ placeholder.svg
│   └── 📄 robots.txt
├── 📁 src
│   ├── 📁 assets
│   │   ├── 🖼️ baker-portrait.jpg
│   │   ├── 🖼️ cake-1.jpg
│   │   ├── 🖼️ cake-2.jpg
│   │   ├── 🖼️ cake-3.jpg
│   │   ├── 🖼️ cake-4.jpg
│   │   ├── 🖼️ cake-5.jpg
│   │   ├── 🖼️ cake-6.jpg
│   │   ├── 🖼️ cake-7.jpg
│   │   ├── 🖼️ cake-8.jpg
│   │   └── 🖼️ hero-bg.jpg
│   ├── 📁 components
│   │   ├── 📁 ui
│   │   │   ├── 📄 accordion.tsx
│   │   │   ├── 📄 alert-dialog.tsx
│   │   │   ├── 📄 alert.tsx
│   │   │   ├── 📄 aspect-ratio.tsx
│   │   │   ├── 📄 avatar.tsx
│   │   │   ├── 📄 badge.tsx
│   │   │   ├── 📄 breadcrumb.tsx
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 calendar.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   ├── 📄 carousel.tsx
│   │   │   ├── 📄 chart.tsx
│   │   │   ├── 📄 checkbox.tsx
│   │   │   ├── 📄 collapsible.tsx
│   │   │   ├── 📄 command.tsx
│   │   │   ├── 📄 context-menu.tsx
│   │   │   ├── 📄 dialog.tsx
│   │   │   ├── 📄 drawer.tsx
│   │   │   ├── 📄 dropdown-menu.tsx
│   │   │   ├── 📄 form.tsx
│   │   │   ├── 📄 hover-card.tsx
│   │   │   ├── 📄 input-otp.tsx
│   │   │   ├── 📄 input.tsx
│   │   │   ├── 📄 label.tsx
│   │   │   ├── 📄 menubar.tsx
│   │   │   ├── 📄 navigation-menu.tsx
│   │   │   ├── 📄 pagination.tsx
│   │   │   ├── 📄 popover.tsx
│   │   │   ├── 📄 progress.tsx
│   │   │   ├── 📄 radio-group.tsx
│   │   │   ├── 📄 resizable.tsx
│   │   │   ├── 📄 scroll-area.tsx
│   │   │   ├── 📄 select.tsx
│   │   │   ├── 📄 separator.tsx
│   │   │   ├── 📄 sheet.tsx
│   │   │   ├── 📄 sidebar.tsx
│   │   │   ├── 📄 skeleton.tsx
│   │   │   ├── 📄 slider.tsx
│   │   │   ├── 📄 sonner.tsx
│   │   │   ├── 📄 switch.tsx
│   │   │   ├── 📄 table.tsx
│   │   │   ├── 📄 tabs.tsx
│   │   │   ├── 📄 textarea.tsx
│   │   │   ├── 📄 toast.tsx
│   │   │   ├── 📄 toaster.tsx
│   │   │   ├── 📄 toggle-group.tsx
│   │   │   ├── 📄 toggle.tsx
│   │   │   ├── 📄 tooltip.tsx
│   │   │   └── 📄 use-toast.ts
│   │   ├── 📄 AboutBaker.tsx
│   │   ├── 📄 CakeShowcase.tsx
│   │   ├── 📄 ContactCTA.tsx
│   │   ├── 📄 Footer.tsx
│   │   ├── 📄 HeroSection.tsx
│   │   ├── 📄 HowToOrder.tsx
│   │   ├── 📄 NavLink.tsx
│   │   └── 📄 StickyHeader.tsx
│   ├── 📁 hooks
│   │   ├── 📄 use-mobile.tsx
│   │   └── 📄 use-toast.ts
│   ├── 📁 lib
│   │   └── 📄 utils.ts
│   ├── 📁 pages
│   │   ├── 📄 Index.tsx
│   │   └── 📄 NotFound.tsx
│   ├── 📁 test
│   │   ├── 📄 example.test.ts
│   │   └── 📄 setup.ts
│   ├── 🎨 App.css
│   ├── 📄 App.tsx
│   ├── 🎨 index.css
│   ├── 📄 main.tsx
│   └── 📄 vite-env.d.ts
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 bun.lockb
├── ⚙️ components.json
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.js
├── 📄 tailwind.config.ts
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
├── ⚙️ tsconfig.node.json
├── 📄 vite.config.ts
└── 📄 vitest.config.ts
```
```

---

## ✨ Future Improvements

* Admin dashboard for adding cakes
* Online payment integration
* Instagram gallery feed
* Customer testimonials section

---

## 📞 Contact & Ordering

Customers place orders directly via WhatsApp from the website.

Prefilled message example:

> Hello, I’d like to order a cake from MAXI CAKES 'N' PASTERIES.

---

## 🧁 Brand Tone

Friendly • Warm • Elegant • Personal • Premium

---

## 📄 License

This project is created for the **MAXI CAKES 'N' PASTERIES** business.
Usage and modification rights belong to the client.

---

**Built to make every celebration sweeter 🎉**
