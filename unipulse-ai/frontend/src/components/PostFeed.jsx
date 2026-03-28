export default function PostFeed({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "40px 20px",
        color: "var(--text-muted)",
        fontSize: 14,
      }}>
        <div style={{
          fontSize: 48,
          marginBottom: 16,
          opacity: 0.5,
        }}>
          📭
        </div>
        No posts available
      </div>
    );
  }

  const getSentimentColor = (label) => {
    switch (label?.toLowerCase()) {
      case "positive":
        return "var(--accent-success)";
      case "negative":
        return "var(--accent-danger)";
      default:
        return "var(--accent-warning)";
    }
  };

  const getSentimentEmoji = (label) => {
    switch (label?.toLowerCase()) {
      case "positive":
        return "😊";
      case "negative":
        return "😞";
      default:
        return "😐";
    }
  };

  const getSentimentBadge = (label) => {
    switch (label?.toLowerCase()) {
      case "positive":
        return "badge-success";
      case "negative":
        return "badge-danger";
      default:
        return "badge-warning";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {posts.map((post, index) => (
        <div
          key={post.id || index}
          className="card animate-fade-in"
          style={{
            padding: 20,
            animationDelay: `${index * 50}ms`,
            cursor: "pointer",
          }}
          onClick={() => post.url && window.open(post.url, "_blank")}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: "var(--radius-md)",
              background: `linear-gradient(135deg, ${getSentimentColor(post.label)}20, ${getSentimentColor(post.label)}10)`,
              border: `2px solid ${getSentimentColor(post.label)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              flexShrink: 0,
            }}>
              {getSentimentEmoji(post.label)}
            </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 8,
              }}>
                <h4 style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {post.title}
                </h4>
                <span className={`badge ${getSentimentBadge(post.label)}`}>
                  {post.label || "neutral"}
                </span>
              </div>
              
              {post.body && (
                <p style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  margin: "0 0 12px 0",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {post.body}
                </p>
              )}
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 12,
                color: "var(--text-muted)",
                flexWrap: "wrap",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span>⬆️</span>
                  <span>{post.score || 0}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span>💬</span>
                  <span>{post.comments || 0}</span>
                </div>
                {post.subreddit && (
                  <div style={{
                    padding: "2px 8px",
                    background: "var(--bg-tertiary)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: 11,
                  }}>
                    r/{post.subreddit}
                  </div>
                )}
                {post.compound !== undefined && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginLeft: "auto",
                  }}>
                    <span style={{ color: "var(--text-muted)" }}>Sentiment:</span>
                    <span style={{
                      fontWeight: 700,
                      color: getSentimentColor(post.label),
                    }}>
                      {(post.compound * 100).toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
