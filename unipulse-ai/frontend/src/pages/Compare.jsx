import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { fetchAllIITs } from "../api";

const IIT_INFO = {
  "IITBHU": { full: "IIT BHU", color: "#eab308" },
  "IITBhubaneswar": { full: "IIT Bhubaneswar", color: "#3b82f6" },
  "IITBombay": { full: "IIT Bombay", color: "#f97316" },
  "IITDelhi": { full: "IIT Delhi", color: "#10b981" },
  "IITISM": { full: "IIT ISM", color: "#ec4899" },
  "IITGandhinagar": { full: "IIT Gandhinagar", color: "#8b5cf6" },
  "IITGoa": { full: "IIT Goa", color: "#06b6d4" },
  "IITGuwahati": { full: "IIT Guwahati", color: "#14b8a6" },
  "IITHyderabad": { full: "IIT Hyderabad", color: "#f59e0b" },
  "IITIndore": { full: "IIT Indore", color: "#6366f1" },
  "IITJammu": { full: "IIT Jammu", color: "#dc2626" },
  "IITJodhpur": { full: "IIT Jodhpur", color: "#f97316" },
  "IITK": { full: "IIT Kanpur", color: "#0ea5e9" },
  "IITKgp": { full: "IIT Kharagpur", color: "#f43f5e" },
  "IITMadras": { full: "IIT Madras", color: "#0ea5e9" },
  "IITMandi": { full: "IIT Mandi", color: "#22c55e" },
  "IITPalakkad": { full: "IIT Palakkad", color: "#a855f7" },
  "IITPatna": { full: "IIT Patna", color: "#a855f7" },
  "IITRoorkee": { full: "IIT Roorkee", color: "#14b8a6" },
  "IITRopar": { full: "IIT Ropar", color: "#f43f5e" },
  "IITTirupati": { full: "IIT Tirupati", color: "#10b981" },
  "IITBhilai": { full: "IIT Bhilai", color: "#f59e0b" },
  "IITDharwad": { full: "IIT Dharwad", color: "#06b6d4" },
};

const getColor = (score) => score >= 70 ? "var(--accent-success)" : score >= 55 ? "var(--accent-warning)" : "var(--accent-danger)";

