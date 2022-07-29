import React from "react";
import "./app.css";
import styled from "@emotion/styled";
import { useEngineContext } from "./contexts/EngineContext";
import Sidebar from "@src/components/ui/layout/Sidebar";
import Toolbar from "@src/components/ui/layout/Toolbar";
import PerformanceMonitor from "./components/ui/layout/PerformanceMonitor";
import { setupScene } from "./core/scene/BaseScene";
import { api } from "@backend/types/api/Core";
import { store } from "./app/store";
import { SceneObject, SceneObjectType } from "./core/SceneGraph";
import { replaceMat } from "./core/utils";
import { Engine } from "./core/Engine";
import { dropCallback } from "./util/dropEventHandler";
import Editor from "./pages/Editor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playground from "./pages/Playground";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/play" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
