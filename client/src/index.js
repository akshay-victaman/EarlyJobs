import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from 'react-helmet-async';
import "./index.css";

const container = document.getElementById("root");

hydrateRoot(
  container,
  <React.StrictMode>
    <BrowserRouter>
     <HelmetProvider>
      <App />
      </HelmetProvider>
    </BrowserRouter>

  </React.StrictMode>
);

reportWebVitals();
