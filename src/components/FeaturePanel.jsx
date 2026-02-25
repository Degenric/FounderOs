import { motion, AnimatePresence } from "framer-motion";
import { Building2, Hexagon, Landmark, TrendingUp, Wrench, Sparkles, Users } from "lucide-react";
import { STAKEHOLDERS } from "../data/ecosystem.js";
import EditableText from "./EditableText.jsx";
import { useEdit } from "../context/EditContext.jsx";

const MONO = "'Victor Mono', monospace";

// Includes "founders" as a pseudo-stakeholder for display purposes
const ALL_NODES = [
  ...STAKEHOLDERS,
  {
    id: "founders",
    label: "Startups",
    color: "#8b9aff",
    icon: "Users",
  },
];

const ICON_MAP = {
  enterprise: Building2,
  web3: Hexagon,
  govs: Landmark,
  vc: TrendingUp,
  serviceProviders: Wrench,
  creators: Sparkles,
  founders: Users,
};

function SectionLabel({ label, color }) {
  return (
    <div
      style={{
        fontSize: 8,
        fontFamily: MONO,
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color,
        marginBottom: 10,
        paddingBottom: 6,
        borderBottom: `1px solid ${color}22`,
      }}
    >
      — {label}
    </div>
  );
}

export default function FeaturePanel({ feature, accentColor, onClose, onFeatureChange, isMobile }) {
  const { isEditing } = useEdit();

  const selectedIds = feature?.stakeholders ?? [];
  const involvedNodes = selectedIds
    .map((id) => ALL_NODES.find((s) => s.id === id))
    .filter(Boolean);

  function toggleStakeholder(nodeId) {
    const current = feature?.stakeholders ?? [];
    const next = current.includes(nodeId)
      ? current.filter((id) => id !== nodeId)
      : [...current, nodeId];
    onFeatureChange?.(feature.id, "stakeholders", next);
  }

  return (
    <AnimatePresence>
      {feature && (
        <>
          {/* Backdrop — desktop only */}
          {!isMobile && (
            <motion.div
              key="feat-backdrop"
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
          )}

          {/* Panel */}
          <motion.div
            key="feat-panel"
            initial={isMobile ? { opacity: 0, y: 16 } : { x: "100%" }}
            animate={isMobile ? { opacity: 1, y: 0 } : { x: 0 }}
            exit={isMobile ? { opacity: 0, y: 16 } : { x: "100%" }}
            transition={isMobile ? { duration: 0.22 } : { type: "spring", stiffness: 320, damping: 32 }}
            style={isMobile ? {
              width: "100%",
              background: "#0c0c0c",
              borderTop: `1px solid ${accentColor}30`,
              marginTop: 12,
            } : {
              position: "fixed",
              top: 0,
              right: 0,
              width: 420,
              height: "100vh",
              background: "#0c0c0c",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: isMobile ? "16px 16px 14px" : "24px 24px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: `linear-gradient(135deg, ${accentColor}08, transparent)`,
                position: "relative",
              }}
            >
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
                  e.currentTarget.style.color = "#f7f7f7";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                ×
              </button>

              {/* Accent bar */}
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: accentColor,
                  marginBottom: 14,
                  boxShadow: `0 0 8px ${accentColor}80`,
                }}
              />

              <EditableText
                value={feature.label}
                onChange={(val) => onFeatureChange?.(feature.id, "label", val)}
                style={{ fontSize: 18, fontFamily: MONO, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accentColor, marginBottom: 6 }}
                tag="div"
              />

              <EditableText
                value={feature.desc}
                onChange={(val) => onFeatureChange?.(feature.id, "desc", val)}
                style={{ fontSize: 10, fontFamily: MONO, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em", lineHeight: 1.7 }}
                tag="div"
              />
            </div>

            {/* Scrollable body */}
            <div style={isMobile ? { padding: "16px 16px 24px" } : { flex: 1, overflowY: "auto", padding: "22px 24px" }}>

              {/* Key Stakeholders */}
              <div style={{ marginBottom: 26 }}>
                <SectionLabel
                  label={isEditing ? "Key Stakeholders — click to toggle" : "Key Stakeholders"}
                  color={accentColor}
                />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {(isEditing ? ALL_NODES : involvedNodes).map((node, i) => {
                    const Icon = ICON_MAP[node.id];
                    const active = selectedIds.includes(node.id);
                    return (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.22 }}
                        onClick={isEditing ? () => toggleStakeholder(node.id) : undefined}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "5px 11px",
                          border: isEditing
                            ? `1px solid ${active ? node.color + "90" : "rgba(255,255,255,0.12)"}`
                            : `1px solid ${node.color}50`,
                          background: isEditing
                            ? active ? `${node.color}18` : "transparent"
                            : `${node.color}0d`,
                          fontSize: 9,
                          fontFamily: MONO,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: isEditing
                            ? active ? node.color : "rgba(255,255,255,0.25)"
                            : node.color,
                          cursor: isEditing ? "pointer" : "default",
                          opacity: isEditing && !active ? 0.55 : 1,
                          transition: "all 0.18s ease",
                        }}
                      >
                        {Icon && <Icon size={10} color={isEditing && !active ? "rgba(255,255,255,0.25)" : node.color} />}
                        {node.label}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* How it works */}
              <div style={{ marginBottom: 26 }}>
                <SectionLabel label="How it works" color="rgba(255,255,255,0.3)" />
                <EditableText
                  value={feature.how}
                  onChange={(val) => onFeatureChange?.(feature.id, "how", val)}
                  style={{ fontSize: 11, fontFamily: MONO, color: "rgba(255,255,255,0.58)", lineHeight: 1.9, letterSpacing: "0.02em" }}
                  tag="p"
                />
              </div>

              {/* Platform Preview */}
              <div>
                <SectionLabel label="Platform Preview" color="rgba(255,255,255,0.3)" />
                {feature.screenshot ? (
                  <img
                    src={feature.screenshot}
                    alt={feature.label}
                    style={{
                      width: "100%",
                      display: "block",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${accentColor}20`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                    }}
                  >
                    {/* Minimalist placeholder icon */}
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect x="1" y="1" width="34" height="34" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" />
                      <rect x="7" y="13" width="22" height="2" fill={accentColor} fillOpacity="0.25" />
                      <rect x="7" y="18" width="16" height="2" fill={accentColor} fillOpacity="0.2" />
                      <rect x="7" y="23" width="19" height="2" fill={accentColor} fillOpacity="0.15" />
                      <rect x="7" y="7" width="8" height="4" fill={accentColor} fillOpacity="0.35" />
                    </svg>
                    <div
                      style={{
                        fontSize: 8,
                        fontFamily: MONO,
                        color: "rgba(255,255,255,0.15)",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }}
                    >
                      Screenshot coming soon
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
