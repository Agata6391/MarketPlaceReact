import mongoose from "mongoose";

// Cortar buffering global (evita "buffering timed out after 10000ms")
mongoose.set("bufferCommands", false);
mongoose.set("bufferTimeoutMS", 0);

const raw = process.env.MONGODB_URI;

const MONGODB_URI =
  raw && !["null", "undefined", "none", ""].includes(raw.trim().toLowerCase())
    ? raw
    : null;

// Global cache to prevent multiple connections in dev (Next.js hot reload)
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

const cache = global.mongooseCache!;

export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) return null;

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1500,
      connectTimeoutMS: 1500,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}