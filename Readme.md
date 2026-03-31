# 🏗️ Octupus Freelance Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-15.0.8-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)](https://typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb)](https://mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.3-green?logo=mongodb)](https://mongoosejs.com/)
[![Stripe](https://img.shields.io/badge/Stripe-payments-purple?logo=stripe)](https://stripe.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth-4.24.7-blue?logo=next-auth)](https://next-auth.js.org/)

## 🚀 Overview

**Octupus** is a production-ready, full-stack **freelance services marketplace** built with **Next.js 15 App Router** (Server Components). 

**Buyers** browse services (design, dev, marketing, etc.), filter/search, add to cart, checkout via **Stripe**, manage orders/favorites.  
**Vendors** list services with tiers, handle orders/progress.  
**Admins** moderate users (ban/suspend/restore), services/orders/reviews/analytics.

**Key Differentiators**:
- Role-based dashboards with tables/managers (AdminUsersTable, OrdersManager, etc.).
- Full order lifecycle (statuses + progress timeline + cancellations).
- MongoDB full-text search, avg review ratings.
- Responsive custom CSS (no Tailwind).

**Live Demo**: [Coming Soon]

## ✨ Features

### Marketplace
- Services: List/filter (`?category=?q=?vendor=?featured`), detail w/ tiers/pricing/reviews (avg rating).
- Cart: Multi-item (`/cart`), add/remove.
- Checkout: Stripe session + webhook → Order creation.

### Dashboards (Protected, Role-based)
| Role | Paths | Key Components |
|------|-------|----------------|
| **Admin** | `/dashboard/admin/*` | `AdminUsersTable` (ban/suspend/restore/password), `AdminServicesTable`, Orders/Reviews/Analytics. |
| **Buyer** | `/dashboard/buyer/*` | `BuyerOrdersList`/`OrdersManager`, `FavoritesClient`, settings. |
| **Vendor** | `/dashboard/vendor/*` (inferred) | `AdminServicesManager`, received orders w/ `OrdersManager`. |

### Workflows
- **Auth**: NextAuth (credentials + social) + hCaptcha.
- **Orders**: pending → paid → in_progress → delivered → completed (or cancel/refund). Progress updates, role-aware UI.
- **Extras**: Favorites, Reviews (POST/list), Payments webhook.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 15 (App Router, Server Components/Actions) |
| **Language** | TypeScript 5.4 |
| **Database** | MongoDB + Mongoose 8.3 (models: User/Service/Order/Cart/Favorite/Review) |
| **Auth** | NextAuth.js 4.24.7 (JWT, roles) |
| **Payments** | Stripe 15.5 (Checkout + Webhooks) |
| **UI** | React 18, Custom CSS modules (responsive Navbar/ServiceCard/DashboardSidebar) |
| **Security** | bcryptjs, jsonwebtoken, cookie, jose, hCaptcha |
| **Other** | `@hcaptcha/react-hcaptcha`, dotenv |

## 📦 Quick Start

### Prerequisites
- **Node.js** ≥18
- **MongoDB**: Atlas (free) or local
- **Stripe**: Test account
- **Git**

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd freelance-marketplace  # or New-test-repo-
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
# Database
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/octupus?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Dev Auth Credentials (update in production)
AUTH_EMAIL=admin@example.com
AUTH_PASSWORD=admin123
AUTH_EMAIL_BUYER=buyer@example.com
AUTH_PASSWORD_BUYER=123456
AUTH_EMAIL_VENDOR=vendor@example.com
AUTH_PASSWORD_VENDOR=123456

# Stripe (test keys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional
RESEND_API_KEY=...  # Emails
CLOUDINARY_URL=...  # Images
```

### 3. Database
- Connect Atlas/local (lib/db.ts uses Mongoose).
- Indexes: Run via Mongo Compass/shell (full-text on Service.name/desc).
- Seed: `npm run seed` (if script exists) or register test users.

### 4. Development
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

**Test Accounts**:
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Buyer | buyer@example.com | 123456 |
| Vendor | vendor@example.com | 123456 |

## 🏗️ Project Structure

```
.
├── app/                    # App Router pages + API routes
│   ├── (marketplace)/      # Services listing/detail
│   ├── cart/page.tsx       # Cart UI
│   ├── checkout/page.tsx   # Post-Stripe
│   ├── dashboard/          # Role-based (admin/buyer/vendor)
│   │   ├── admin/users/services/orders/reviews/analytics/
│   │   └── buyer/orders/favorites/settings/
│   └── api/                # REST: services/cart/orders/payments/admin/users/[id]/{ban/...}
├── components/             # Reusable UI
│   ├── dashboard/{admin/buyer/shared}/  # Tables: AdminUsersTable, OrdersManager
│   ├── marketplace/        # ServiceCard, ServiceDetailClient
│   ├── cart/               # CheckoutButton, RemoveCartItemButton
│   └── layout/             # Navbar, CartButton
├── lib/                    # Utils: db.ts, auth.ts, stripe.ts, api-helpers.ts
├── models/                 # TS Schemas: User, Service (tiers), Order, etc.
├── styles/                 # globals.css + components/pages/dashboard/
├── package.json            # Deps + scripts (dev/build/seed/db:setup)
└── TODO.md                 # This plan tracker
```

## 🔄 User Flows

### Buyer Journey
```mermaid
flowchart TD
    A[Landing /services ?q=category=] --> B[ServiceDetail: tiers/reviews]
    B --> C[Add to Cart]
    C --> D[/cart → CheckoutButton]
    D --> E[Stripe /api/payments/checkout]
    E --> F[Webhook → Order: pending/paid]
    F --> G[Dashboard/buyer/orders: OrdersManager]
    G --> H[Reviews/Favorites]
```

### Vendor/Admin Flows
```mermaid
flowchart TD
    I[Login role=vendor/admin] --> J[Dashboard: services/users mgmt]
    K[New Order] --> L[Update progress/status]
    M[Admin: /users/[id]/ban/suspend/restore]
```

## 🏗️ Architecture Overview

**Full diagram and details integrated from `architecture-overview.md`:**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js 15    │◄──►│   API Routes     │◄──►│   MongoDB       │
│ App Router      │    │ (app/api/)       │    │ (Mongoose ODM)  │
│                 │    │ services/cart/   │    │ Models w/ TS    │
│ ┌─Pages/Dashboard│    │ orders/payments  │    │ indexes         │
│ └─layout.tsx    │    │ admin/users/[id] │    └─────────────────┘
└─────────────────┘    └──────────────────┘           ▲
         ▲                                       Stripe Webhook
┌─────────────────┐                              ┌──────────────┐
│ Components/UI   │                              │ External     │
│ Navbar/ServiceCard│                    ┌────────▼──────────────┤
│ DashboardSidebar │                    │ NextAuth + hCaptcha │
└─────────────────┘                    └────────────────────────┘
```

**Folder Tree & Decisions**: See original `architecture-overview.md` for Mermaid flows, endpoints table.

## 🔍 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/services` | GET | List `?q=?category=?vendor=?featured&page=&limit=` | Public |
| `/api/services/[id]` | GET/PUT/DELETE | Detail/CRUD | Owner/Admin |
| `/api/cart` | GET/POST/DELETE | Items (multi-service) | Buyer |
| `/api/cart/[id]` | DELETE | Remove item | Buyer |
| `/api/favorites` / `[id]` | GET/POST/DELETE | Personal list | Buyer |
| `/api/orders/my` | GET | `?status=&page=` | User |
| `/api/orders/[id]` | GET/PATCH | View/update progress | Owner/Admin |
| `/api/reviews` / `[id]` | GET/POST | List/create (avg rating) | Buyer |
| `/api/payments/checkout` | POST | Stripe session | Buyer |
| `/api/payments/webhook` | POST | Order creation/update | Stripe |
| `/api/admin/users/[id]/{ban/suspend/restore/password}` | POST | Moderation | Admin |

## 🚀 Deployment

### Vercel (1-click)
1. Push to GitHub.
2. Connect Vercel → Add env vars.
3. Auto-deploys! (Serverless functions for API).

### Custom (Docker/PM2)
```bash
npm run build
npm run start
```

**Production Notes**:
- MongoDB Atlas (IP whitelist Vercel).
- Stripe live keys + webhook endpoint.
- `NEXTAUTH_URL=https://yourdomain.com`

## 🔧 Troubleshooting
- **Mongo Conn**: Check `MONGODB_URI`, Atlas network.
- **Auth Fail**: Verify `NEXTAUTH_SECRET`, dev creds.
- **Stripe Webhook**: Use `stripe listen --forward-to localhost:3000/api/payments/webhook`.
- **Lint**: `npm run lint -- --fix`.

## 🤝 Contributing
1. Fork → Clone.
2. `npm i && npm run dev`.
3. Branch: `git checkout -b feat/xyz`.
4. PR to `main`.

**Issues**: Report bugs/features.

## 📄 License
MIT License.

## 🙌 Acknowledgments
- Next.js, MongoDB, Stripe teams.
- Built for freelance marketplaces.

---

⭐ **Star Repo** | 📊 **Issues** | 💬 **Discuss**

**Generated: Updated with full architecture overview (from `architecture-overview.md`). Ready for production!**

