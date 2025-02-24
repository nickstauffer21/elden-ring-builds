import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import Layout from "./format/Layout";
import DataProvider from "./Components/WeaponsComp/DataProvider";
import Builds from "./pages/Builds/Builds";
import Weapons from "./pages/Weapons/Weapons";
import SavedBuilds from "./pages/Builds/SavedBuilds";
import BuildStateProvider from "./pages/Builds/BuildStateProvider";

function Main() {
  return (
    <DataProvider>
      <BuildStateProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="builds" element={<Builds />} />
              <Route path="saved-builds" element={<SavedBuilds />} />
              <Route path="weapons" element={<Weapons />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BuildStateProvider>
    </DataProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
