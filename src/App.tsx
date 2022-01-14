import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import EncounterCreation from "./pages/EncounterCreation";
import EncounterList from "./pages/EncounterList";
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
