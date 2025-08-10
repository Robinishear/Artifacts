// src/Context/AuthConrext/ComponentRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthConrext/AuthCotext";


const ComponentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
     return <Navigate to="/login" state={{ from: location }} replace />;
   
  }
 return children;
 
};

export default ComponentRoute;
