import React from "react";
import { Engine } from "@src/core/Engine";

const EngineContext = React.createContext<Engine | undefined>(undefined);

const useEngineContext = (): Engine => {
  const engineContext = React.useContext(EngineContext);

  if (!engineContext)
    throw new Error("No Engine.Provider found when calling useEngineContext.");

  return engineContext;
};

const EngineContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const engine = React.useMemo(() => new Engine(), []);

  return (
    <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>
  );
};

export { EngineContext, EngineContextProvider, useEngineContext };
