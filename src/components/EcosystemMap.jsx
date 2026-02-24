import { STAKEHOLDERS, CORE_FEATURES, MEDIA_ITEMS, IRL_ITEMS } from "../data/ecosystem.js";
import StakeholderNode from "./StakeholderNode.jsx";

const CX = 500;
const CY = 340;
const RADIUS = 270;

const MONO = "'Victor Mono', monospace";

// The three center blocks — new layout:
//   [Media Arm vertical] | [Founders OS  ]
//   [    (tall)        ] | [Accelerator  ]
const BLOCKS = [
  {
    id: "media",
    title: "Media Arm",
    accentColor: "#f87171",
    x: 340, y: 158, w: 108, h: 338,
    vertical: true,
  },
  {
    id: "os",
    title: "Founders OS",
    accentColor: "#8b9aff",
    x: 455, y: 158, w: 205, h: 172,
    vertical: false,
  },
  {
    id: "irl",
    title: "Accelerator",
    accentColor: "#fbbf24",
    x: 455, y: 338, w: 205, h: 158,
    vertical: false,
  },
];

const LOGO_URL = "https://static.tildacdn.one/tild6165-6663-4236-b436-616633316236/1.png";

const FLOAT_DELAYS = {
  enterprise: 0,
  web3: 0.7,
  govs: 1.4,
  vc: 2.1,
  serviceProviders: 2.8,
  creators: 3.5,
};

