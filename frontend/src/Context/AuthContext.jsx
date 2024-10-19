import { createContext, useState, useContext, useEffect } from "react";
import { LoginUser, LogoutUser, checkAuthStatus } from "../Helpers/apiComms";
import { User, AuthContextType } from "./User";
import LoaderModal from "../components/shared/Loader"; // Import loader modal
import { CloudCog } from "lucide-react";

const AuthContext = createContext(new AuthContextType || null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data) {
          const user = new User(data.username, data.email);
          setUser(user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false); // End loading
      }
    }
    checkStatus();
  }, []);

  const login = async (userData) => {
    try {
      setLoading(true); // Start loading
      const payload = { email: userData.email, password: userData.password };
      const data = await LoginUser(payload);
      if (!data) {
        throw new Error("Invalid login");
      }
      console.log(data);
      console.log(data.username)
      const user = new User(data.username, data.email);
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    } finally {
      setLoading(false); // End loading
    }
  };

  const logout = async () => {
    try {
      setLoading(true); // Start loading
      await LogoutUser();
      setUser(null);
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    } finally {
      setLoading(false); // End loading
    }
  };

  const value = { user, isLoggedIn, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {loading && <LoaderModal />}
      {!loading && children}
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