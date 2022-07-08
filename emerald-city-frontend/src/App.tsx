import React from "react";
import "./app.css";
import styled from "@emotion/styled";
import { useEngineContext } from "./contexts/EngineContext";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Canvas = styled.canvas`
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;

  cursor: none;
`;

function App() {
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  let engine = useEngineContext();

  React.useEffect(() => {
    if (engine && canvasContainerRef.current && canvasRef.current) {
      engine.attachDomRenderTarget(
        canvasContainerRef.current,
        canvasRef.current
      );
    }
    return () => engine.detachDomRenderTarget();
  }, [engine, canvasContainerRef.current, canvasRef.current]);

  React.useEffect(() => {
    if (engine.isDomRenderTargetAttached) engine.play();
  }, [engine.isDomRenderTargetAttached]);

  return (
    <CanvasContainer tabIndex={1} ref={canvasContainerRef}>
      <Canvas ref={canvasRef} />
    </CanvasContainer>
  );
}

export default App;
