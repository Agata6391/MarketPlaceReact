// components/dashboard/admin/AdminUsersTable.tsx
"use client";

import { useState } from "react";
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
  deletedAt?: string | Date; // needed for Delete/Restore UI
};

type ApiResp = { ok: boolean; data?: any; error?: string };

async function apiCall(url: string, method: string, body?: any): Promise<boolean> {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) return false;

  const json = (await res.json().catch(() => null)) as ApiResp | null;
  return json ? json.ok !== false : true;
}

export default function AdminUsersTable({ users }: { users: UserRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function run(id: string, fn: () => Promise<boolean>) {
    if (busyId) return;
    setBusyId(id);
    try {
      const ok = await fn();
      if (ok) router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header">
        <div className="dashboard-card__title">All users</div>
        <div className="dashboard-card__meta">{users.length} total</div>

        {/* placeholder: luego modal */}
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
                          onClick={() =>
                            run(id, () => apiCall(`/api/admin/users/${id}/restore`, "PATCH"))
                          }
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
  );
}