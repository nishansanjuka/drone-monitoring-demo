"use client";
import React from "react";

interface UpdatesContextType {
  updateFarmers: boolean;
  setUpdateFarmers: (state: boolean) => void;
  updateDrones: boolean;
  setUpdateDrones: (state: boolean) => void;
}

const UpdatesContext = React.createContext<UpdatesContextType>({
  updateFarmers: false,
  setUpdateFarmers: () => {},
  updateDrones: false,
  setUpdateDrones: () => {},
});

export function useUpdates() {
  const context = React.useContext(UpdatesContext);

  if (!context) {
    throw new Error("useWallet must be used within an UpdatesProvider");
  }

  return context;
}

export function UpdatesProvider({ children }: { children: React.ReactNode }) {
  const [updateFarmers, setUpdateFarmers] = React.useState<boolean>(false);
  const [updateDrones, setUpdateDrones] = React.useState<boolean>(false);

  const setUpdatesFarmers = (state: boolean) => {
    setUpdateFarmers(state);
  };
  const setUpdatesDrones = (state: boolean) => {
    setUpdateFarmers(state);
  };
  return (
    <UpdatesContext.Provider
      value={{ updateDrones, updateFarmers, setUpdateDrones, setUpdateFarmers }}
    >
      {children}
    </UpdatesContext.Provider>
  );
}
