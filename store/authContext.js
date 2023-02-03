import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext,  useState } from "react";
import { axiosInstance } from "../util/axios";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = (token) => {
    axiosInstance.defaults.headers.common["authorization"] = token;
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logOut = () => {
    delete axiosInstance.defaults.headers.common["authorization"];
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
