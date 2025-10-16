import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/discover.css";
import { useNavigate } from "react-router-dom";
import { getOpportunity } from "../app/Slices/opportunitySlice";
import { getUser } from "../app/Slices/userSlice";
import { addApplication } from "../app/Slices/appSlice";

function Discover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Selectors
  const opportunities = useSelector((state) => state.opportunity.opportunity);
  console.log(opportunities);
  const applications = useSelector((state) => state.application.application);
  console.log(applications);

  const user = useSelector((state) => state.user.user);

  const volunteerId = user?._id;

  //Local State for Search and Filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);

  useEffect(() => {
    dispatch(getOpportunity());
    dispatch(getUser());
  }, [dispatch]);

  // Filtering Logic
  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();

    const results = opportunities.filter(
      (opp) =>
        // Search  Title, Description, and Location
        opp.title?.toLowerCase().includes(lowerCaseSearch) ||
        opp.description?.toLowerCase().includes(lowerCaseSearch) ||
        opp.location?.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredOpportunities(results);
  }, [searchTerm, opportunities]);

  const hasApplied = (opportunityId) => {
    if (!applications || !volunteerId) return false;

    return applications.some(
      (app) =>
        app.id_opportunity === opportunityId && app.id_volunteer === volunteerId
    );
  };
  const handleApply = (opportunityId) => {
    if (!volunteerId) {
      alert("Please log in to apply for this opportunity.");
      return;
    }

    dispatch(
      addApplication({
        id_opportunity: opportunityId,
        id_volunteer: volunteerId,
        status: "pending",
      })
    );

    alert("Application submitted successfully!");
  };

  const getButtonState = (opportunity) => {
    if (opportunity.status?.toLowerCase() !== "open") {
      return { text: "Closed", disabled: true, className: "btn-closed" };
    }
    if (!volunteerId) {
      return {
        text: "Login to Apply",
        disabled: false,
        className: "btn-login",
      };
    }
    if (hasApplied(opportunity._id)) {
      return { text: "Applied", disabled: true, className: "btn-applied" };
    }
    return { text: "Apply Now", disabled: false, className: "btn-apply" };
  };

  return (
    <div className="discover-root">
      <header className="discover-header">
        <h1>Available Opportunities</h1>
      </header>

      {/* Search Navigation Bar */}
      <nav className="search-nav">
        <input
          type="text"
          placeholder="Search by title, location, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </nav>

      {/* Opportunities Grid */}
      {filteredOpportunities && filteredOpportunities.length > 0 ? (
        <div className="opp-container">
          {filteredOpportunities.map((opportunity) => {
            const buttonState = getButtonState(opportunity);

            return (
              <div key={opportunity?._id} className="opp-card">
                <div className="card-details">
                  <span
                    className={`opp-status-badge status-${
                      opportunity?.status?.toLowerCase() || "default"
                    }`}
                  >
                    {opportunity?.status || "N/A"}
                  </span>

                  <h3 className="opp-title">Title : {opportunity?.title}</h3>

                  <p className="opp-desc">
                    description :{" "}
                    {opportunity?.description || "No description provided."}
                  </p>

                  <div className="opp-meta">
                    <span>
                      <span className="icon-loc"></span> City :{" "}
                      {opportunity?.location}
                    </span>
                    <span>
                      <span className="icon-skills"></span> Skills :{" "}
                      {opportunity?.skills || "Skills N/A"}
                    </span>
                  </div>
                </div>

                <div className="card-actions">
                  <button
                    onClick={() =>
                      buttonState.text === "Login to Apply"
                        ? navigate("/login")
                        : handleApply(opportunity._id)
                    }
                    disabled={
                      buttonState.disabled &&
                      buttonState.text !== "Login to Apply"
                    }
                    className={`btn ${buttonState.className}`}
                  >
                    {buttonState.text}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="empty-state">
          {opportunities.length === 0
            ? "No opportunities are currently available."
            : "No results found for your search term."}
        </p>
      )}
    </div>
  );
}
export default Discover;
