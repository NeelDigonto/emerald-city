import styled from "@emotion/styled";
import { Toolbar } from "@mui/material";
import PerformanceMonitor from "@src/components/ui/layout/PerformanceMonitor";
import Sidebar from "@src/components/ui/layout/Sidebar";
import { useEngineContext } from "@src/contexts/EngineContext";
import { setupScene } from "@src/core/scene/BaseScene";
import { dropCallback } from "@src/util/dropEventHandler";
import React from "react";

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  :focus {
    outline: none;
  }
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

const Playground = () => {
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
      <CanvasContainer
        ref={canvasContainerRef}
        onDrop={dropCallback.bind(null, engine)}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
        }}
      >
        <PerformanceMonitor />
        <Canvas tabIndex={1} ref={canvasRef} />
      </CanvasContainer>
    </RootContainer>
  );
};

export default Playground;
