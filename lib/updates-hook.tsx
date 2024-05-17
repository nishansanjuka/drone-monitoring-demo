"use client";
import React from "react";

interface UpdatesContextType {
  update: boolean;
  setUpdates: (state: boolean) => void;
}

const UpdatesContext = React.createContext<UpdatesContextType>({
  update: false,
  setUpdates: () => {},
});

export function useUpdates() {
  const context = React.useContext(UpdatesContext);

  if (!context) {
    throw new Error("useWallet must be used within an UpdatesProvider");
  }

  return context;
}

export function UpdatesProvider({ children }: { children: React.ReactNode }) {
  const [update, setUpdate] = React.useState<boolean>(false);

  const setUpdates = (state: boolean) => {
    setUpdate(state);
  };
  return (
    <UpdatesContext.Provider value={{ update, setUpdates }}>
      {children}
    </UpdatesContext.Provider>
  );
}
