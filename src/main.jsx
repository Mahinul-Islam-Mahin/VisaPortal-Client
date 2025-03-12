import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Layout/Root.jsx";
import AuthProvider from "./Contexts/AuthContext/AuthProvider.jsx";
import Home from "./Components/Pages/Home/Home.jsx";
import SignUp from "./Components/Forms/SignUp.jsx";
import AllVisa from "./Components/Pages/AllVisa/AllVisa.jsx";
import AddVisa from "./Components/Forms/AddVisa.jsx";
import MyVisas from "./Components/Pages/MyVisas/MyVisas.jsx";
import MyApplication from "./Components/Pages/MyApplications/MyApplications.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import VisaDetails from "./Components/Pages/VisaDetails/VisaDetails.jsx";
import ErrorPage from "./Components/Shared/Errorpage/Errorpage.jsx";
import Login from "./Components/Forms/Login.jsx";
import ForgotPassword from "./Components/Forms/ForgotPassword.jsx";
import { API_BASE_URL } from './config';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/all-visas",
        element: <AllVisa></AllVisa>,
      },
      {
        path: "/add-visa",
        element: (
          <PrivateRoute>
            <AddVisa></AddVisa>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-visa",
        element: (
          <PrivateRoute>
            <MyVisas></MyVisas>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-applications",
        element: (
          <PrivateRoute>
            <MyApplication></MyApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "/visa-details/:id",
        element: (
          <PrivateRoute>
            <VisaDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${API_BASE_URL}/Visa/${params.id}`),
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
