import "../styles/edit-profile.css";
import ProfilHeader from "../components/profileHeader";
import { useState } from "react";
import VolunteerApp from "./volunteerApp";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../app/Slices/userSlice";

const VolunteerProfile = () => {
  // state for show detail of profile edit with the button Edit your profile : DONE
  const [showDetails, setShowDetails] = useState(false);
  const handleClickEdit = () => {
    setShowDetails(!showDetails);
  };
  //  dispatch and get the user details for update his information
  const edit = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  // state for change the values of profile
  const [editProfil, setEditProfil] = useState({
    name: edit?.name,
    lastName: edit?.lastName,
    email: edit?.email,
    phoneNumber: edit?.phoneNumber,
    description: edit?.description,
    skills: edit?.skills,
  });

  // function for the button save change + send deatils : update user
  const handleEdit =()=>{
    const sendDetails = {
            id: edit?._id , editProfil
    }
    dispatch(editUser(sendDetails))
  };
   const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="profile-container">
        <ProfilHeader handleClickEdit={handleClickEdit} />
        {showDetails ? (
          <form  onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                defaultValue={edit?.name}
                onChange={(e) => {
                  setEditProfil({ ...editProfil, name: e.target.value });
                }}
              />

              <label>Last Name</label>
              <input
                type="text"
                defaultValue={edit?.lastName}
                onChange={(e) => {
                  setEditProfil({ ...editProfil, lastName: e.target.value });
                }}
              />

              <label>Email</label>
              <input
                type="email"
                defaultValue={edit?.email}
                onChange={(e) => {
                  setEditProfil({ ...editProfil, email: e.target.value });
                }}
              />

              <label htmlFor="name">Phone Number</label>
              <input
                type="tel"
                placeholder="Ex : +216 70 000 000"
                defaultValue={edit?.phoneNumber}
                onChange={(e) => {
                  setEditProfil({ ...editProfil, phoneNumber: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">About you</label>
              <textarea
                defaultValue={edit?.description}
                onChange={(e) => {
                  setEditProfil({ ...editProfil, description: e.target.value });
                }}
                placeholder="descibre yourself and your experience in volunteer"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="skills"> Your Skills </label>
              <input
                type="text"
                defaultValue={edit?.skills}
                onChange={(e) => {
                  setEditProfil({ ...editProfil, skills: e.target.value });
                }}
                placeholder="Ex : Leader, designer ..."
              />
            </div>

            <button
              onClick={() => {
                handleEdit()
              }}
              className="save-changes-btn"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <VolunteerApp />
        )}
      </div>
    </main>
  );
};

export default VolunteerProfile;
