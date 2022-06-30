import React, { createContext, useState, useEffect } from "react";
const UserContext = createContext({
  user: "",
  setUserInfo: () => {},
  logout: () => {},
});

const UserProvider = (props) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ username: "", jwt: "", role: "" });

  useEffect(() => {
    const username =
      props.user.username || window.localStorage.getItem("username");
    const jwt = props.user.jwt || window.localStorage.getItem("jwt");
    const role = props.user.role || window.localStorage.getItem("role");
    if (username && jwt) {
      setUser({
        username: username,
        jwt: jwt,
        role: role,
      });
    }
  }, []);

  // Login updates the user data with a name parameter
  const setUserInfo = (name, jwt, role) => {
    setUser((user) => ({
      username: name,
      jwt: jwt,
      role: role,
    }));
    window.localStorage.setItem("username", name);
    window.localStorage.setItem("jwt", jwt);
    window.localStorage.setItem("role", role);
  };
  // Get Logged in User info
  const getUserInfo = () => {
    return window.localStorage.getItem("jwt");
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      username: "",
      jwt: "",
      role: "",
    }));
    window.localStorage.setItem("username", "");
    window.localStorage.setItem("jwt", "");
    window.localStorage.setItem("role", "");
  };
  return (
    <UserContext.Provider value={{ user, setUserInfo, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