function polarToXY(deg, r = RADIUS) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function CenterBlock({ block, items, highlightedIds, hasSelection, onFeatureSelect, selectedFeatureId }) {
  const { title, accentColor, x, y, w, h, vertical } = block;
  const isBlockLit = hasSelection && highlightedIds.length > 0;

  return (
    <foreignObject x={x} y={y} width={w} height={h + 20} style={{ overflow: "visible" }}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          width: w + "px",
          height: h + "px",
          background: `linear-gradient(rgba(12,12,12,0.88), rgba(12,12,12,0.88)), url('${LOGO_URL}') center/cover no-repeat`,
          border: `1px solid ${isBlockLit ? accentColor + "50" : "rgba(255,255,255,0.07)"}`,
          padding: "13px 12px",
          backdropFilter: "blur(12px)",
          transition: "border-color 0.3s, box-shadow 0.3s",
          boxShadow: isBlockLit
            ? `0 0 28px ${accentColor}12, inset 0 0 20px ${accentColor}05`
            : "none",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Block label */}
        <div
          style={{
            fontSize: 9,
            fontFamily: MONO,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: accentColor,
            marginBottom: 10,
            paddingBottom: 8,
            borderBottom: `1px solid ${accentColor}20`,
            flexShrink: 0,
          }}
        >
          — {title}
        </div>

        {vertical ? (
          // ── Vertical stacked rows (Media Arm) ──
          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-evenly" }}>
            {items.map((item, i) => {
              const isActive = !hasSelection || highlightedIds.includes(item.id);
              const isFocused = selectedFeatureId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onFeatureSelect(item, accentColor)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "7px 0",
                    borderTop: i > 0 ? `1px solid ${accentColor}12` : "none",
                    cursor: "pointer",
                    opacity: hasSelection && !isActive && !isFocused ? 0.12 : 1,
                    transition: "opacity 0.22s ease",
                    userSelect: "none",
                  }}
                >
                  {/* Accent dot */}
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      background: isActive && hasSelection ? accentColor : "rgba(255,255,255,0.15)",
                      flexShrink: 0,
                      transition: "background 0.22s",
                      boxShadow: isFocused ? `0 0 6px ${accentColor}` : "none",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: MONO,
                      fontWeight: isFocused ? 700 : 400,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: isFocused
                        ? accentColor
                        : isActive && hasSelection
                        ? accentColor
                        : "rgba(255,255,255,0.2)",
                      lineHeight: 1.4,
                      transition: "color 0.22s",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          // ── Horizontal chips (Founders OS, Accelerator) ──
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignContent: "flex-start" }}>
            {items.map((item) => {
              const isActive = !hasSelection || highlightedIds.includes(item.id);
              const isFocused = selectedFeatureId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onFeatureSelect(item, accentColor)}
                  style={{
                    padding: "2px 8px",
                    fontSize: 9,
                    fontFamily: MONO,
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    border: `1px solid ${
                      isFocused
                        ? accentColor + "dd"
                        : isActive && hasSelection
                        ? accentColor + "60"
                        : "rgba(255,255,255,0.07)"
                    }`,
                    background: isFocused
                      ? `${accentColor}22`
                      : isActive && hasSelection
                      ? `${accentColor}12`
                      : "transparent",
                    color:
                      isFocused || (isActive && hasSelection)
                        ? accentColor
                        : "rgba(255,255,255,0.18)",
                    opacity: hasSelection && !isActive && !isFocused ? 0.15 : 1,
                    boxShadow: isFocused ? `0 0 10px ${accentColor}30` : "none",
                    transition: "all 0.22s ease",
                    boxSizing: "border-box",
                    userSelect: "none",
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </foreignObject>
  );
}

export default function EcosystemMap({ selectedId, onSelect, onFeatureSelect, selectedFeatureId, selectedSubId, onSubSelect }) {
  const activeStakeholder = selectedId
    ? STAKEHOLDERS.find((s) => s.id === selectedId)
    : null;

  const hasSelection = !!selectedId;
  const highlightedFeatures = activeStakeholder?.touchpoints.features ?? [];
  const highlightedMedia = activeStakeholder?.touchpoints.media ?? [];
  const highlightedIRL = activeStakeholder?.touchpoints.irl ?? [];

  function getHighlighted(blockId) {
    if (blockId === "os") return highlightedFeatures;
    if (blockId === "media") return highlightedMedia;
    if (blockId === "irl") return highlightedIRL;
    return [];
  }

  function getItems(blockId) {
    if (blockId === "os") return CORE_FEATURES;
    if (blockId === "media") return MEDIA_ITEMS;
    if (blockId === "irl") return IRL_ITEMS;
    return [];
  }

  return (
    <div
      style={{
        background: "#0c0c0c",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 1000 680"
        width="100%"
        style={{ display: "block" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Very subtle dot grid */}
          <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="rgba(255,255,255,0.12)" />
          </pattern>

          {/* Soft center radial glow */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b9aff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#8b9aff" stopOpacity="0" />
          </radialGradient>

          {/* Per-stakeholder spoke gradient */}
          {STAKEHOLDERS.map((s) => {
            const pos = polarToXY(s.angle);
            return (
              <linearGradient
                key={`grd-${s.id}`}
                id={`spokegrd-${s.id}`}
                x1={CX} y1={CY}
                x2={pos.x} y2={pos.y}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={s.color} stopOpacity="0" />
                <stop offset="25%" stopColor={s.color} stopOpacity="0.7" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.5" />
              </linearGradient>
            );
          })}
        </defs>

        {/* Background */}
        <rect width="1000" height="680" fill="#0c0c0c" />
        <rect width="1000" height="680" fill="url(#dotgrid)" />

        {/* Center glow behind the cluster */}
        <ellipse cx={CX} cy={CY} rx="270" ry="210" fill="url(#centerGlow)" />


        {/* Spoke lines */}
        {STAKEHOLDERS.map((s) => {
          const pos = polarToXY(s.angle);
          const isSelected = selectedId === s.id;
          const isDimmed = hasSelection && !isSelected;

          const dx = pos.x - CX;
          const dy = pos.y - CY;
          const len = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / len;
          const uy = dy / len;
          const startGap = 84;
          const endGap = 74;

          return (
            <g key={s.id}>
              {/* Glow halo on selected */}
              {isSelected && (
                <line
                  x1={CX + ux * startGap} y1={CY + uy * startGap}
                  x2={pos.x - ux * endGap} y2={pos.y - uy * endGap}
                  stroke={s.color}
                  strokeWidth={12}
                  opacity={0.07}
                  strokeLinecap="square"
                />
              )}
              <line
                x1={CX + ux * startGap} y1={CY + uy * startGap}
                x2={pos.x - ux * endGap} y2={pos.y - uy * endGap}
                stroke={isSelected ? `url(#spokegrd-${s.id})` : "rgba(255,255,255,0.1)"}
                strokeWidth={isSelected ? 1.5 : 0.7}
                strokeDasharray={isSelected ? "none" : "4 7"}
                strokeLinecap="square"
                opacity={isDimmed ? 0.03 : 1}
                style={{ transition: "opacity 0.3s" }}
              />
            </g>
          );
        })}

        {/* Three center building blocks */}
        {BLOCKS.map((block) => (
          <CenterBlock
            key={block.id}
            block={block}
            items={getItems(block.id)}
            highlightedIds={getHighlighted(block.id)}
            hasSelection={hasSelection}
            onFeatureSelect={onFeatureSelect}
            selectedFeatureId={selectedFeatureId}
          />
        ))}

        {/* Stakeholder nodes */}
        {STAKEHOLDERS.map((s, idx) => {
          const pos = polarToXY(s.angle);
          const isSelected = selectedId === s.id;
          const isGrayedOut = hasSelection && !isSelected;
          const nodeW = 130;
          const nodeH = s.subcategories?.length ? 84 : 66;

          return (
            <foreignObject
              key={s.id}
              x={pos.x - nodeW / 2}
              y={pos.y - nodeH / 2}
              width={nodeW}
              height={nodeH}
              style={{ overflow: "visible" }}
            >
              <div xmlns="http://www.w3.org/1999/xhtml">
                <StakeholderNode
                  stakeholder={s}
                  isSelected={isSelected}
                  isGrayedOut={isGrayedOut}
                  onClick={() => onSelect(s.id)}
                  selectedSubId={isSelected ? selectedSubId : null}
                  onSubSelect={(subId) => onSubSelect(s.id, subId)}
                  floatDelay={FLOAT_DELAYS[s.id] ?? 0}
                />
              </div>
            </foreignObject>
          );
        })}
      </svg>
    </div>
  );
}
