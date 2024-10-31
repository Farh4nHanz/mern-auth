import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// contexts
import { useAuth } from "@/contexts/user-context";

const useIsLoggedIn = () => {
  const { user, isRegistering } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isRegistering) return navigate("/", { replace: true });
  }, [user, isRegistering, navigate]);
};

export default useIsLoggedIn;
