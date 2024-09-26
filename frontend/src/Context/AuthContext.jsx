import { createContext, useState, useContext } from "react";
import { LoginUser, LogoutUser } from "../Helpers/apiComms";
import { User, AuthContextType } from "./User";

// Define the shape of the user and authentication state
const AuthContext = createContext(new AuthContextType()|null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username, password) => {
    const data = await LoginUser(username, password);
    if (!data) {
      throw new Error("Invalid login");
    }
    const user = new User(data.username, data.email);         // creating a new user ensuring type safety coz we don't know TS
    setUser(user);
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

  const value = new AuthContextType(user, isLoggedIn, login, logout);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// export { useAuth, AuthProvider };


/*

Read me here 
AuthContext File:

AuthContext: This is the context object created using createContext. It holds the default value of the context, which is null.
AuthProvider: This component wraps its children with the AuthContext.Provider and provides the authentication state and functions (login, logout) to its children.
useAuth: This is a custom hook that allows components to access the authentication context.

*/
