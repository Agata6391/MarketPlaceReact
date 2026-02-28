// components/dashboard/admin/AdminUsersTable.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/pages/dashboard.css";

type UserRow = {
  _id: any;
  name: string;
  email: string;
  role: "admin" | "vendor" | "buyer";
  provider: "credentials" | "google";
  status?: "active" | "suspended" | "banned";
  createdAt?: string | Date;
  avatar?: string;
  deletedAt?: string | Date;
};

type ApiResp = { ok: boolean; data?: any; error?: string };

async function apiCall(url: string, method: string, body?: any): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = (await res.json().catch(() => null)) as ApiResp | null;

  if (!res.ok) {
    return { ok: false, error: json?.error ?? `HTTP ${res.status}` };
  }

  if (json && json.ok === false) return { ok: false, error: json.error ?? "Request failed" };
  return { ok: true };
}

function ResetPasswordModal({
  open,
  userLabel,
  loading,
  error,
  onClose,
  onConfirm,
}: {
  open: boolean;
  userLabel: string;
  loading: boolean;
  error: string;
  onClose: () => void;
  onConfirm: (password: string, confirm: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // reset fields when opened/closed
  useMemo(() => {
    if (!open) {
      setPassword("");
      setConfirm("");
    }
    return null;
  }, [open]);

  if (!open) return null;

  const overlay: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
  };

  const box: React.CSSProperties = {
    background: "var(--color-surface)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-border)",
    padding: 24,
    width: "100%",
    maxWidth: 520,
  };

  return (
    <div style={overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={box}>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700 }}>
          Reset password
        </div>
        <div style={{ marginTop: 6, color: "var(--color-text-2)", fontSize: "0.9rem" }}>
          User: <span style={{ color: "var(--color-text)" }}>{userLabel}</span>
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">New password (min 8 chars)</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Confirm password</label>
            <input
              className="form-input"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {error && (
            <div style={{ color: "var(--color-accent)", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
          <button className="dashboard-action" type="button" disabled={loading} onClick={onClose}>
            Cancel
          </button>
          <button
            className="dashboard-action"
            type="button"
            disabled={loading}
            onClick={() => onConfirm(password, confirm)}
          >
            {loading ? "Updating..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersTable({ users }: { users: UserRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  // Reset PW modal state
  const [resetOpen, setResetOpen] = useState(false);
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [resetUserLabel, setResetUserLabel] = useState<string>("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  async function run(id: string, fn: () => Promise<{ ok: boolean; error?: string }>) {
    if (busyId) return;
    setBusyId(id);
    try {
      const res = await fn();
      if (res.ok) router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  function openReset(u: UserRow) {
    const id = u._id?.toString?.() ?? String(u._id);
    setResetUserId(id);
    setResetUserLabel(`${u.email}`);
    setResetError("");
    setResetOpen(true);
  }

  async function confirmReset(password: string, confirm: string) {
    if (!resetUserId) return;

    const p = password.trim();
    const c = confirm.trim();

    if (p.length < 8) {
      setResetError("Password must be at least 8 characters.");
      return;
    }
    if (p !== c) {
      setResetError("Passwords do not match.");
      return;
    }

    setResetLoading(true);
    setResetError("");

    const res = await apiCall(`/api/admin/users/${resetUserId}/password`, "PATCH", { password: p });

    setResetLoading(false);

    if (!res.ok) {
      setResetError(res.error ?? "Failed to update password.");
      return;
    }

    setResetOpen(false);
    router.refresh();
  }

  return (
    <>
      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <div className="dashboard-card__title">All users</div>
          <div className="dashboard-card__meta">{users.length} total</div>

          <button className="dashboard-btn" type="button" disabled>
            Create user
          </button>
        </div>

        <div className="dashboard-table__wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Provider</th>
                <th>Status</th>
                <th>Created</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => {
                const id = u._id?.toString?.() ?? String(u._id);
                const created = u.createdAt ? new Date(u.createdAt).toISOString().slice(0, 10) : "—";
                const status = u.status ?? "active";
                const isDeleted = Boolean(u.deletedAt);
                const isBusy = busyId === id;

                return (
                  <tr key={id} className={status !== "active" || isDeleted ? "row-muted" : ""}>
                    <td>
                      <div className="user-cell">
                        <div className="user-cell__avatar">
                          {u.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={u.avatar} alt={u.name} />
                          ) : (
                            <span>{(u.name?.[0] ?? "?").toUpperCase()}</span>
                          )}
                        </div>
                        <div className="user-cell__text">
                          <div className="user-cell__name">{u.name}</div>
                          <div className="user-cell__id">{id}</div>
                        </div>
                      </div>
                    </td>

                    <td>{u.email}</td>
                    <td>
                      <span className="badge">{u.role}</span>
                    </td>
                    <td>
                      <span className="badge badge--soft">{u.provider}</span>
                    </td>
                    <td>
                      <span className={`badge badge--status badge--${status}`}>{status}</span>
                    </td>
                    <td>{created}</td>

                    <td style={{ textAlign: "right" }}>
                      <div className="row-actions">
                        <button
                          className="dashboard-action"
                          disabled={isBusy || isDeleted || status === "banned"}
                          onClick={() =>
                            run(id, () =>
                              apiCall(
                                `/api/admin/users/${id}/suspend`,
                                "PATCH",
                                status === "suspended"
                                  ? { action: "unsuspend" }
                                  : { action: "suspend", days: 7 }
                              )
                            )
                          }
                        >
                          {status === "suspended" ? "Unsuspend" : "Suspend"}
                        </button>

                        <button
                          className="dashboard-action"
                          disabled={isBusy || isDeleted}
                          onClick={() =>
                            run(id, () =>
                              apiCall(
                                `/api/admin/users/${id}/ban`,
                                "PATCH",
                                status === "banned"
                                  ? { action: "unban" }
                                  : { action: "ban", reason: "Admin action" }
                              )
                            )
                          }
                        >
                          {status === "banned" ? "Unban" : "Ban"}
                        </button>

                        <button
                          className="dashboard-action"
                          disabled={isBusy || isDeleted}
                          onClick={() => openReset(u)}
                        >
                          Reset PW
                        </button>

                        {!isDeleted ? (
                          <button
                            className="dashboard-action dashboard-action--danger"
                            disabled={isBusy}
                            onClick={() => run(id, () => apiCall(`/api/admin/users/${id}`, "DELETE"))}
                          >
                            Delete
                          </button>
                        ) : (
                          <button
                            className="dashboard-action"
                            disabled={isBusy}
                            onClick={() => run(id, () => apiCall(`/api/admin/users/${id}/restore`, "PATCH"))}
                          >
                            Restore
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ResetPasswordModal
        open={resetOpen}
        userLabel={resetUserLabel}
        loading={resetLoading}
        error={resetError}
        onClose={() => {
          if (resetLoading) return;
          setResetOpen(false);
        }}
        onConfirm={confirmReset}
      />
    </>
  );
}