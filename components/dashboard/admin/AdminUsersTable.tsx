// components/dashboard/admin/AdminUsersTable.tsx
"use client";

import Link from "next/link";
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
};

export default function AdminUsersTable({ users }: { users: UserRow[] }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header">
        <div className="dashboard-card__title">All users</div>
        <div className="dashboard-card__meta">{users.length} total</div>

        <Link className="dashboard-btn" href="/dashboard/admin/users/new">
          Create user
        </Link>
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

              return (
                <tr key={id} className={status !== "active" ? "row-muted" : ""}>
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
                    <Link className="dashboard-link" href={`/dashboard/admin/users/${id}`}>
                      Manage
                    </Link>
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