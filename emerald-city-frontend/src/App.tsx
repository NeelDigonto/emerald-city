import React from "react";
import "./app.css";
import styled from "@emotion/styled";
import { useEngineContext } from "./contexts/EngineContext";

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
`;

const Sidebar = styled.nav`
  width: 100%;
  height: 100%;
  grid-area: sidebar;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  :focus {
    outline: none;
  }
  grid-area: canvas;
`;

const PerformanceMonitor = styled.div`
  width: min-content;
  height: min-content;
  position: absolute;
  z-index: 99;
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

  return (
    <RootContainer>
      <Toolbar />
      <CanvasContainer ref={canvasContainerRef}>
        <PerformanceMonitor>60fps</PerformanceMonitor>
        <Canvas tabIndex={1} ref={canvasRef} />
      </CanvasContainer>
      <Sidebar />
    </RootContainer>
  );
}

export default App;
