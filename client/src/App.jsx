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
import { useEffect, useState } from "react";
import HowItWorks from "./pages/howItWork";
import { currentUser, getUser } from "./app/Slices/userSlice";
import { getApplication } from "./app/Slices/appSlice";
import DashAdmin from "./pages/dashAdmin";

function App() {
  //-------to re render when we update our profile------
  const [ping,setping]= useState(false);
  // const currentuser = persons.filter((el) => el._id == person?._id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(currentUser());
    dispatch(getApplication());
  }, [ping]);
  
  return (
    <>
      <Header ping={ping} setping={setping} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-work" element={<HowItWorks />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/profil-volunteer"
            element={<VolunteerProfil   />}
          />
          <Route path="/profil-host" element={<ProfileHost  />} />
          <Route path="/profil-admin" element={<DashAdmin />} />
        </Route>
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
