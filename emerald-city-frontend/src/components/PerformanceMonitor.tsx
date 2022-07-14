import styled from "@emotion/styled";
import { useEngineContext } from "@src/contexts/EngineContext";
import React from "react";

const PerformanceMonitorContainer = styled.div`
  width: max-content;
  height: max-content;
  position: absolute;
  z-index: 99;

  top: 18vh;
  left: 1rem;

  user-select: none;

  color: lightgreen;
  font-size: smaller;
`;

const PerformanceMonitor = () => {
  const [frameTime, setFrameTime] = React.useState<number>(0);
  const engine = useEngineContext();

  React.useEffect(() => {
    const intervalID = setInterval(() => setFrameTime(engine.delta), 100);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <PerformanceMonitorContainer>{`${(
      1000 / frameTime
    ).toFixed()} FPS`}</PerformanceMonitorContainer>
  );
};

export default PerformanceMonitor;
