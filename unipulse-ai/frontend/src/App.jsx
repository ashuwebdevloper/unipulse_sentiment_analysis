import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Compare from "./pages/Compare";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/"        element={<Dashboard />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}