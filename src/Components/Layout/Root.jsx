import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Shared/Footer/Footer";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";

const Root = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <HashLoader color="#387478" size={110} />
      </div>
    );
  }
  return (
    <div className="overflow-x-hidden">
      <NavBar></NavBar>
      <div className="my-32">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Root;
