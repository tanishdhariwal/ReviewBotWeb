import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser, LogoutUser, checkAuthStatus } from "../Helpers/apiComms";
import LoaderModal from "../components/shared/Loader";
import { Toaster, toast } from "react-hot-toast";
import { AuthContextType } from "./User";

const AuthContext = createContext(null | new AuthContextType());

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("user")
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data) {
          const user = { username: data.username, email: data.email };
          setUser(user);
          setIsLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("user");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    checkStatus();
  }, [navigate]);
const login = async (userData) => {
  try {
    setLoading(true);
    const payload = { email: userData.email, password: userData.password };
    const data = await LoginUser(payload);
    if (data.message === "ok") {
      const user = { username: data.username, email: data.email };
      setUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(user));
      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: "Invalid login" };
    }
  } catch (error) {
    return { success: false, message: "Login failed" };
  } finally {
    setLoading(false);
  }
};
  const logout = async () => {
    try {
      setLoading(true);
      await LogoutUser();
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("user");
      navigate("/login");
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Error during logout");
    } finally {
      setLoading(false);
    }
  };

  const value = { user, isLoggedIn, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {loading && <LoaderModal />}
      {!loading && children}
      <Toaster position="top-center" />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
