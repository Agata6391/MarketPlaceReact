/**
 * SEED SCRIPT — Octupus Marketplace
 * Uso: npm run seed
 */

const path = require("path");
const fs   = require("fs");

// Buscar .env.local en varias ubicaciones
const candidates = [
  path.resolve(process.cwd(), ".env.local"),
  path.resolve(process.cwd(), "../.env.local"),
  path.resolve(__dirname, "../.env.local"),
  path.resolve(__dirname, "../../.env.local"),
];

let loaded = false;
for (const p of candidates) {
  if (fs.existsSync(p)) {
    require("dotenv").config({ path: p });
    console.log("✅ .env.local cargado desde:", p);
    loaded = true;
    break;
  }
}

if (!loaded) {
  console.error("\n❌ No se encontró .env.local");
  console.error("   Rutas buscadas:");
  candidates.forEach(p => console.error("     ->", p));
  console.error("\n💡 Crea .env.local en la carpeta raíz (donde está package.json)\n");
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("\n❌ MONGODB_URI no está definido en .env.local");
  console.error("   Agrega: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/freelance-marketplace\n");
  process.exit(1);
}

// Validar que tiene nombre de base de datos
const uriParts = MONGODB_URI.split("/");
const dbName = uriParts[uriParts.length - 1].split("?")[0];
if (!dbName || dbName.trim() === "") {
  console.error("\n❌ La URI no incluye nombre de base de datos");
  console.error("   Actual:   ", MONGODB_URI);
  console.error("   Correcto:  mongodb+srv://user:pass@cluster.mongodb.net/freelance-marketplace\n");
  process.exit(1);
}

const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

// ── SCHEMAS ──────────────────────────────────────────────

const TierSchema = new mongoose.Schema({
  name: String, description: String,
  price: Number, deliveryDays: Number, features: [String],
});

const UserSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, select: false },
  avatar:   String,
  role:     { type: String, enum: ["admin","vendor","buyer"], default: "buyer" },
  provider: { type: String, enum: ["credentials","google"], default: "credentials" },
  stripeCustomerId: String,
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  slug:   { type: String, required: true, unique: true },
  description: String, shortDescription: String, category: String,
  tags: [String], tiers: [TierSchema],
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  images: [String], thumbnail: String,
  rating:      { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  orderCount:  { type: Number, default: 0 },
  isActive:    { type: Boolean, default: true },
  isFeatured:  { type: Boolean, default: false },
}, { timestamps: true });
ServiceSchema.index({ title: "text", description: "text", tags: "text" });
ServiceSchema.index({ category: 1, isActive: 1 });
ServiceSchema.index({ vendor: 1 });

const OrderSchema = new mongoose.Schema({
  buyer:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vendor:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  tierName: String, tierPrice: Number, deliveryDays: Number,
  status: { type: String, enum: ["pending","paid","in_progress","delivered","completed","cancelled","refunded"], default: "pending" },
  stripePaymentIntentId: String, stripeSessionId: String,
  notes: String, deliveredAt: Date, completedAt: Date,
}, { timestamps: true });
OrderSchema.index({ buyer: 1 }); OrderSchema.index({ vendor: 1 }); OrderSchema.index({ status: 1 });

const ReviewSchema = new mongoose.Schema({
  service:  { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  order:    { type: mongoose.Schema.Types.ObjectId, ref: "Order", unique: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vendor:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 }, comment: String,
}, { timestamps: true });
ReviewSchema.index({ service: 1 });

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  items: [{
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    tierName: String, tierPrice: Number, deliveryDays: Number,
  }],
}, { timestamps: true });

const User    = mongoose.model("User",    UserSchema);
const Service = mongoose.model("Service", ServiceSchema);
const Order   = mongoose.model("Order",   OrderSchema);
const Review  = mongoose.model("Review",  ReviewSchema);
const Cart    = mongoose.model("Cart",    CartSchema);

// ── DATOS ────────────────────────────────────────────────

