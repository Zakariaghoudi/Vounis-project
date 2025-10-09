import "../styles/profilHeader.css";
import ProfilHeader from "../components/profileHeader";
import VolunteerApp from "./volunteerApp";
import EditProfile from "../components/editProfile";
import { useState } from "react";


const VolunteerProfile = () => {
  const [showDetails, setShowDetails] = useState(false);
  const handleClickEdit = () => {
    setShowDetails(!showDetails);
  };
  return (
      <div className="profile-dashboard">
        <ProfilHeader handleClickEdit={handleClickEdit} />
        {showDetails ? <EditProfile /> : <VolunteerApp />}
      </div>
      );
};

export default VolunteerProfile;
