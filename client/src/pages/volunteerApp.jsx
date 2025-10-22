import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplication, deleteApplication } from "../app/Slices/appSlice";
import { getOpportunity } from "../app/Slices/opportunitySlice";
import "../styles/volunteerApp.css";

const VolunteerApplications = () => {
  const dispatch = useDispatch();

  // Select ALL necessary data from the store
  const user = useSelector((s) => s.user.user);
  const allApplications = useSelector((s) => s.application.application);
  const allOpportunities = useSelector((s) => s.opportunity.opportunity);
  // console.log("the user is:",user);
  // console.log("all applications are:",allApplications);
  console.log("all opportunities are:", allOpportunities);

  // Filter keys must match database status values (lowercase)
  const [filter, setFilter] = useState("all");

  // Load applications AND opportunities on mount
  useEffect(() => {
    dispatch(getApplication());
    dispatch(getOpportunity());
  }, [dispatch]);

  /**
   * Helper function to enrich application data with opportunity details.
   */
  const getEnrichedApplications = () => {
    const userId = user?._id;
    if (!userId) return [];

    const userApps = allApplications.filter(
      (a) => a.id_volunteer?._id === userId
    );
    console.log("users apps", userApps);
    return userApps.map((app) => {
      const opportunity = allOpportunities.find(
        (opp) => opp._id === app.id_opportunity?._id
      );
      console.log("opportunity is", opportunity);
      return {
        ...app,
        // Enriched Fields for display
        opportunityTitle: opportunity?.title || "Title Not Found",
        opportunityLocation: opportunity?.location || "N/A",
        status: app?.status,
        hostName:
          `${opportunity?.postedBy?.name} ${opportunity?.postedBy?.lastName}` ||
          "N/A",
      };
    });
  };

  const enrichedApps = getEnrichedApplications();

  // Filter applications based on selected tab
  const visibleApps = enrichedApps.filter((a) => {
    if (filter === "all") return true;

    // Handle "pending" filter logic explicitly
    if (filter === "pending") {
      // Include applications that are either explicitly 'pending'
      return a.status === "pending";
    }

    if (filter === "completed") {
      return a.status === "completed";
    }

    // Direct match for 'accepted' or 'rejected'
    return a.status === filter;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Cancel this application?")) return;
    try {
      await dispatch(deleteApplication(id));
      dispatch(getApplication());
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to format status for display and color coding
  const getStatusLabel = (status) => {
    if (!status) return "Pending";
    const lowerStatus = status.toLowerCase();

    if (lowerStatus === "accepted") return "Accepted";
    if (lowerStatus === "rejected") return "Rejected";
    if (lowerStatus === "completed") return "Completed";

    // All other statuses default to Pending
    return "Pending";
  };

  // Filter tabs reflecting the user's flow
  const filterTabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "accepted", label: "Accepted" },
    { key: "rejected", label: "Rejected" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="applications-container">
      <h2 className="page-title">My Volunteer Applications</h2>
      <p className="page-subtitle">Track the status of your applications.</p>

      <div className="filter-tabs">
        {filterTabs.map((t) => (
          <button
            key={t.key}
            className={`tab-btn ${filter === t.key ? "active" : ""}`}
            onClick={() => setFilter(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="applications-list grid-view">
        {" "}
        {/* Added grid-view class */}
        {/* {visibleApps.length === 0 && <div className="empty full-width">No applications found in the '{filterTabs.find(t => t.key === filter)?.label || 'All'}' category.</div>} */}
        {visibleApps.map((a) => (
          <div
            key={a._id}
            className={`application-card card-grid status-${a.status}`}
          >
            <div className="card-info">
              <h4 className="project-title">{a.opportunityTitle}</h4>
              <p className="host-name">
                Host Name: <span>{a.hostName}</span>
              </p>
              <p className="date-submitted">
                Location: <span>{a.opportunityLocation}</span>
              </p>
              <p className="date-submitted">
                Submitted: {new Date(a.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="card-actions">
              <span className={`status-badge status-${a.status}`}>
                {getStatusLabel(a.status)}
              </span>

              <button
                className="details-btn"
                onClick={() => alert(`Details for: ${a.opportunityTitle}`)}
              >
                View Details
              </button>

              {/* Allow cancel if status is pending */}
              {a.status === "pending" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleDelete(a._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerApplications;
