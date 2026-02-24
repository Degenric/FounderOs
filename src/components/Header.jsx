const MONO = "'Victor Mono', monospace";

export default function Header({ selectedId, onClear }) {
  return (
    <header
      style={{
        background: "rgba(12,12,12,0.97)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo mark + wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="7" fill="#8b9aff" />
          <circle
            cx="18" cy="18" r="14"
            stroke="#8b9aff"
            strokeWidth="1.5"
            strokeDasharray="52 20"
            strokeLinecap="square"
          />
        </svg>
        <div>
          <div
            style={{
              fontSize: 15,
              fontFamily: MONO,
              fontWeight: 700,
              color: "#f7f7f7",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Founders OS
          </div>
          <div
            style={{
              fontSize: 9,
              fontFamily: MONO,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: 1,
            }}
          >
            Ecosystem Dashboard
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div
        style={{
          fontSize: 9,
          fontFamily: MONO,
          color: selectedId ? "#8b9aff" : "rgba(255,255,255,0.2)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "color 0.3s",
        }}
      >
        {selectedId && (
          <span
            style={{
              width: 5,
              height: 5,
              background: "#8b9aff",
              display: "inline-block",
              animation: "none",
            }}
          />
        )}
        {selectedId
          ? "Focus active — ESC to clear"
          : "Select a stakeholder"}
      </div>

      {/* Right badge */}
      <div
        style={{
          fontSize: 9,
          fontFamily: MONO,
          color: "rgba(255,255,255,0.25)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "5px 14px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Pitch Deck Mode
      </div>
    </header>
  );
}
