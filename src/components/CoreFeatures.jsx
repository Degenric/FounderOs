import { STAKEHOLDERS, CORE_FEATURES } from "../data/ecosystem.js";

export default function CoreFeatures({ selectedId }) {
  const activeStakeholder = selectedId
    ? STAKEHOLDERS.find((s) => s.id === selectedId)
    : null;

  const highlighted = activeStakeholder
    ? activeStakeholder.touchpoints.features
    : null;

  return (
    <section>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 3,
            height: 20,
            background: "#3b82f6",
            borderRadius: 2,
            boxShadow: "0 0 8px #3b82f640",
          }}
        />
        <div
          className="font-barlow"
          style={{ fontSize: 16, color: "#f0f6ff" }}
        >
          Core Platform Features
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}
      >
        {CORE_FEATURES.map((feature) => {
          const isHighlighted =
            highlighted === null || highlighted.includes(feature.id);

          return (
            <div
              key={feature.id}
              className={isHighlighted ? "card-highlight" : "card-dimmed"}
              style={{
                padding: "16px 18px",
                background: "#0d1f35",
                border: `1px solid ${isHighlighted && highlighted ? "#3b82f660" : "#1e3a5f"}`,
                borderRadius: 10,
                transition: "all 0.3s ease",
                boxShadow:
                  isHighlighted && highlighted
                    ? "0 0 12px #3b82f620"
                    : "none",
              }}
            >
              <div
                className="font-barlow"
                style={{
                  fontSize: 13,
                  color: isHighlighted && highlighted ? "#3b82f6" : "#f0f6ff",
                  marginBottom: 6,
                  transition: "color 0.3s",
                }}
              >
                {feature.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#7a9bbf",
                  lineHeight: 1.5,
                }}
              >
                {feature.desc}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
