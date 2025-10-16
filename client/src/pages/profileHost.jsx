import ProfilHeader from "../components/profileHeader";
import EditProfile from "../components/editProfile";
import "../styles/profileHost.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOpportunity,
  addOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from "../app/Slices/opportunitySlice";
import {
  getApplication,
  updateApplication,
  deleteApplication,
} from "../app/Slices/appSlice";

const ProfileHost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // console.log(user )
  const opportunities = useSelector((state) =>(state.opportunity.opportunity));
  // console.log("opp is", opportunities)
  const applications = useSelector((s) =>(s.application.application));
  console.log("applications is :" , applications)
  const [editingId, setEditingId] = useState(null);
  // Filter opportunies elli postihom el host
  const myOpportunities = opportunities.filter((o) => o.id_host === user?._id);
  // console.log("my opp is",myOpportunities)
  //-- Filter applications elli apply 3lihom les volunteers
  const myApplications = applications.filter((a) =>
    myOpportunities.some((o) => o._id === a.id_opportunity)
);
console.log("my application is ", myApplications)
// form for add an application 
const [form, setForm] = useState({
  title: "",
  description: "",
  skills: "",
  location: "",
  status: "open",
});


  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleAdd = async (e) => {
    e.preventDefault();
    const payload = { ...form, id_host: user?._id };
    try {
      await dispatch(addOpportunity(payload));
      setForm({ title: "", description: "", skills: "", location: "" });
      dispatch(getOpportunity());
    } catch (err) {
      console.error(err);
    }
  };
// for edit an opportunity 
  const startEdit = (opp) => {
    setEditingId(opp._id);
    setForm({
      title: opp.title || "",
      description: opp.description || "",
      skills: opp.skills || "",
      location: opp.location || "",
    });
  };

  const handleSave = async (id) => {
    try {
      const payload = { id, editOpportunity: { ...form, id_host: user?._id } };
      await dispatch(updateOpportunity(payload));
      setEditingId(null);
      setForm({ title: "", description: "", skills: "", location: "" });
      dispatch(getOpportunity());
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this opportunity?")) return;
    try {
      await dispatch(deleteOpportunity(id));
      dispatch(getOpportunity());
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplicationUpdate = async (id, status) => {
    try {
      await dispatch(updateApplication({ id, editApp: { status } }));
      dispatch(getApplication());
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplicationDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await dispatch(deleteApplication(id));
      dispatch(getApplication());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <main>
        <ProfilHeader />
        <EditProfile />
      </main>

      <div className="host-section-content">
        <h2 className="host-section-title">Your Host Dashboard</h2>

        <section className="host-panel panel">
          <h3>Create new Opportunity</h3>
          <form
            onSubmit={
              editingId
                ? (e) => (e.preventDefault(), handleSave(editingId))
                : handleAdd
            }
            className="host-form"
          >
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              name="location"
              placeholder="City/Location"
              value={form.location}
              onChange={handleChange}
            />
            <input
              name="skills"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={handleChange}
            />
            <label
              style={{ display: "block", fontSize: ".9rem", color: "#444" }}
            >
              Status
            </label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <div className="host-form-actions">
              {editingId ? (
                <button
                  className="btn primary"
                  onClick={() => handleSave(editingId)}
                >
                  Save
                </button>
              ) : (
                <button className="btn primary" type="submit">
                  Add Opportunity
                </button>
              )}
              {editingId && (
                <button
                  className="btn"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      title: "",
                      description: "",
                      skills: "",
                      location: "",
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="host-panel panel">
          <h3>Your Opportunities</h3>
          {myOpportunities.length ? (
            myOpportunities.map((o) => (
              <div key={o._id} className="host-opp-card">
                <div>
                  <strong>{o.title}</strong>
                  <div className="meta">
                    {o.location} • {o.skills}
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: 6,
                        background: o.status === "open" ? "#e6f7ea" : "#fff0f0",
                        color: o.status === "open" ? "#2e7d32" : "#c62828",
                        fontWeight: 700,
                        fontSize: ".85rem",
                      }}
                    >
                      {o.status}
                    </span>
                  </div>
                </div>
                <div className="host-opp-actions">
                  <button
                    className="btn"
                    onClick={() => {
                      setEditingId(o._id);
                      setForm({
                        title: o.title,
                        description: o.description,
                        skills: o.skills,
                        location: o.location,
                        status: o.status || "open",
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn danger"
                    onClick={() => handleDelete(o._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      const newStatus = o.status === "open" ? "closed" : "open";
                      // send only status change
                      dispatch(
                        updateOpportunity({
                          id: o._id,
                          editOpportunity: { status: newStatus },
                        })
                      );
                      // refresh
                      dispatch(getOpportunity());
                    }}
                    style={{ marginLeft: 6 }}
                  >
                    Toggle Status
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">You have no opportunities yet.</div>
          )}
        </section>

        <section className="host-panel panel">
          <h3>Applications</h3>
          {myApplications.length ? (
            myApplications.map((a) => (
              <div key={a._id} className="application-card">
                <div>
                  <div>
                    <strong>Volunteer:</strong> {a.id_volunteer}
                  </div>
                  <div>
                    <strong>Opportunity:</strong> {a.id_opportunity}
                  </div>
                  <div className="meta">
                    <strong>Status:</strong> {a.status}
                  </div>
                </div>
                <div className="host-opp-actions">
                  <button
                    className="btn primary"
                    onClick={() => handleApplicationUpdate(a._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleApplicationUpdate(a._id, "rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="btn danger"
                    onClick={() => handleApplicationDelete(a._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">No applications for your opportunities.</div>
          )}
        </section>
      </div>
    </>
  );
};

export default ProfileHost;
