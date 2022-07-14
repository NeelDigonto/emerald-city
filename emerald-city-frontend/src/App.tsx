import React from "react";
import "./app.css";
import styled from "@emotion/styled";
import { useEngineContext } from "./contexts/EngineContext";
import Sidebar from "@src/components/Sidebar";
import Toolbar from "@src/components/Toolbar";
import PerformanceMonitor from "./components/PerformanceMonitor";
import { setupScene } from "./core/scene/BaseScene";

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  grid-template-columns: 1fr 18rem;
  grid-template-rows: 2.5rem 1fr;
  grid-template-areas: "toolbar toolbar" "canvas sidebar";
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

  const engine = useEngineContext();

  React.useEffect(() => {
    if (
      engine &&
      canvasContainerRef.current &&
      canvasRef.current &&
      engine.renderEngine === null
    ) {
      engine.initializeRenderEngine(
        canvasContainerRef.current,
        canvasRef.current
      );

      engine.play();

      setupScene(
        engine.renderEngine!.mainScene,
        engine.renderEngine!.camera,
        engine.sceneGraph
      );
    }
  }, [engine, canvasContainerRef.current, canvasRef.current]);

  return (
    <RootContainer>
      <Toolbar></Toolbar>
      <CanvasContainer ref={canvasContainerRef}>
        <PerformanceMonitor />
        <Canvas tabIndex={1} ref={canvasRef} />
      </CanvasContainer>
      <Sidebar />
    </RootContainer>
  );
}

export default App;
