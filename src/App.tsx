import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./views/Layout";
import EncounterCreation from "./views/EncounterCreation";
import EncounterList from "./views/EncounterList";
import { EncounterCreationProvider } from "./context/EncounterCreationContext";
import { AlertContextProvider } from "./context/AlertContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AlertContextProvider>
          <EncounterCreationProvider>
            <Layout />
            <Routes>
              <Route path="/" element={<EncounterCreation />} />
              <Route path="/encounterList" element={<EncounterList />} />
            </Routes>
          </EncounterCreationProvider>
        </AlertContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