const ADMIN   = { name: "Admin",          email: "admin@octupus.com", password: "Admin1234!",  role: "admin",  provider: "credentials" };
const VENDORS = [
  { name: "Maria Garcia",  email: "maria@example.com",  password: "Vendor1234!", role: "vendor", provider: "credentials" },
  { name: "Carlos Lopez",  email: "carlos@example.com", password: "Vendor1234!", role: "vendor", provider: "credentials" },
  { name: "Ana Martinez",  email: "ana@example.com",    password: "Vendor1234!", role: "vendor", provider: "credentials" },
];
const BUYER   = { name: "Juan Comprador", email: "juan@example.com",   password: "Buyer1234!",  role: "buyer",  provider: "credentials" };

function buildServices(ids) {
  return [
    { title: "Diseno de Logo Profesional",       slug: "diseno-logo-profesional",         category: "design",       vendor: ids[0], isFeatured: true,
      description: "Creo logos unicos para tu marca con entrega en todos los formatos SVG PNG PDF.",
      shortDescription: "Logo profesional con revisiones ilimitadas.",
      tags: ["logo","branding","identidad visual"],
      tiers: [
        { name:"Basic",    price:4900,  deliveryDays:3,  description:"1 concepto",  features:["1 concepto","2 revisiones","PNG+JPG"] },
        { name:"Standard", price:9900,  deliveryDays:5,  description:"3 conceptos", features:["3 conceptos","Revisiones ilimitadas","Todos los formatos"] },
        { name:"Premium",  price:19900, deliveryDays:10, description:"Pack completo", features:["5 conceptos","Manual de marca","Papeleria"] },
      ],
    },
    { title: "UI/UX para Apps Moviles",          slug: "diseno-ui-ux-apps-moviles",        category: "design",       vendor: ids[0], isFeatured: false,
      description: "Diseno interfaces moviles en Figma. Wireframes prototipos y handoff.",
      shortDescription: "UX/UI completo para iOS y Android en Figma.",
      tags: ["ui","ux","figma","mobile"],
      tiers: [
        { name:"Basic",    price:14900, deliveryDays:5,  description:"5 pantallas",  features:["5 pantallas","1 revision"] },
        { name:"Standard", price:29900, deliveryDays:10, description:"15 pantallas", features:["15 pantallas","Prototipo"] },
        { name:"Premium",  price:59900, deliveryDays:20, description:"App completa", features:["Pantallas ilimitadas","Design system"] },
      ],
    },
    { title: "Thumbnails para YouTube",          slug: "thumbnails-youtube-profesionales", category: "design",       vendor: ids[0], isFeatured: false,
      description: "Thumbnails llamativos que aumentan el CTR. Entrega rapida.",
      shortDescription: "Thumbnails con alto CTR. Entrega en 24h.",
      tags: ["youtube","thumbnail","social media"],
      tiers: [
        { name:"Basic",    price:1500, deliveryDays:1, description:"1 thumbnail",   features:["1 thumbnail","1 revision"] },
        { name:"Standard", price:5500, deliveryDays:2, description:"5 thumbnails",  features:["5 thumbnails","PNG+PSD"] },
        { name:"Premium",  price:9900, deliveryDays:3, description:"10 + plantilla", features:["10 thumbnails","Plantilla PSD"] },
      ],
    },
    { title: "Landing Page en Next.js",          slug: "landing-page-nextjs",              category: "development",  vendor: ids[1], isFeatured: true,
      description: "Landing pages rapidas y SEO optimizadas en Next.js con despliegue en Vercel.",
      shortDescription: "Landing moderna en Next.js con SEO y despliegue incluido.",
      tags: ["nextjs","react","landing page","seo"],
      tiers: [
        { name:"Basic",    price:19900, deliveryDays:5,  description:"1 seccion",   features:["1 pagina","Formulario","Vercel"] },
        { name:"Standard", price:39900, deliveryDays:10, description:"6 secciones", features:["6 secciones","SEO","Analytics"] },
        { name:"Premium",  price:79900, deliveryDays:20, description:"Con CMS",     features:["Diseno custom","Panel CMS","SEO avanzado"] },
      ],
    },
    { title: "API REST con Node.js y MongoDB",   slug: "api-rest-nodejs-mongodb",          category: "development",  vendor: ids[1], isFeatured: false,
      description: "APIs REST escalables con Node.js Express MongoDB. JWT Swagger y tests.",
      shortDescription: "API REST con JWT, Swagger y tests lista para produccion.",
      tags: ["nodejs","express","mongodb","api","jwt"],
      tiers: [
        { name:"Basic",    price:29900, deliveryDays:7,  description:"5 endpoints",  features:["5 endpoints","Auth JWT"] },
        { name:"Standard", price:59900, deliveryDays:14, description:"15 endpoints", features:["15 endpoints","Swagger","Tests"] },
        { name:"Premium",  price:99900, deliveryDays:21, description:"Completa",     features:["Ilimitados","Rate limiting","CI/CD"] },
      ],
    },
    { title: "Integracion de Stripe",            slug: "integracion-stripe-aplicacion",    category: "development",  vendor: ids[1], isFeatured: false,
      description: "Integro Stripe en tu app. Pagos unicos suscripciones webhooks y reembolsos.",
      shortDescription: "Stripe completo: pagos, suscripciones y webhooks.",
      tags: ["stripe","payments","nodejs","react"],
      tiers: [
        { name:"Basic",    price:19900, deliveryDays:3,  description:"Pago unico",    features:["Pago unico","Webhook"] },
        { name:"Standard", price:39900, deliveryDays:7,  description:"Suscripciones", features:["Pagos","Suscripciones","Portal"] },
        { name:"Premium",  price:69900, deliveryDays:14, description:"Completo",      features:["Marketplace","Connect","Dashboard"] },
      ],
    },
    { title: "Estrategia de SEO",                slug: "estrategia-seo-posicionamiento",   category: "marketing",    vendor: ids[2], isFeatured: true,
      description: "Estrategia SEO completa con auditoria tecnica palabras clave y link building.",
      shortDescription: "Auditoria SEO y estrategia para aumentar trafico organico.",
      tags: ["seo","marketing digital","google","posicionamiento"],
      tiers: [
        { name:"Basic",    price:9900,  deliveryDays:5,  description:"Auditoria",  features:["Auditoria tecnica","10 palabras clave"] },
        { name:"Standard", price:24900, deliveryDays:10, description:"Estrategia", features:["50 palabras clave","Plan de contenidos"] },
        { name:"Premium",  price:49900, deliveryDays:20, description:"SEO+Links",  features:["Link building","Reportes semanales"] },
      ],
    },
    { title: "Gestion de Redes Sociales",        slug: "gestion-redes-sociales",           category: "marketing",    vendor: ids[2], isFeatured: false,
      description: "Gestion profesional de redes sociales. Contenido diario publicaciones y metricas.",
      shortDescription: "RRSS profesional con contenido diario y metricas.",
      tags: ["social media","instagram","facebook","community manager"],
      tiers: [
        { name:"Basic",    price:14900, deliveryDays:30, description:"1 red 12 posts",  features:["1 red","12 publicaciones"] },
        { name:"Standard", price:29900, deliveryDays:30, description:"3 redes 30 posts", features:["3 redes","30 publicaciones"] },
        { name:"Premium",  price:59900, deliveryDays:30, description:"Pack completo",    features:["5 redes","Posts diarios","Ads"] },
      ],
    },
    { title: "Copywriting para Emails",          slug: "copywriting-emails-marketing",     category: "writing",      vendor: ids[2], isFeatured: false,
      description: "Emails de marketing que convierten. Secuencias newsletters y automatizaciones.",
      shortDescription: "Emails que venden. Alta conversion garantizada.",
      tags: ["copywriting","email marketing","newsletters","conversion"],
      tiers: [
        { name:"Basic",    price:4900,  deliveryDays:2,  description:"3 emails",   features:["3 emails","1 revision"] },
        { name:"Standard", price:12900, deliveryDays:5,  description:"7 emails",   features:["7 emails","3 revisiones"] },
        { name:"Premium",  price:24900, deliveryDays:10, description:"15 + flujo", features:["15 emails","Automatizacion"] },
      ],
    },
  ];
}

