import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  // Helper function to keep the JSX clean, since the styles are identical for all links
  const getLinkStyle = (path) => ({
    color: isActive(path) ? "var(--accent-primary)" : "var(--text-secondary)",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 600,
    padding: "8px 16px",
    borderRadius: "var(--radius-md)",
    transition: "all var(--transition-fast)",
    background: isActive(path) ? "rgba(88, 166, 255, 0.1)" : "transparent",
  });

  const handleMouseEnter = (e, path) => {
    if (!isActive(path)) {
      e.target.style.background = "var(--bg-tertiary)";
      e.target.style.color = "var(--text-primary)";
    }
  };

  const handleMouseLeave = (e, path) => {
    if (!isActive(path)) {
      e.target.style.background = "transparent";
      e.target.style.color = "var(--text-secondary)";
    }
  };

  return (
    <nav style={{
      background: "var(--bg-secondary)",
      borderBottom: "1px solid var(--border-secondary)",
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(10px)",
      background: "rgba(var(--bg-secondary), 0.95)",
    }}>
      <Link 
        to="/"
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: "var(--text-primary)",
          fontFamily: "var(--font-mono)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
        }}
      >
        <span style={{
          fontSize: 24,
          background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          ⚡
        </span>
        UniPulse
        <span style={{
          color: "var(--accent-secondary)",
          fontSize: 18,
        }}>
          AI
        </span>
      </Link>
      
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Link 
          to="/"
          style={getLinkStyle("/")}
          onMouseEnter={(e) => handleMouseEnter(e, "/")}
          onMouseLeave={(e) => handleMouseLeave(e, "/")}
        >
          Dashboard
        </Link>

        <Link 
          to="/compare"
          style={getLinkStyle("/compare")}
          onMouseEnter={(e) => handleMouseEnter(e, "/compare")}
          onMouseLeave={(e) => handleMouseLeave(e, "/compare")}
        >
          Compare
        </Link>

        {/* Added About Link */}
        <Link 
          to="/about"
          style={getLinkStyle("/about")}
          onMouseEnter={(e) => handleMouseEnter(e, "/about")}
          onMouseLeave={(e) => handleMouseLeave(e, "/about")}
        >
          About
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  );
}