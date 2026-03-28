export default function StatCard({ label, value, change, icon, color = "var(--accent-primary)" }) {
  const isPositive = change >= 0;
  
  return (
    <div className="stat-card">
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        marginBottom: 8,
      }}>
        <span className="stat-label">{label}</span>
        {icon && <span style={{ fontSize: 24 }}>{icon}</span>}
      </div>
      <div className="stat-value" style={{ color }}>
        {value}
      </div>
      {change !== undefined && (
        <div className={`stat-change ${isPositive ? "positive" : "negative"}`}>
          <span>{isPositive ? "↑" : "↓"}</span>
          <span>{Math.abs(change)}%</span>
        </div>
      )}
    </div>
  );
}