// ── MAIN ─────────────────────────────────────────────────

async function seed() {
  console.log("\n Iniciando seed de Skillora...\n");

  await mongoose.connect(MONGODB_URI);
  console.log("Conectado a MongoDB:", MONGODB_URI.replace(/:\/\/.*@/, "://***@"));

  console.log("\n Limpiando colecciones...");
  await Promise.all([User.deleteMany({}), Service.deleteMany({}), Order.deleteMany({}), Review.deleteMany({}), Cart.deleteMany({})]);
  console.log("   ok Colecciones vaciadas");

  console.log("\n Creando indices...");
  await Promise.all([User.syncIndexes(), Service.syncIndexes(), Order.syncIndexes(), Review.syncIndexes(), Cart.syncIndexes()]);
  console.log("   ok Indices sincronizados");

  console.log("\n Creando usuarios...");
  await User.create({ ...ADMIN, password: await bcrypt.hash(ADMIN.password, 12) });
  console.log("   ok Admin:", ADMIN.email, "/", ADMIN.password);

  const vendorDocs = [];
  for (const v of VENDORS) {
    const doc = await User.create({ ...v, password: await bcrypt.hash(v.password, 12) });
    vendorDocs.push(doc);
    console.log("   ok Vendor:", doc.email);
  }

  const buyer = await User.create({ ...BUYER, password: await bcrypt.hash(BUYER.password, 12) });
  console.log("   ok Buyer:", buyer.email, "/", BUYER.password);

  console.log("\n Creando servicios...");
  const services = await Service.insertMany(buildServices(vendorDocs.map(v => v._id)));
  console.log("  ", services.length, "servicios creados");

  console.log("\n Creando ordenes...");
  const orders = await Order.insertMany([
    { buyer: buyer._id, vendor: vendorDocs[0]._id, service: services[0]._id, tierName: "Standard", tierPrice: 9900,  deliveryDays: 5, status: "completed", stripeSessionId: "cs_test_1" },
    { buyer: buyer._id, vendor: vendorDocs[1]._id, service: services[3]._id, tierName: "Basic",    tierPrice: 19900, deliveryDays: 5, status: "paid",      stripeSessionId: "cs_test_2" },
  ]);
  console.log("  ", orders.length, "ordenes creadas");

  console.log("\n Creando resena...");
  await Review.create({ service: services[0]._id, order: orders[0]._id, reviewer: buyer._id, vendor: vendorDocs[0]._id, rating: 5, comment: "Trabajo increible, supero mis expectativas." });
  await Service.findByIdAndUpdate(services[0]._id, { rating: 5, reviewCount: 1, orderCount: 1 });
  await Service.findByIdAndUpdate(services[3]._id, { orderCount: 1 });
  console.log("   ok Resena creada");

  console.log("\n================================================");
  console.log("  SEED COMPLETADO");
  console.log("================================================");
  console.log("\n  ADMIN  ->", ADMIN.email,    " /", ADMIN.password);
  console.log("  VENDOR ->", VENDORS[0].email, " /", VENDORS[0].password);
  console.log("  BUYER  ->", BUYER.email,      " /", BUYER.password);
  console.log("\n  URLs:");
  console.log("  http://localhost:3000/dashboard/admin");
  console.log("  http://localhost:3000/dashboard/vendor");
  console.log("  http://localhost:3000/dashboard/buyer");
  console.log("\n  Cambia las contrasenas despues del primer login.");
  console.log("================================================\n");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error("\n Error en seed:", err.message);
  mongoose.disconnect().finally(() => process.exit(1));
});