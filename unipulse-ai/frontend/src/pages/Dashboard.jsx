import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { fetchIITSentiment } from "../api";
import PostFeed from "../components/PostFeed";

const IIT_LIST = [
  "IITBHU", "IITBhubaneswar", "IITBombay", "IITDelhi", "IITISM",
  "IITGandhinagar", "IITGoa", "IITGuwahati", "IITHyderabad", "IITIndore",
  "IITJammu", "IITJodhpur", "IITK", "IITKgp", "IITMadras",
  "IITMandi", "IITPalakkad", "IITPatna", "IITRoorkee", "IITRopar",
  "IITTirupati", "IITBhilai", "IITDharwad"
];

const IIT_INFO = {
  "IITBHU": { full: "IIT BHU", location: "Varanasi, UP", founded: 1919, color: "#eab308" },
  "IITBhubaneswar": { full: "IIT Bhubaneswar", location: "Bhubaneswar, OD", founded: 2008, color: "#3b82f6" },
  "IITBombay": { full: "IIT Bombay", location: "Mumbai, MH", founded: 1958, color: "#f97316" },
  "IITDelhi": { full: "IIT Delhi", location: "New Delhi", founded: 1961, color: "#10b981" },
  "IITISM": { full: "IIT ISM", location: "Dhanbad, JH", founded: 1926, color: "#ec4899" },
  "IITGandhinagar": { full: "IIT Gandhinagar", location: "Gandhinagar, GJ", founded: 2007, color: "#8b5cf6" },
  "IITGoa": { full: "IIT Goa", location: "Goa", founded: 2016, color: "#06b6d4" },
  "IITGuwahati": { full: "IIT Guwahati", location: "Guwahati, AS", founded: 1994, color: "#14b8a6" },
  "IITHyderabad": { full: "IIT Hyderabad", location: "Hyderabad, TG", founded: 2008, color: "#f59e0b" },
  "IITIndore": { full: "IIT Indore", location: "Indore, MP", founded: 2009, color: "#6366f1" },
  "IITJammu": { full: "IIT Jammu", location: "Jammu, JK", founded: 2016, color: "#dc2626" },
  "IITJodhpur": { full: "IIT Jodhpur", location: "Jodhpur, RJ", founded: 2008, color: "#f97316" },
  "IITK": { full: "IIT Kanpur", location: "Kanpur, UP", founded: 1959, color: "#0ea5e9" },
  "IITKgp": { full: "IIT Kharagpur", location: "Kharagpur, WB", founded: 1951, color: "#f43f5e" },
  "IITMadras": { full: "IIT Madras", location: "Chennai, TN", founded: 1959, color: "#0ea5e9" },
  "IITMandi": { full: "IIT Mandi", location: "Mandi, HP", founded: 2009, color: "#22c55e" },
  "IITPalakkad": { full: "IIT Palakkad", location: "Palakkad, KL", founded: 2015, color: "#a855f7" },
  "IITPatna": { full: "IIT Patna", location: "Patna, BR", founded: 2008, color: "#a855f7" },
  "IITRoorkee": { full: "IIT Roorkee", location: "Roorkee, UK", founded: 1854, color: "#14b8a6" },
  "IITRopar": { full: "IIT Ropar", location: "Rupnagar, PB", founded: 2008, color: "#f43f5e" },
  "IITTirupati": { full: "IIT Tirupati", location: "Tirupati, AP", founded: 2015, color: "#10b981" },
  "IITBhilai": { full: "IIT Bhilai", location: "Bhilai, CG", founded: 2016, color: "#f59e0b" },
  "IITDharwad": { full: "IIT Dharwad", location: "Dharwad, KA", founded: 2016, color: "#06b6d4" },
};

const getColor = (score) => score >= 70 ? "var(--accent-success)" : score >= 55 ? "var(--accent-warning)" : "var(--accent-danger)";
const getSentimentLabel = (score) => score >= 70 ? "positive" : score >= 55 ? "neutral" : "negative";

