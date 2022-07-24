import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "@src/app/store";
import "normalize.css";
import { EngineContextProvider } from "./contexts/EngineContext";
import DataLoader from "./components/DataLoader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <EngineContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DataLoader>
            <App />
          </DataLoader>
        </ThemeProvider>
      </EngineContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
