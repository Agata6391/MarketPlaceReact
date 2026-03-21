# Skillora - Freelance Services Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)](https://typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb)](https://mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-payments-purple?logo=stripe)](https://stripe.com/)

## 🚀 Overview

**Skillora** is a full-stack freelance marketplace platform built with Next.js 14 App Router. Buyers can browse services across categories (design, development, marketing, etc.), add to cart, checkout with Stripe, and manage purchases. Vendors can sell skills, admins manage users/services/orders.

**Live Demo**: [TBD]

## ✨ Features

**New/Enhanced:**
- **Vendor Dashboard** (`/dashboard/vendor/*`): Overview, Services management, Orders received (`OrdersManager role="vendor"`), Purchases (`asBuyer=true`)
- **Buyer Dashboard** (`/dashboard/buyer/*`): Overview, Purchases (`OrdersManager role="buyer"`)
- **Admin Dashboard** (`/dashboard/admin/*`): Overview, Orders, Users (ban/suspend/restore/password)
- **OrdersManager Component**: Role-aware table/modal with status workflow (pending/paid/in_progress/delivered/completed/cancelled/refunded), progress updates timeline, buyer cancellation requests, filters/search/pagination
- **API/services**: GET with ?vendor=ID filter, text search (?q=), pagination, featured
- **Full Models**: User (roles), Service (tiers, categories enum, vendor, text index), Order (progressUpdates[], cancellationReason), Cart (multi-item), Review (avg rating)

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
```bash
npm run db:setup  # Creates indexes/collections
npm run seed      # Seed sample data
```

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

**New:**
- app/dashboard/vendor/orders/page.tsx - Vendor received orders
- app/dashboard/vendor/purchases/page.tsx - Vendor purchases (as buyer)
- app/dashboard/vendor/services/ - Vendor services (inferred)
- components/dashboard/shared/OrdersManager.tsx - Advanced order UI
- app/api/orders/[id] - Order PATCH (status/progress)
- components/cart/CheckoutButton.tsx + RemoveCartItemButton.tsx

```
├── app/
│   ├── dashboard/vendor/orders/page.tsx (NEW)
│   ├── dashboard/vendor/purchases/page.tsx (NEW)
│   ├── dashboard/admin/users/page.tsx
│   ├── components/dashboard/shared/OrdersManager.tsx (NEW)
│   └── api/orders/my/route.ts
├── models/Order.ts (enhanced: progressUpdates, statuses)
└── ... (full recursive structure in env details)
```

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

| Endpoint | Method | Description | Auth | New |
|----------|--------|-------------|------|-----|
| `/api/services` | GET | ?q=text ?category ?featured ?vendor=ID page/limit | - | ✓ |
| `/api/services` | POST | Create service | vendor/admin | |
| `/api/orders` | GET | List (role-filtered) ?status ?search limit=100 | admin/vendor | ✓ |
| `/api/orders/my` | GET | Personal orders ?as=buyer | user | |
| `/api/orders/[id]` | GET/PATCH | Detail, update status/progress/cancel | parties/admin | ✓ |
| `/api/cart` | GET/POST/DEL | Add/view/clear | user | |
| `/api/payments/checkout` | POST | Stripe session | user | |
| `/api/admin/users/[id]/ban` | POST | Ban | admin | |


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
