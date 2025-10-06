import "../styles/volunteerApp.css";

const VolunteerApplications = () => {
  return (
    <div className="applications-container">
      <h2 className="page-title">My Volunteer Applications</h2>
      <p className="page-subtitle">
        Track the status of your applications for all initiatives you've applied
        to.
      </p>

      <div className="filter-tabs">
        <button className="tab-btn active">All</button>
        <button className="tab-btn">Pending Review</button>
        <button className="tab-btn">Accepted</button>
        <button className="tab-btn">Completed</button>
      </div>

      <div className="applications-list">
        <div className="application-card">
          <div className="card-info">
            <h4 className="project-title">title of app</h4>
            <p className="host-name">
              Host: <span> host 1</span>
            </p>
            <p className="date-submitted">Submitted: date</p>
            <p className="start-countdown">Starts in: ***days</p>
          </div>

          <div className="card-actions">
            <span className="status-badge">
              <span> host 1</span>
            </span>
            <button className="details-btn">View Details</button>
            <button className="cancel-btn">Cancel Application</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerApplications;
