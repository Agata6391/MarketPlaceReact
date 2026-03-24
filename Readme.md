# Freelance Services Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)](https://typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb)](https://mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-payments-purple?logo=stripe)](https://stripe.com/)

## 🚀 Overview

**Skillora** is a full-stack freelance marketplace platform built with Next.js 14 App Router. Buyers can browse services across categories (design, development, marketing, etc.), add to cart, checkout with Stripe, and manage purchases. Vendors can sell skills, admins manage users/services/orders.

**Live Demo**: [TBD]

## ✨ Features

**Marketplace Particularities:**
- **Services**: Browse/filter by category (enum: design/development/marketing/etc.), vendor (?vendor=ID), text search (?q=), featured/pagination. Detail view with tiers/pricing/reviews (avg rating via models/Review).
- **Dashboards (Role-based)**: 
  - Admin (`/dashboard/admin/*`): Users mgmt (ban/suspend/restore/password), services/orders/reviews/analytics tables.
  - Buyer (`/dashboard/buyer/*`): Orders (`BuyerOrdersList`), favorites (`FavoritesClient`), settings.
  - Vendor: Services (`AdminServicesManager` adapted), received orders (`OrdersManager`).
- **Order Workflow**: Statuses (pending/paid/in_progress/delivered/completed/cancelled/refunded), progress timeline, cancellation requests. Role-aware `OrdersManager.tsx`.
- **Cart/Checkout**: Multi-item cart, Stripe integration (checkout/webhook).
- **Full Models**: User (roles: admin/buyer/vendor), Service (tiers/categories/vendor/indexed), Order (progressUpdates/cancellationReason), Cart/Favorite/Review.

**Core:**
- Marketplace: Browse/filter/search, detail/tiers/reviews
- Cart: Add/remove, `/cart`
- Checkout: Stripe + webhook → order
- Auth: NextAuth credentials/social
- Admin: User/service mgmt
- Responsive CSS

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 14 (App Router, Server Components) |
| **Language** | TypeScript 5.4 |
| **Database** | MongoDB + Mongoose |
| **Auth** | NextAuth.js 4 |
| **Payments** | Stripe (Checkout + Webhooks) |
| **UI** | React 18, Custom CSS (no Tailwind) |
| **Other** | bcryptjs, jsonwebtoken, cookie, jose |

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas (free tier) or local MongoDB
- Stripe account (test mode)

### 1. Clone & Install
```bash
git clone <repo-url>
cd freelance-marketplace
npm install
```

### 2. Environment Variables
Copy `.env.local.example` to `.env.local` and fill:

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillora

# NextAuth (production)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key (openssl rand -base64 32)

# Auth credentials (dev only)
AUTH_EMAIL=admin@example.com
AUTH_PASSWORD=admin123
AUTH_EMAIL_BUYER=buyer@example.com
AUTH_PASSWORD_BUYER=123456
AUTH_EMAIL_VENDOR=vendor@example.com
AUTH_PASSWORD_VENDOR=123456

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional
RESEND_API_KEY= (for email)
CLOUDINARY_URL= (for images)
```

### 3. Database Setup
Connect MongoDB Atlas/local (models/ TS + lib/db.ts). Run migrations/indexes if needed (manual via Mongo shell/Compass).
**Sample Data**: Register test accounts or insert via API/UI.


### 4. Run Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Test Accounts
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Buyer | buyer@example.com | 123456 |
| Vendor | vendor@example.com | 123456 |

## 🏗️ Project Structure

**Key Marketplace Files:**
```
app/(marketplace)/          # Services listing (inferred group)
├── components/marketplace/
│   ├── ServiceCard.tsx
│   └── ServiceDetailClient.tsx
app/cart/page.tsx           # Multi-item cart UI
├── components/cart/
│   ├── CheckoutButton.tsx
│   └── RemoveCartItemButton.tsx
app/dashboard/              # Role-based dashboards
├── admin/users/page.tsx    # User moderation
├── buyer/orders/page.tsx   # BuyerOrdersList
└── components/shared/OrdersManager.tsx  # Workflow UI
models/Service.ts           # Tiers/categories/indexed
app/api/services/route.ts   # Search/filter API (?q= ?vendor=)
```
**Full structure**: See repo root listing.


## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add env vars in Vercel dashboard
4. Deploy!

**Note**: MongoDB Atlas + Stripe webhooks required for production.

### Custom Server
```bash
npm run build
npm run start
```

## 🔍 API Endpoints (Updated)

| Endpoint | Method | Description | Auth | 
|----------|--------|-------------|------| 
| `/api/services` | GET | List ?q= ?category ?vendor=ID ?featured page/limit | Public | 
| `/api/services/[id]` | GET/PUT/DEL | Detail/CRUD | Owner/Admin | 
| `/api/cart` | GET/POST/DELETE | View/add/remove | Buyer | 
| `/api/orders/my` | GET | Personal ?status page/limit | User | 
| `/api/orders/[id]` | PATCH | Update status/progress | Owner/Admin | 
| `/api/favorites` | POST/GET/DELETE | Manage favorites | Buyer | 
| `/api/reviews` | POST/GET | Create/list (avg rating) | Buyer | 
| `/api/payments/checkout` | POST | Stripe session | Buyer | 
| `/api/admin/users/[id]/ban` | POST | +suspend/restore/password | Admin | 


## 🤝 Contributing

1. Fork & clone
2. `npm install`
3. Create feature branch `git checkout -b feature/amazing`
4. Commit & PR

## 📄 License

MIT - See [LICENSE](LICENSE) (add if needed)

## 🙌 Acknowledgments

Built with ❤️ using Next.js, MongoDB, Stripe.

---

⭐ **Star on GitHub** · 👨‍💻 **Issues** · 💬 **Discussions**
