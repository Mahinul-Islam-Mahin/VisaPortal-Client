import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthProvider";
import { HashLoader } from "react-spinners";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      const timeout = setTimeout(() => {
        setIsRedirecting(true);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [loading, user]);

  if (loading || (!user && !isRedirecting)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#387478" size={110} />
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export default PrivateRoute;