export default function Compare() {
  const [allIITs, setAllIITs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllIITs();
        setAllIITs(data);
        setError(null);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const sorted = [...allIITs].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    return a.iit.localeCompare(b.iit);
  });

  if (error) {
    return (
      <div style={{ 
        padding: "40px 20px", 
        textAlign: "center", 
        color: "var(--accent-danger)", 
        background: "var(--bg-primary)", 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}>
        <div style={{ fontSize: 64, opacity: 0.5 }}>⚠️</div>
        <h3 style={{ fontSize: 20, fontWeight: 700 }}>{error}</h3>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "32px 20px", 
      background: "var(--bg-primary)", 
      minHeight: "100vh",
    }}>
      <div className="container">
        <div className="animate-fade-in">
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ 
              color: "var(--text-primary)", 
              margin: "0 0 12px 0", 
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: -1,
            }}>
              Compare All IITs
            </h1>
            <div style={{ 
              fontSize: 14, 
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span>🏆</span>
              <span>Reddit Sentiment Analysis across all {allIITs.length} IIT institutions</span>
            </div>
          </div>

          {loading ? (
            <div style={{ 
              textAlign: "center", 
              padding: "60px 20px", 
              color: "var(--text-secondary)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}>
              <div className="animate-pulse" style={{ fontSize: 48 }}>⏳</div>
              <div style={{ fontSize: 14 }}>Loading all IIT data...</div>
            </div>
          ) : (
            <>
              {/* Sort Controls */}
              <div className="card" style={{ 
                marginBottom: 32, 
                display: "flex", 
                gap: 12,
                padding: "16px 20px",
              }}>
                <span style={{ 
                  fontSize: 13, 
                  color: "var(--text-secondary)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}>
                  <span>📊</span>
                  <span>Sort by:</span>
                </span>
                <button
                  onClick={() => setSortBy("score")}
                  className={`btn ${sortBy === "score" ? "btn-primary" : "btn-secondary"}`}
                  style={{
                    padding: "8px 16px",
                    fontSize: 12,
                  }}
                >
                  Score
                </button>
                <button
                  onClick={() => setSortBy("name")}
                  className={`btn ${sortBy === "name" ? "btn-primary" : "btn-secondary"}`}
                  style={{
                    padding: "8px 16px",
                    fontSize: 12,
                  }}
                >
                  Name
                </button>
              </div>

              {/* Chart */}
              <div className="card" style={{ marginBottom: 32 }}>
                <h3 style={{ 
                  color: "var(--text-primary)", 
                  margin: "0 0 24px 0", 
                  fontSize: 16,
                  fontWeight: 700,
                }}>
                  Sentiment Scores
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={sorted}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" />
                    <XAxis 
                      dataKey="iit" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100} 
                      tick={{ fill: "var(--text-secondary)", fontSize: 10 }}
                      axisLine={{ stroke: "var(--border-secondary)" }}
                      tickLine={{ stroke: "var(--border-secondary)" }}
                    />
                    <YAxis 
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                      axisLine={{ stroke: "var(--border-secondary)" }}
                      tickLine={{ stroke: "var(--border-secondary)" }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: "var(--bg-secondary)", 
                        border: "1px solid var(--border-primary)", 
                        color: "var(--text-primary)",
                        borderRadius: "var(--radius-md)",
                        boxShadow: "var(--shadow-lg)",
                      }}
                    />
                    <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                      {sorted.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={getColor(entry.score)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Cards Grid */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                gap: 16 
              }}>
                {sorted.map((iit, idx) => {
                  const info = IIT_INFO[iit.iit] || { full: iit.iit };
                  const color = getColor(iit.score);
                  return (
                    <div 
                      key={iit.iit}
                      className="card animate-fade-in"
                      style={{
                        borderTop: `4px solid ${color}`,
                        animationDelay: `${idx * 30}ms`,
                      }}
                    >
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "start", 
                        marginBottom: 16,
                        gap: 12,
                      }}>
                        <div>
                          <div style={{ 
                            fontSize: 16, 
                            fontWeight: 800, 
                            color: "var(--text-primary)",
                            marginBottom: 4,
                          }}>
                            #{idx + 1}
                          </div>
                          <div style={{ 
                            fontSize: 11, 
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            fontWeight: 600,
                          }}>
                            Rank
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ 
                            fontSize: 40, 
                            fontWeight: 900, 
                            color,
                            lineHeight: 1,
                          }}>
                            {iit.score}
                          </div>
                          <div style={{ 
                            fontSize: 10, 
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            fontWeight: 600,
                          }}>
                            Score
                          </div>
                        </div>
                      </div>

                      <div style={{ 
                        marginBottom: 16, 
                        paddingBottom: 16, 
                        borderBottom: "1px solid var(--border-secondary)",
                      }}>
                        <div style={{ 
                          fontSize: 15, 
                          fontWeight: 700, 
                          color: "var(--text-primary)", 
                          marginBottom: 6,
                        }}>
                          {info.full}
                        </div>
                        <div style={{ 
                          fontSize: 12, 
                          color: "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}>
                          <span>📝</span>
                          <span>{iit.posts} posts analyzed</span>
                        </div>
                      </div>

                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between",
                        gap: 12,
                      }}>
                        <div className="progress-bar" style={{ flex: 1 }}>
                          <div 
                            className="progress-bar-fill"
                            style={{
                              width: `${iit.score}%`,
                              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
                            }}
                          />
                        </div>
                        <div style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color,
                        }}>
                          {iit.score >= 70 ? "✅" : iit.score >= 55 ? "😐" : "⚠️"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
