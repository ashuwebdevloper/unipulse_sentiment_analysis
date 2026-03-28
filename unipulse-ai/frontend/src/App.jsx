import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Compare from "./pages/Compare";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import About from "./components/About";

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/"        element={<Dashboard />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}