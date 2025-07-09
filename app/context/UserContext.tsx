"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type UserContextType = {
  isOpen: boolean;
  isCollapse: number;
  setUserDetails: (
    details:
      | Partial<UserContextType>
      | ((prev: UserContextType) => UserContextType)
  ) => void;
};

const defaultUserContext: UserContextType = {
  isOpen: true,
  isCollapse: 0,
  setUserDetails: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetailsState] =
    useState<UserContextType>(defaultUserContext);

  useEffect(() => {
    const savedUserData = JSON.parse(
      localStorage.getItem("userDetails") || "{}"
    );
    setUserDetailsState((prev) => ({ ...prev, ...savedUserData }));
  }, []);

  const setUserDetails = (
    update:
      | Partial<UserContextType>
      | ((prev: UserContextType) => UserContextType)
  ) => {
    setUserDetailsState((prev) => {
      const newState =
        typeof update === "function" ? update(prev) : { ...prev, ...update };

      if (JSON.stringify(newState) !== JSON.stringify(prev)) {
        localStorage.setItem("userDetails", JSON.stringify(newState));
        return newState;
      }

      return prev;
    });
  };

  return (
    <UserContext.Provider value={{ ...userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
