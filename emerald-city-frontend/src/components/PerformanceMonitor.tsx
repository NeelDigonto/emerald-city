import styled from "@emotion/styled";
import { useEngineContext } from "@src/contexts/EngineContext";
import React from "react";

const PerformanceMonitorContainer = styled.div`
  width: auto;
  height: auto;
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
  const [fps, setFPS] = React.useState<number>(0);
  const engine = useEngineContext();

  React.useEffect(() => {
    const intervalID = setInterval(() => {
      setFPS(1000 / engine.renderEngine!.delta);
      setFrameTime(engine.renderEngine!.lastFrameRenderTime);
    }, 500);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <PerformanceMonitorContainer>
      {`${fps.toFixed()} FPS`}
      <br />
      {`${frameTime.toPrecision(2)} ms`}
    </PerformanceMonitorContainer>
  );
};

export default PerformanceMonitor;
