import "./App.css";
import Header from "./components/navbar";
//import Footer from "./components/footer";
import Register from "./pages/register";
import Login from "./pages/login";
import Profil from "./pages/profil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUser } from "./app/userSlice/userSlice";
import PrivateRoute from "./privateRoutes/privateRoute";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentUser());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profil" element={<Profil/>} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
