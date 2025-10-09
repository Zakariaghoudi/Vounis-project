import ProfilHeader from "../components/profileHeader";
import EditProfile from "../components/editProfile";
import "../styles/profileHost.css";
const ProfileHost = () => {  
  return (
    <>
      <main>
        <ProfilHeader />
        <EditProfile />
      </main>

      <div className="host-section-content">
        <h2 className="host-section-title">Your Host Dashboard</h2>
        <div className="host-stats">
          <h3>Overview & Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card pending">
              <span className="stat-value">***</span>
              <span className="stat-label">Pending Applications</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">**</span>
              <span className="stat-label">Active Applications</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">**</span>
              <span className="stat-label">Total Volunteers Hosted</span>
            </div>
          </div>
          <div className="host-actions">
            <button className="btn-manage-listings">Add opportunity</button>
            <button className="btn-view-calendar">
              manage your opportunities
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHost;
