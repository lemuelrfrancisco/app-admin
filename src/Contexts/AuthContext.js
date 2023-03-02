import { createContext, useState } from "react";

export const AuthContext = createContext({
  accessToken: "",
  authenticate: () => {},
  signOut: () => {},
  isAuthenticated: false,
});

function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState();

  function authenticate(token) {
    setAccessToken(token);
  }

  function signOut() {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  }

  const value = {
    accessToken: accessToken,
    authenticate: authenticate,
    isAuthenticated: !!accessToken,
    signOut: signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
