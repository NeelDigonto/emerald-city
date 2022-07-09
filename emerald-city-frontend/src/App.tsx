import React from "react";
import "./app.css";
import styled from "@emotion/styled";
import { useEngineContext } from "./contexts/EngineContext";
import Sidebar from "./components/Sidebar";

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  grid-template-columns: 1fr 18rem;
  grid-template-rows: 2.5rem 1fr;
  grid-template-areas: "toolbar toolbar" "canvas sidebar";
`;

const Toolbar = styled.nav`
  width: 100%;
  height: 100%;
  grid-area: toolbar;

  border-bottom: green 1px solid;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  :focus {
    outline: none;
  }
  grid-area: canvas;
`;

const PerformanceMonitor = styled.div`
  width: max-content;
  height: max-content;
  position: absolute;
  z-index: 99;

  top: 18vh;
  left: 1rem;

  color: lightgreen;
  font-size: smaller;
`;

const Canvas = styled.canvas`
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;

  :focus {
    outline: none;
  }
`;

function App() {
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [frameTime, setFrameTime] = React.useState<number>(0);

  let engine = useEngineContext();

  React.useEffect(() => {
    if (
      engine &&
      canvasContainerRef.current &&
      canvasRef.current &&
      !engine.isDomRenderTargetAttached
    ) {
      engine.attachDomRenderTarget(
        canvasContainerRef.current,
        canvasRef.current
      );
    }
  }, [engine, canvasContainerRef.current, canvasRef.current]);

  React.useEffect(() => {
    if (engine.isDomRenderTargetAttached) engine.play();
  }, [engine.isDomRenderTargetAttached]);

  React.useEffect(() => {
    const intervalID = setInterval(() => setFrameTime(engine.delta), 100);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <RootContainer>
      <Toolbar></Toolbar>
      <CanvasContainer ref={canvasContainerRef}>
        <PerformanceMonitor>{`${(
          1 / frameTime
        ).toFixed()} FPS`}</PerformanceMonitor>
        <Canvas tabIndex={1} ref={canvasRef} />
      </CanvasContainer>
      <Sidebar />
    </RootContainer>
  );
}

export default App;
