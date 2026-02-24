import { motion, AnimatePresence } from "framer-motion";

const MONO = "'Victor Mono', monospace";

function PropRow({ text, color }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "9px 12px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        fontSize: 11,
        fontFamily: MONO,
        color: "rgba(255,255,255,0.75)",
        lineHeight: 1.6,
        letterSpacing: "0.02em",
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          background: color,
          flexShrink: 0,
          marginTop: 5,
          display: "inline-block",
        }}
      />
      {text}
    </li>
  );
}

function Section({ label, accentColor, items }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          fontSize: 8,
          fontFamily: MONO,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: accentColor,
          marginBottom: 8,
          paddingBottom: 6,
          borderBottom: `1px solid ${accentColor}25`,
        }}
      >
        — {label}
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
          >
            <PropRow text={item} color={accentColor} />
          </motion.div>
        ))}
      </ul>
    </div>
  );
}

export default function DetailPanel({ stakeholder, selectedSubId, onSubChange, onClose }) {
  const activeSub = selectedSubId
    ? stakeholder?.subcategories?.find((s) => s.id === selectedSubId)
    : null;

  const accentColor = activeSub?.color ?? stakeholder?.color ?? "#8b9aff";
  const displayProvides = activeSub?.provides ?? stakeholder?.provides ?? [];
  const displayGets = activeSub?.gets ?? stakeholder?.gets ?? [];
  const displayTagline = activeSub?.tagline ?? stakeholder?.tagline ?? "";

  return (
    <AnimatePresence>
      {stakeholder && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              zIndex: 40,
            }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: 400,
              height: "100vh",
              background: "#0c0c0c",
              borderLeft: `1px solid rgba(255,255,255,0.07)`,
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "24px 24px 20px",
                borderBottom: `1px solid rgba(255,255,255,0.06)`,
                background: `linear-gradient(135deg, ${accentColor}08, transparent)`,
                position: "relative",
              }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.35)",
                  cursor: "pointer",
                  width: 26,
                  height: 26,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontFamily: MONO,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#f7f7f7";
                  e.target.style.borderColor = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "rgba(255,255,255,0.35)";
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                ×
              </button>

              {/* Color accent bar */}
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: accentColor,
                  marginBottom: 14,
                  boxShadow: `0 0 8px ${accentColor}80`,
                  transition: "background 0.25s, box-shadow 0.25s",
                }}
              />

              {/* Breadcrumb: parent / sub or just parent */}
              {activeSub ? (
                <div style={{ marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: MONO,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: `${stakeholder.color}60`,
                    }}
                  >
                    {stakeholder.label}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: MONO,
                      color: "rgba(255,255,255,0.2)",
                      margin: "0 8px",
                    }}
                  >
                    /
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      fontFamily: MONO,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: accentColor,
                    }}
                  >
                    {activeSub.label}
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    fontSize: 18,
                    fontFamily: MONO,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: accentColor,
                    marginBottom: 6,
                    transition: "color 0.25s",
                  }}
                >
                  {stakeholder.label}
                </div>
              )}

              <div
                style={{
                  fontSize: 10,
                  fontFamily: MONO,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.06em",
                  lineHeight: 1.6,
                  transition: "opacity 0.25s",
                }}
              >
                {displayTagline}
              </div>

              {/* Subcategory selector chips — shown when stakeholder has subs */}
              {stakeholder.subcategories?.length > 0 && (
                <div style={{ display: "flex", gap: 5, marginTop: 14, flexWrap: "wrap" }}>
                  {stakeholder.subcategories.map((sub) => {
                    const isFocused = selectedSubId === sub.id;
                    return (
                      <div
                        key={sub.id}
                        style={{
                          fontSize: 8,
                          fontFamily: MONO,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "3px 9px",
                          border: `1px solid ${isFocused ? sub.color + "90" : "rgba(255,255,255,0.1)"}`,
                          background: isFocused ? `${sub.color}15` : "transparent",
                          color: isFocused ? sub.color : "rgba(255,255,255,0.3)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => onSubChange?.(sub.id)}
                      >
                        {sub.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Provides / Gets */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              <Section
                label="Provides"
                accentColor={accentColor}
                items={displayProvides}
              />
              <Section
                label="Gets"
                accentColor="#8b9aff"
                items={displayGets}
              />
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "14px 24px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <button
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  background: "transparent",
                  border: `1px solid ${accentColor}60`,
                  color: accentColor,
                  cursor: "pointer",
                  fontSize: 9,
                  fontFamily: MONO,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = `${accentColor}12`)
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                View Package Details →
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
