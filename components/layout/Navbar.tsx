"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/styles/components/navbar.css";

interface SearchResult {
  _id: string;
  title: string;
  category: string;
  thumbnail?: string;
  slug: string;
}

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // ── Autocomplete search ───────────────────────────────
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/services?q=${encodeURIComponent(query)}&limit=5`);
      const data = await res.json();
      if (data.success) {
        setResults(data.data.services);
        setShowDropdown(true);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // ── Cart count ────────────────────────────────────────
  useEffect(() => {
    if (!session) return;
    fetch("/api/cart")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCartCount(d.data.items?.length ?? 0);
      });
  }, [session]);

  // ── Close dropdowns on outside click ─────────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const dashboardPath =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "vendor"
      ? "/dashboard/vendor"
      : "/dashboard/buyer";

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        {/* Logo */}
        <Link href="/" className="navbar__logo">
          Skill<span>ora</span>
        </Link>

        {/* Search */}
        <div className="navbar__search" ref={searchRef}>
          <span className="navbar__search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            className="navbar__search-input"
            type="text"
            placeholder="Search services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query) {
                router.push(`/services?q=${encodeURIComponent(query)}`);
                setShowDropdown(false);
              }
            }}
          />

          {showDropdown && results.length > 0 && (
            <div className="navbar__search-dropdown">
              {results.map((r) => (
                <div
                  key={r._id}
                  className="navbar__search-item"
                  onClick={() => {
                    router.push(`/services/${r._id}`);
                    setShowDropdown(false);
                    setQuery("");
                  }}
                >
                  <div className="navbar__search-item-thumb">
                    {r.thumbnail && (
                      <Image src={r.thumbnail} alt={r.title} width={36} height={36} style={{ borderRadius: 4 }} />
                    )}
                  </div>
                  <div className="navbar__search-item-info">
                    <p className="navbar__search-item-title">{r.title}</p>
                    <p className="navbar__search-item-category">{r.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="navbar__actions">
          {session && (
            <Link href="/cart" className="navbar__cart-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
            </Link>
          )}

          {session ? (
            <div className="navbar__user-menu" ref={userMenuRef}>
              <div className="navbar__avatar" onClick={() => setShowUserMenu((v) => !v)}>
                {user?.image ? (
                  <Image src={user.image} alt={user.name ?? ""} width={36} height={36} />
                ) : (
                  (user?.name?.[0] ?? "U").toUpperCase()
                )}
              </div>

              {showUserMenu && (
                <div className="navbar__dropdown">
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600 }}>{user?.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-2)" }}>{user?.role}</p>
                  </div>
                  <Link href={dashboardPath} className="navbar__dropdown-item" onClick={() => setShowUserMenu(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                    </svg>
                    Dashboard
                  </Link>
                  <div className="navbar__dropdown-divider" />
                  <button
                    className="navbar__dropdown-item navbar__dropdown-item--danger"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" style={{ fontSize: "0.875rem", color: "var(--color-text-2)", padding: "8px 16px" }}>
                Log In
              </Link>
              <Link
                href="/register"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  padding: "8px 20px",
                  background: "var(--color-primary)",
                  borderRadius: "var(--radius-full)",
                  color: "white",
                  transition: "opacity 0.2s",
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
