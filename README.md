Great — I’ll update the README to include **Google’s Anti-Gravity IDE**, **PostHog**, **MongoDB**, and **Vercel**, and refine everything so it looks premium, complete, and portfolio-ready.

Here is your **updated full README.md template**:

---

# 🌐 DevEvents — Developer Event Platform

A modern, production-ready event discovery platform built with **Next.js 16**, enhanced with real-world tooling such as **MongoDB**, **PostHog analytics**, **Google Anti-Gravity IDE**, and deployed on **Vercel**.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/PostHog-Analytics-orange?style=for-the-badge&logo=posthog" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/AntiGravity-IDE-blueviolet?style=for-the-badge&logo=googlecloud" />
</p>

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Integrations](#-integrations)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [Screenshots](#-screenshots)
* [Deployment](#-deployment)
* [References](#-references)
* [Contributing](#-contributing)
* [License](#-license)
* [Author](#-author)

---

## 📖 About the Project

**DevEvents** helps developers discover the latest **hackathons**, **bootcamps**, **meetups**, and **tech conferences** around the world.
The project is built as a guided implementation of the **Next.js 16 Full Course** by JavaScript Mastery, but upgraded with production-level features and integrations.

🔗 **Tutorial Used:** [https://www.youtube.com/watch?v=I1V9YWqRIeI](https://www.youtube.com/watch?v=I1V9YWqRIeI)
🔗 **GitHub Repo:** [https://github.com/kishorekrrish3/DevEvents](https://github.com/kishorekrrish3/DevEvents)
🔗 **Live Deployment:** [Check it out here!](https://marshmello-dev-events.vercel.app)

This project showcases **modern Next.js 16 capabilities**, full-stack functionality, real-time analytics, and a clean, highly scalable architecture.

---

## ✨ Features

### 🖥️ Frontend

* Responsive UI with modern layouts
* Server + Client Component architecture
* Optimized routing using the App Router
* SSR / SSG / ISR depending on route needs

### 🎯 Core Functionality

* Browse all events
* Create and submit events
* View detailed event pages
* Tag-based categorization
* Real-time updated events (if DB sync enabled)

### 🧠 Developer Experience

* AntiGravity IDE for cloud-based code execution
* Beautiful project structure
* TypeScript everywhere
* Faster builds & previews

### 📊 Tracking & Analytics

* PostHog analytics integrated
* Event tracking, page views, session heatmaps
* Funnels / conversion analytics

### 🗄️ Database

* MongoDB Atlas (Hosted DB)
* Mongoose or direct driver (based on repo)

---

## 🧱 Tech Stack

| Category        | Technologies                |
| --------------- | --------------------------- |
| Framework       | **Next.js 16**              |
| Language        | **TypeScript**              |
| Database        | **MongoDB (Atlas)**         |
| Styling         | CSS / Tailwind / ShadCN     |
| IDE             | **Google Anti-Gravity IDE** |
| Analytics       | **PostHog**                 |
| Deployment      | **Vercel**                  |
| Version Control | Git + GitHub                |

---

## 🔌 Integrations

### 🧩 MongoDB

Used for storing event data, persistent storage, and scalable access.
Supports: CRUD, indexing, schema validation.

### 📊 PostHog Analytics

Provides:

* User behavior tracking
* Event funnels
* Session replays
* Heatmaps
* Custom event tracking for event interactions

### ☁️ Google Anti-Gravity IDE

Used for cloud-based coding and debugging with:

* Instant preview builds
* No local environment needed
* Seamless GitHub integration

### 🚀 Vercel Deployment

* Uses Vercel's Next.js-optimized CDN
* Auto builds on push
* Edge functions support
* Zero-config deployment

---

## 📁 Project Structure

```
events-hub/
│
├── app/
│   ├── api/
│   │   └── events/
│   │       └── [slug]/
│   │           └── route.ts            # API route for fetching event by slug
│   │       └── route.ts                # API route for events collection
│   │
│   ├── events/
│   │   └── [slug]/
│   │       └── page.tsx                # Dynamic event details page
│   │   └── page.tsx                    # Events listing page
│   │   └── favicon.ico
│   │
│   ├── layout.tsx                      # Root layout
│   └── globals.css                     # Global styles
│
├── components/
│   ├── BookEvent.tsx
│   ├── EventCard.tsx
│   ├── EventDetails.tsx
│   ├── ExploreBtn.tsx
│   ├── LightRays.tsx
│   ├── Navbar.tsx
│   └── PostHogErrorSuppressor.tsx
│
├── database/
│   ├── booking.model.ts                # Mongoose booking schema
│   ├── event.model.ts                  # Mongoose event schema
│   └── index.ts                        # DB registration / model export handler
│
├── lib/
│   ├── actions/
│   │   ├── booking.actions.ts          # Booking-related server actions
│   │   ├── event.actions.ts            # Event-related server actions
│   ├── constants.ts                    # Global constants
│   ├── mongodb.ts                      # MongoDB connection logic
│
├── public/
│   └── (assets)                        # Public static assets (images/icons)
│
├── .env                                # Environment variables
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/kishorekrrish3/DevEvents.git
cd DevEvents
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

### 4️⃣ Visit the App

```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env` file:

```
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=your_zone_posthog_url
NEXT_PUBLIC_BASE_URL=deployment_url
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_URL=your_cloudinary_url

---

## 🖼️ Screenshots

(./public/screenshot-1.png)
(./public/screenshot-2.png)
(./public/screenshot-3.png)

---

## 🚀 Deployment

Deployed using **Vercel**:

1. Push to GitHub
2. Go to Vercel → Import Project
3. Add environment variables
4. Deploy 🎉

Next.js 16 is automatically optimized by Vercel.

---

## 📚 References

* JavaScript Mastery — Next.js 16 Full Course
* MongoDB Atlas Docs
* PostHog Docs
* Vercel Deployment Guide
* Anti-Gravity IDE (Google Labs)

---

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit changes
4. Push + Open Pull Request

---

## 📄 License

This project is **open source**.
(Add MIT or another license if required.)

---

## 👤 Author

**Kishore P**

---

Just tell me!
