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
//-----import slices and hooks----------
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HowItWorks from "./pages/howItWork";
import { currentUser, getUser } from "./app/Slices/userSlice";
import { getApplication } from "./app/Slices/appSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(currentUser());
    dispatch(getApplication());
  }, []);

  const application = useSelector(
      (state) => state.application.application
    );
console.log(application);
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
          <Route path="/volunteer-profil" element={<VolunteerProfil />} />
        </Route>
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
