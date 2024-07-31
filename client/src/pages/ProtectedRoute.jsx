import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (isAuth === false || !accessToken) return navigate("/", { replace: true });

    if (isAuth === true && window.location.pathname === "/")
      return navigate("/app/cities", { replace: true });
  }, [isAuth, navigate]);

  return isAuth ? children : null;
};

export default ProtectedRoute;
