import "./app.css";

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
