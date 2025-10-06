import "./App.css";
//-------import the components-----
import Header from "./components/navbar";
//import Footer from "./components/footer";
//-------import public pages---------
import Home from "./pages/home";
import Discover from "./pages/discover";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";
//------import the private pages-----
import PrivateRoute from "./privateRoutes/privateRoute";
import VolunteerProfil from "./pages/volunteerProfil";
import ProfileHost from "./pages/profileHost";
//-----import slices and hooks----------
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HowItWorks from "./pages/howItWork";
import { currentUser, getUser } from "./app/Slices/userSlice";
import { getApplication } from "./app/Slices/appSlice";

function App() {
  const person = useSelector ((state)=> state.user.user);
  const persons = useSelector((state) => state.user.userList);
  const currentuser = persons.filter((el)=> el._id == person?._id)
  console.log("the user by id :", currentuser);



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(currentUser());
    dispatch(getApplication());
  }, []);
    return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-work" element={<HowItWorks />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/volunteer-profil" element={<VolunteerProfil currentuser={currentuser} />} />
          <Route path="/profile-host" element={<ProfileHost />} />
        </Route>
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
