import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost"
      style={{
        padding: "8px 12px",
        borderRadius: "var(--radius-md)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 14,
        transition: "all var(--transition-fast)",
      }}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        <>
          <span style={{ fontSize: 18 }}>☀️</span>
          <span style={{ display: "none" }}>Light</span>
        </>
      ) : (
        <>
          <span style={{ fontSize: 18 }}>🌙</span>
          <span style={{ display: "none" }}>Dark</span>
        </>
      )}
    </button>
  );
}
