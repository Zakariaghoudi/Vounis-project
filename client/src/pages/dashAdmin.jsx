import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/dashAdmin.css";

// thunks for users
import { getUser, editUser, deleteUser } from "../app/Slices/userSlice";
// thunks for opportunities
import {
  getOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from "../app/Slices/opportunitySlice";


const DashAdmin = () => {
  const dispatch = useDispatch();

  // Redux Selectors
  const users = useSelector((state) => state.user.userList || []);
  const opportunities = useSelector(
    (state) => state.opportunity.opportunity || []
  );

  const [editingUserId, setEditingUserId] = useState(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "", 
    verified: "" 
    });

  // State for Opportunity Management (Includes status)
  const [oppForm, setOppForm] = useState({
    title: "",
    location: "",
    description: "",
    status: "Open", 
  });
  const [editingOppId, setEditingOppId] = useState(null);

  // Load lists on mount
  useEffect(() => {
    dispatch(getUser());
    dispatch(getOpportunity());
  }, [dispatch]);

  // -------- General Handlers --------
  const handleUserFormChange = (e) =>
    setUserForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleOppFormChange = (e) =>
    setOppForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Helper to re-fetch lists after mutation
  const refreshData = () => {
    dispatch(getUser());
    dispatch(getOpportunity());
  };

  // -------- Users Handlers (Edit, Delete) --------

  const startEditUser = (u) => {
    setEditingUserId(u._id);
    // Populate form with existing data, handling null/undefined values
    setUserForm({
      name: u.name || "",
      email: u.email || "",
      role: u.role || "user", 
      verified: u.isVerified ?"true" : "false", 
    });
  };

  const saveUser = async (id) => {
    try {
      // Prepare data for thunk, converting string 'verified' back to boolean if necessary
      const userPayload = {
        ...userForm,
        verified: userForm.verified === "true",
      };

      await dispatch(editUser({ id, editProfil: userPayload }));
      setEditingUserId(null);
      setUserForm({ name: "", email: "", role: "user", verified: "false" });
      refreshData();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const cancelUserAction = () => {
    setEditingUserId(null);
    setUserForm({ name: "", email: "", role: "user", verified: "false" });
  };

  const removeUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await dispatch(deleteUser(id));
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  // -------- Opportunities Handlers (Edit, Delete) --------
  const startEditOpp = (o) => {
    setEditingOppId(o._id);
    setOppForm({
      title: o.title || "",
      location: o.location || "",
      description: o.description || "",
      status: o.status || "Open",
    });
  };

  const saveOpp = async (id) => {
    try {
      await dispatch(updateOpportunity({ id, editOpportunity: oppForm }));
      setEditingOppId(null);
      setOppForm({ title: "", location: "", description: "", status: "Open" });
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelOppEdit = () => {
    setEditingOppId(null);
    setOppForm({ title: "", location: "", description: "", status: "Open" });
  };

  const removeOpp = async (id) => {
    if (!window.confirm("Delete this opportunity?")) return;
    try {
      await dispatch(deleteOpportunity(id));
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to determine status class
  const getStatusClass = (status) => {
    if (!status) return "status-default";
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("open")) return "status-open";
    if (lowerStatus.includes("closed") || lowerStatus.includes("completed"))
      return "status-closed";
    return "status-default";
  };

  return (
    <div className="admin-root">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p className="muted">Manage users and opportunities</p>
      </header>

      <main className="admin-grid">
        {/* Users column */}
        <section className="card">
          <h2>Users</h2>

          {/* User List */}
          <div className="list">
            {users.length === 0 && <div className="empty">No users found.</div>}
            {users.map((u) => (
              <div key={u._id} className="list-item">
                {editingUserId === u._id ? (
                  // User Edit Form (Expanded)
                  <div className="user-edit-form expanded-form">
                    <input
                      name="name"
                      value={userForm.name}
                      onChange={handleUserFormChange}
                      placeholder="Full Name"
                      required
                    />
                    <input
                      name="email"
                      type="email"
                      value={userForm.email}
                      onChange={handleUserFormChange}
                      placeholder="Email Address"
                      required
                    />

                    <select
                      name="role"
                      value={userForm.role}
                      onChange={handleUserFormChange}
                    >
                      <option value="admin">Admin</option>
                      <option value="host">host</option>
                      <option value="volunteer">volunteer</option>
                    </select>

                    <select
                      name="verified"
                      value={userForm.verified}
                      onChange={handleUserFormChange}
                    >
                      <option value="true">Verified</option>
                      <option value="false">Unverified</option>
                    </select>

                    <div className="inline-actions">
                      <button
                        className="btn primary"
                        onClick={() => saveUser(u._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn secondary"
                        type="button"
                        onClick={cancelUserAction}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // User Display Mode (Expanded)
                  <>
                    <div className="user-details">
                      <strong>{u.name}</strong>
                      <div className="user-metadata">
                        <span className="muted small">{u.email}</span>
                        <span
                          className={`user-role user-role-${u.role || "user"}`}
                        >
                          {u.role || "user"}
                        </span>
                        <span
                          className={`user-verified user-verified-${
                            u.isVerified ? "true" : "false"
                          }`}
                        >
                          {u.isVerified ? "Verified" : "Unverified"}
                        </span>
                      </div>
                    </div>
                    <div className="actions">
                      <button
                        className="btn action-edit"
                        onClick={() => startEditUser(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn danger"
                        onClick={() => removeUser(u._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>Opportunities</h2>

          <div className="list">
            {opportunities.length === 0 && (
              <div className="empty">No opportunities found.</div>
            )}
            {opportunities.map((o) => (
              <div key={o._id} className="list-item">
                {editingOppId === o._id ? (
                  <div className="opp-edit-form expanded-form">
                    <input
                      name="title"
                      value={oppForm.title}
                      onChange={handleOppFormChange}
                      placeholder="Title"
                    />
                    <input
                      name="location"
                      value={oppForm.location}
                      onChange={handleOppFormChange}
                      placeholder="Location"
                    />
                    <textarea
                      name="description"
                      value={oppForm.description || ""}
                      onChange={handleOppFormChange}
                      placeholder="Description"
                      rows={2}
                    />

                    <select
                      name="status"
                      value={oppForm.status}
                      onChange={handleOppFormChange}
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>

                    <div className="inline-actions">
                      <button
                        className="btn primary"
                        onClick={() => saveOpp(o._id)}
                      >
                        Save
                      </button>
                      <button className="btn secondary" onClick={cancelOppEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="opp-details">
                      <strong>{o.title}</strong>
                      <div className="opp-metadata">
                        <span className="muted small">{o.location}</span> <br />
                        <span
                          className={`opp-status ${getStatusClass(o.status)}`}
                        >
                          {o.status || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="actions">
                      <button
                        className="btn action-edit"
                        onClick={() => startEditOpp(o)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn danger"
                        onClick={() => removeOpp(o._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashAdmin;
