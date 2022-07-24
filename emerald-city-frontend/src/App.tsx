import React from "react";
import "./app.css";
import styled from "@emotion/styled";
import { useEngineContext } from "./contexts/EngineContext";
import Sidebar from "@src/components/ui/layout/Sidebar";
import Toolbar from "@src/components/ui/layout/Toolbar";
import PerformanceMonitor from "./components/ui/layout/PerformanceMonitor";
import { setupScene } from "./core/scene/BaseScene";

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  grid-template-columns: 1fr max-content max-content;
  grid-template-rows: 2.5rem 1fr;
  grid-template-areas: "toolbar toolbar toolbar" "canvas dragger sidebar";
`;

const DragArea = styled.div`
  grid-area: dragger;
  background-color: darkgreen;
  height: 100%;
  min-width: 1px;

  :hover & {
    cursor: col-resize;
    width: 2rem;
    color: red;
    overflow: auto;
  }
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
        engine.sceneGraph,
        engine.renderEngine!
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
      <DragArea />
      <Sidebar />
    </RootContainer>
  );
}

export default App;
