import React, { useState, useEffect, createContext } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  // Fetch the user data from the API (/api/me/profile)
  // When the data is received, update currentUser.
  // Also, set `status` to `idle`

  useEffect(() => {
    fetch("/api/me/profile")
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data.profile);
        setStatus("idle");
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status, setStatus }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
