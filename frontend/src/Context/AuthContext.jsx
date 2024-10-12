import { createContext, useState, useContext, useEffect } from "react";
import { LoginUser, LogoutUser, checkAuthStatus } from "../Helpers/apiComms";

// Create the AuthContext with null as the initial value
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data) {
          const user = { username: data.username, email: data.email };
          setUser(user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
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
      const user = { username: data.username, email: data.email };
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await LogoutUser();
      setUser(null);
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  const value = { user, isLoggedIn, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
