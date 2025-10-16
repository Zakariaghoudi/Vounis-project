import "./App.css";

//-------import the components-----
import Header from "./components/navbar";
import Footer from "./components/footer";
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
import Verification from "./components/verification";
//-----import slices and hooks----------
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import HowItWorks from "./pages/howItWork";
import { currentUser, getUser } from "./app/Slices/userSlice";
import { getApplication } from "./app/Slices/appSlice";
import DashAdmin from "./pages/dashAdmin";
import { getOpportunity } from "./app/Slices/opportunitySlice";

function App() {
  // const currentuser = persons.filter((el) => el._id == person?._id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(currentUser());
    dispatch(getApplication());
    dispatch(getOpportunity());
  }, [dispatch]);
  return (
    <>
  
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/how-it-work" element={<HowItWorks />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
        <Route element={<PrivateRoute adminOnly={true}  />} >
          <Route path="/profil-admin" element={<DashAdmin />} />
        </Route>
        <Route element={<PrivateRoute role={['volunteer']} />} >
          <Route path="/profil-volunteer" element={<VolunteerProfil />} />
        </Route>
        <Route  element={<PrivateRoute role={['host']} />} >
          <Route path="/profil-host" element={<ProfileHost />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
