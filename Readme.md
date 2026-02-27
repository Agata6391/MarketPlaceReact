# Skillora — Freelance Services Marketplace

A production-ready, modular Next.js 14 marketplace template for freelance services.

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.local.example .env.local
```
Fill in each variable (see setup guide below).

### 3. Run development server
```bash
npm run dev
```
Open http://localhost:3000

---

## 🔧 Environment Setup

### MongoDB Atlas (free tier)
1. Go to https://cloud.mongodb.com → Create a free cluster
2. Create a database user (username + password)
3. Get connection string → paste into `MONGODB_URI`
4. The text index for search is auto-created on first use

### Google OAuth
1. Go to https://console.cloud.google.com
2. Create a project → OAuth 2.0 credentials
3. Add `http://localhost:3000/api/auth/callback/google` as redirect URI
4. Copy Client ID and Client Secret to `.env.local`

### Stripe
1. Go to https://dashboard.stripe.com → Developers → API Keys
2. Copy `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy `Secret key` → `STRIPE_SECRET_KEY`
4. For webhooks: `stripe listen --forward-to localhost:3000/api/payments/webhook`
5. Copy the webhook signing secret → `STRIPE_WEBHOOK_SECRET`

### Create your first Admin user
After registering normally, open MongoDB Atlas and manually change
the `role` field of your user document from `"buyer"` to `"admin"`.

---

## 📁 Project Structure

```
freelance-marketplace/
│
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Login / Register (no shared layout)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── (marketplace)/            # Public catalog
│   │   └── services/
│   │       ├── page.tsx          # Browse + filter + search
│   │       └── [id]/page.tsx     # Service detail + tiers + reviews
│   │
│   ├── dashboard/
│   │   ├── admin/page.tsx        # Admin overview + service CRUD
│   │   ├── vendor/page.tsx       # Vendor service manager
│   │   └── buyer/page.tsx        # Buyer order history
│   │
│   ├── api/                      # All API routes (backend)
│   │   ├── auth/[...nextauth]/   # NextAuth handler
│   │   ├── auth/register/        # User registration
│   │   ├── services/             # GET (search/filter), POST (create)
│   │   ├── services/[id]/        # GET, PUT, DELETE
│   │   ├── cart/                 # GET, POST (add), DELETE (clear)
│   │   ├── cart/[id]/            # DELETE (remove item)
│   │   ├── orders/my/            # Buyer order history
│   │   ├── reviews/              # GET (by service), POST (create)
│   │   └── payments/
│   │       ├── checkout/         # Create Stripe session
│   │       └── webhook/          # Stripe webhook → create orders
│   │
│   ├── layout.tsx                # Root layout (fonts, providers)
│   └── page.tsx                  # Landing page
│
├── components/
│   ├── ui/
│   │   └── Button.tsx            # Reusable button
│   ├── layout/
│   │   └── Navbar.tsx            # Autocomplete search + cart + auth
│   ├── providers/
│   │   └── SessionProvider.tsx   # NextAuth client wrapper
│   ├── marketplace/
│   │   ├── ServiceCard.tsx       # Grid card
│   │   └── ServiceDetailClient.tsx  # Tier selector + cart + reviews
│   └── dashboard/
│       ├── DashboardSidebar.tsx  # Shared sidebar (role-aware)
│       ├── admin/
│       │   └── AdminServicesTable.tsx
│       ├── vendor/
│       │   └── VendorServicesManager.tsx
│       └── buyer/
│           └── BuyerOrdersList.tsx
│
├── lib/
│   ├── db.ts                     # MongoDB singleton connection
│   ├── auth.ts                   # NextAuth config (Google + credentials)
│   ├── stripe.ts                 # Stripe singleton
│   └── api-helpers.ts            # Consistent API responses
│
├── models/
│   ├── User.ts                   # bcrypt hashing, roles
│   ├── Service.ts                # Tiers, text index, categories
│   ├── Order.ts                  # Order lifecycle
│   ├── Review.ts                 # Rating auto-calculation
│   └── Cart.ts                   # Persisted cart
│
├── middleware.ts                 # Route protection by role
│
└── styles/
    ├── globals.css               # Design system + CSS variables
    ├── components/
    │   ├── navbar.css
    │   ├── button.css
    │   └── service-card.css
    └── pages/
        ├── landing.css
        ├── auth.css
        ├── dashboard.css
        ├── service-detail.css
        └── services-list.css
```

---

## 🔐 Auth & Role System

| Role    | Can do |
|---------|--------|
| buyer   | Browse, purchase services, write reviews on completed orders |
| vendor  | Everything buyer does + create/manage own services |
| admin   | Everything + manage ALL services, users, feature services |

Role is stored in JWT token (no extra DB call per request).

---

## 💳 Payment Flow

```
User clicks "Checkout" →
POST /api/payments/checkout (creates Stripe session) →
Redirect to Stripe hosted page →
Stripe calls POST /api/payments/webhook →
Webhook creates Order documents + clears cart →
User redirected to /dashboard/buyer/purchases
```

---

## 🔍 Autocomplete Search

The Navbar uses MongoDB text search with a debounced input (300ms).
The `Service` model has a compound text index on `title`, `description`, and `tags`.

```
User types → debounce 300ms → GET /api/services?q=keyword&limit=5
→ Dropdown shows results → Click → navigate to service
```

---

## 📈 Scaling Guide (how to add new verticals/businesses)

### Add a new category
1. Add to `CATEGORIES` in `app/page.tsx` and `app/(marketplace)/services/page.tsx`
2. Add emoji to `CATEGORY_ICONS` in `ServiceCard.tsx`
3. Add to the `enum` in `models/Service.ts`

### Add a new dashboard section
1. Create page at `app/dashboard/[role]/[section]/page.tsx`
2. Add link to the `NAV` array in the relevant dashboard page
3. Create API route at `app/api/[section]/route.ts`

### Add a new model (e.g. Courses, Products)
1. Create `models/Course.ts` following the `Service.ts` pattern
2. Create `app/api/courses/route.ts`
3. Reuse `ServiceCard` or create `CourseCard` in components

### Multi-tenant (multiple businesses from this template)
1. Add `businessId` field to Service, Order, User models
2. Filter all queries by `businessId`
3. Each tenant gets their own admin dashboard

### Add Cloudinary image upload
```bash
npm install cloudinary next-cloudinary
```
Add `CLOUDINARY_URL` to `.env.local` and use `<CldUploadWidget>` in service forms.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Auth | NextAuth.js (Google OAuth + credentials) |
| Password | bcryptjs (12 rounds) |
| Database | MongoDB + Mongoose |
| Payments | Stripe (Checkout Sessions + Webhooks) |
| Styling | Pure CSS with CSS variables (no Tailwind) |
| Language | TypeScript |
