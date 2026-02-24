import { Building2, Hexagon, Landmark, TrendingUp, Wrench, Users } from "lucide-react";

const ICON_MAP = {
  enterprise: Building2,
  web3: Hexagon,
  govs: Landmark,
  vc: TrendingUp,
  serviceProviders: Wrench,
  creators: Users,
};

const MONO = "'Victor Mono', monospace";

export default function StakeholderNode({ stakeholder, isSelected, isGrayedOut, onClick, selectedSubId, onSubSelect, floatDelay = 0 }) {
  const { id, color, label, subcategories } = stakeholder;
  const Icon = ICON_MAP[id];
  const hasSubs = subcategories?.length > 0;

  return (
    <div
      onClick={onClick}
      style={{
        width: 130,
        height: hasSubs ? 84 : 66,
        background: isSelected ? `${color}10` : "rgba(255,255,255,0.03)",
        border: `1px solid ${isSelected ? color + "90" : "rgba(255,255,255,0.1)"}`,
        boxShadow: isSelected
          ? `0 0 0 1px ${color}30, 0 0 24px ${color}25`
          : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: hasSubs ? "flex-start" : "center",
        paddingTop: hasSubs ? 10 : 0,
        gap: 5,
        cursor: "pointer",
        opacity: isGrayedOut ? 0.15 : 1,
        backdropFilter: "blur(8px)",
        transition: "opacity 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
        userSelect: "none",
        padding: hasSubs ? "10px 8px 8px" : "8px 10px",
        boxSizing: "border-box",
        animation: `floatNode ${2.8 + floatDelay * 0.12}s ease-in-out ${floatDelay}s infinite`,
      }}
    >
      {/* Icon + label row */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {Icon && (
          <Icon
            size={13}
            color={isSelected ? color : "rgba(255,255,255,0.3)"}
            style={{ transition: "color 0.25s", flexShrink: 0 }}
          />
        )}
        <div
          style={{
            fontSize: 9,
            fontFamily: MONO,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: isSelected ? color : "rgba(255,255,255,0.4)",
            lineHeight: 1.2,
            transition: "color 0.25s",
          }}
        >
          {label}
        </div>
      </div>

      {/* Subcategory badges */}
      {hasSubs && (
        <div
          style={{
            display: "flex",
            gap: 4,
            marginTop: 4,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {subcategories.map((sub) => {
            const isFocused = selectedSubId === sub.id;
            return (
              <div
                key={sub.label}
                onClick={(e) => {
                  e.stopPropagation();
                  onSubSelect?.(sub.id);
                }}
                style={{
                  fontSize: 7,
                  fontFamily: MONO,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isFocused
                    ? sub.color
                    : isSelected
                    ? sub.color + "bb"
                    : "rgba(255,255,255,0.22)",
                  border: `1px solid ${
                    isFocused
                      ? sub.color + "90"
                      : isSelected
                      ? sub.color + "40"
                      : "rgba(255,255,255,0.08)"
                  }`,
                  background: isFocused ? `${sub.color}18` : "transparent",
                  padding: "1px 5px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  whiteSpace: "nowrap",
                  boxShadow: isFocused ? `0 0 6px ${sub.color}40` : "none",
                }}
              >
                {sub.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
