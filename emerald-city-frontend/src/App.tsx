import React from "react";
import "./app.css";
import styled from "@emotion/styled";
import { useEngineContext } from "./contexts/EngineContext";

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Toolbar = styled.nav`
  width: 100%;
  height: 2.5rem;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: calc(100vh - 2.5rem);
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
        <Canvas tabIndex={1} ref={canvasRef} />
      </CanvasContainer>
    </RootContainer>
  );
}

export default App;
