export default function Error({ message, onRetry }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      padding: "60px 20px",
      color: "var(--accent-danger)",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 64, opacity: 0.5 }}>⚠️</div>
      <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{message}</h3>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-primary"
          style={{ marginTop: 8 }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
