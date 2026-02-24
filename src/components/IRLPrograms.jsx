import { STAKEHOLDERS, MEDIA_ITEMS, IRL_ITEMS } from "../data/ecosystem.js";

function SectionLabel({ color, children }) {
  return (
    <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 3,
          height: 16,
          background: color,
          borderRadius: 2,
          boxShadow: `0 0 6px ${color}60`,
        }}
      />
      <div
        className="font-barlow"
        style={{ fontSize: 13, color: "#f0f6ff", letterSpacing: "0.08em" }}
      >
        {children}
      </div>
    </div>
  );
}

function ItemCard({ item, isHighlighted, accentColor, hasSelection }) {
  const active = isHighlighted && hasSelection;

  return (
    <div
      className={isHighlighted ? "card-highlight" : "card-dimmed"}
      style={{
        padding: "12px 14px",
        background: "#0d1f35",
        border: `1px solid ${active ? `${accentColor}50` : "#1e3a5f"}`,
        borderRadius: 8,
        transition: "all 0.3s ease",
        boxShadow: active ? `0 0 10px ${accentColor}20` : "none",
      }}
    >
      <div
        className="font-barlow"
        style={{
          fontSize: 12,
          color: active ? accentColor : "#f0f6ff",
          marginBottom: 4,
          transition: "color 0.3s",
        }}
      >
        {item.label}
      </div>
      <div style={{ fontSize: 11, color: "#7a9bbf", lineHeight: 1.4 }}>
        {item.desc}
      </div>
    </div>
  );
}

export default function IRLPrograms({ selectedId }) {
  const activeStakeholder = selectedId
    ? STAKEHOLDERS.find((s) => s.id === selectedId)
    : null;

  const highlightedMedia = activeStakeholder
    ? activeStakeholder.touchpoints.media
    : null;
  const highlightedIRL = activeStakeholder
    ? activeStakeholder.touchpoints.irl
    : null;

  const hasSelection = !!selectedId;

  return (
    <section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {/* Media Arm */}
        <div>
          <SectionLabel color="#ef4444">Media Arm</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MEDIA_ITEMS.map((item) => {
              const isHighlighted =
                highlightedMedia === null || highlightedMedia.includes(item.id);
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  isHighlighted={isHighlighted}
                  accentColor="#ef4444"
                  hasSelection={hasSelection}
                />
              );
            })}
          </div>
        </div>

        {/* IRL Programs */}
        <div>
          <SectionLabel color="#eab308">IRL Programs</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            {IRL_ITEMS.map((item) => {
              const isHighlighted =
                highlightedIRL === null || highlightedIRL.includes(item.id);
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  isHighlighted={isHighlighted}
                  accentColor="#eab308"
                  hasSelection={hasSelection}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
