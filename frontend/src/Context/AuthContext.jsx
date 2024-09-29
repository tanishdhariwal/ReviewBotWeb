import { createContext, useState, useContext, useEffect } from "react";
import { LoginUser, LogoutUser, checkAuthStatus } from "../Helpers/apiComms";
import { User, AuthContextType } from "./User";

const AuthContext = createContext(new AuthContextType|null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      }
    }
    checkStatus();
  }, []);

  const login = async (userData) => {
    try {
      const payload = { email: userData.email, password: userData.password };
      const data = await LoginUser(payload);
      if (!data) {
        throw new Error("Invalid login");
      }
      const user = new User(data.username, data.email);
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log("trying logout");
      await LogoutUser();
      console.log("lemme logout");
      setUser(null);
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  const value = { user, isLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
