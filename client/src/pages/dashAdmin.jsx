import EditProfile from "../components/editProfile";
import ProfileHeader from "../components/profileHeader";
import "../styles/dashAdmin.css";

const DashAdmin = () => {
  return (
    <section className="dash-admin">
      <div className="dash-container">
        <ProfileHeader />
        <EditProfile />
      </div>
      <div className="section-dash">
        <div className="users">
          <div className="stat-value">
            <span>2</span>
          <div className="stat-label">Users</div>
          </div>
          <button className="btn primary">View all users</button>
        </div>
        <div className="opportunities">
          <div className="stat-value">
            <span>3</span>
          <div className="stat-label">Opportunities</div>
          </div>
          <button className="btn outline">View opportunities</button>
        </div>
      </div>
    </section>
  );
};

export default DashAdmin;
