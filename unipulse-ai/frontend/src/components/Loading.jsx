export default function Loading({ message = "Loading..." }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      padding: "60px 20px",
      color: "var(--text-secondary)",
    }}>
      <div className="animate-pulse" style={{ fontSize: 48 }}>⏳</div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{message}</div>
    </div>
  );
}