export default function Dashboard() {
  const [selected, setSelected] = useState("IITBombay");
  const [iitData, setIitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchIITSentiment(selected);
        setIitData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load data. Make sure backend is running on localhost:8000");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selected]);

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
        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
          Run: <code style={{ 
            background: "var(--bg-tertiary)", 
            padding: "4px 8px", 
            borderRadius: "var(--radius-sm)",
            fontFamily: "var(--font-mono)",
          }}>python -m uvicorn main:app --reload</code> in backend folder
        </p>
      </div>
    );
  }

  const info = IIT_INFO[selected] || {};
  const color = info.color || "var(--accent-purple)";

  return (
    <div style={{ 
      padding: "32px 20px", 
      background: "var(--bg-primary)", 
      minHeight: "100vh",
    }}>
      <div className="container">
        {/* ── HEADER ── */}
        <div className="animate-fade-in" style={{ marginBottom: 40 }}>
          <h1 style={{ 
            color: "var(--text-primary)", 
            margin: "0 0 12px 0", 
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: -1,
          }}>
            {info.full || selected}
          </h1>
          <div style={{ 
            fontSize: 14, 
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>📍</span>
              <span>{info.location || "India"}</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>🎓</span>
              <span>Founded {info.founded}</span>
            </span>
            <span style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 6,
              padding: "4px 12px",
              background: "var(--bg-tertiary)",
              borderRadius: "var(--radius-full)",
              fontSize: 12,
              fontWeight: 600,
            }}>
              <span>📊</span>
              <span>{iitData?.total_posts || 0} posts analyzed</span>
            </span>
          </div>
        </div>

        {/* ── IIT SELECTOR ── */}
        <div className="animate-fade-in" style={{ 
          marginBottom: 32, 
          display: "flex", 
          flexWrap: "wrap", 
          gap: 8,
          animationDelay: "100ms",
        }}>
          {IIT_LIST.map(iit => (
            <button
              key={iit}
              onClick={() => setSelected(iit)}
              style={{
                background: selected === iit ? IIT_INFO[iit].color : "var(--bg-secondary)",
                border: `1px solid ${selected === iit ? IIT_INFO[iit].color : "var(--border-primary)"}`,
                color: selected === iit ? "#000" : "var(--text-primary)",
                padding: "10px 18px",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                transition: "all var(--transition-fast)",
                boxShadow: selected === iit ? "var(--shadow-md)" : "none",
              }}
              onMouseEnter={(e) => {
                if (selected !== iit) {
                  e.currentTarget.style.background = "var(--bg-tertiary)";
                  e.currentTarget.style.borderColor = "var(--text-secondary)";
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== iit) {
                  e.currentTarget.style.background = "var(--bg-secondary)";
                  e.currentTarget.style.borderColor = "var(--border-primary)";
                }
              }}
            >
              {iit}
            </button>
          ))}
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
            <div style={{ fontSize: 14 }}>Loading {selected} data...</div>
          </div>
        ) : iitData ? (
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            {/* ── OVERALL SENTIMENT ── */}
            <div className="card" style={{
              marginBottom: 32,
              border: `2px solid ${color}`,
              background: `linear-gradient(135deg, var(--bg-secondary), ${color}10)`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: 12, 
                    color: "var(--text-secondary)", 
                    textTransform: "uppercase", 
                    letterSpacing: 1.5,
                    fontWeight: 600,
                    marginBottom: 12,
                  }}>
                    Overall Sentiment
                  </div>
                  <div style={{
                    fontSize: 64,
                    fontWeight: 900,
                    color: getColor(iitData.overall),
                    margin: "12px 0",
                    lineHeight: 1,
                  }}>
                    {iitData.overall}/100
                  </div>
                  <div style={{ 
                    fontSize: 14, 
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}>
                    {getSentimentLabel(iitData.overall)}
                  </div>
                </div>
                <div style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                  border: `3px solid ${color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                  boxShadow: `0 0 40px ${color}40`,
                }}>
                  {iitData.overall >= 70 ? "😊" : iitData.overall >= 55 ? "😐" : "😞"}
                </div>
              </div>
            </div>

            {/* ── CATEGORY BREAKDOWN ── */}
            <div className="card" style={{ marginBottom: 32 }}>
              <h3 style={{ 
                color: "var(--text-primary)", 
                margin: "0 0 24px 0", 
                fontSize: 16,
                fontWeight: 700,
              }}>
                Category Sentiment
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={iitData.categories || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: "var(--text-secondary)", fontSize: 12 }} 
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
                  <Bar 
                    dataKey="score" 
                    fill={color} 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* ── CATEGORY CARDS ── */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
              gap: 16, 
              marginBottom: 32 
            }}>
              {iitData.categories?.map((cat, index) => (
                <div 
                  key={cat.name}
                  className="card animate-fade-in"
                  style={{
                    borderLeft: `4px solid ${getColor(cat.score)}`,
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div style={{ 
                    fontSize: 12, 
                    color: "var(--text-secondary)", 
                    marginBottom: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}>
                    {cat.name}
                  </div>
                  <div style={{ 
                    fontSize: 36, 
                    fontWeight: 900, 
                    color: getColor(cat.score), 
                    marginBottom: 8,
                    lineHeight: 1,
                  }}>
                    {cat.score}/100
                  </div>
                  <div style={{ 
                    fontSize: 12, 
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                    <span>📝</span>
                    <span>{cat.posts || 0} posts</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── TOP POSTS ── */}
            <div className="card">
              <h3 style={{ 
                color: "var(--text-primary)", 
                margin: "0 0 24px 0", 
                fontSize: 16,
                fontWeight: 700,
              }}>
                Top Sentiment Posts
              </h3>
              <PostFeed posts={iitData.top_posts?.map(p => ({
                ...p,
                label: p.compound > 0.5 ? "positive" : p.compound < -0.5 ? "negative" : "neutral",
                subreddit: p.subreddit || selected,
                title: p.title,
              })) || []} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
