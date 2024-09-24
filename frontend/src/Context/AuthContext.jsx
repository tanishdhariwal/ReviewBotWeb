import { createContext, useState, useContext } from "react";
import { LoginUser, LogoutUser } from "../Helpers/apiComms";
// Define the shape of the user and authentication state
const AuthContext = createContext(null);

export default AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username, password) => {
    const data = await LoginUser(username, password);
    if (!data) {
      throw new Error("Invalid login");
    }
    setUser({ username: data.username, email:data.email});
    setIsLoggedIn(true);
  };

  const logout = async () => {
    const data = await LogoutUser();
    if (!data) {
      throw new Error("Invalid logout");
    }
    setUser(null);
    setIsLoggedIn(false);
    window.location.reload();
  };

  const value = {
    user,isLoggedIn,login,logout,
};
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
