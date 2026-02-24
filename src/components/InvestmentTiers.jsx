import { STAKEHOLDERS, INVESTMENT_TIERS } from "../data/ecosystem.js";

export default function InvestmentTiers({ selectedId }) {
  const activeStakeholder = selectedId
    ? STAKEHOLDERS.find((s) => s.id === selectedId)
    : null;

  const highlighted = activeStakeholder
    ? activeStakeholder.touchpoints.tiers
    : null;

  return (
    <section>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 3,
            height: 20,
            background: "#6366f1",
            borderRadius: 2,
            boxShadow: "0 0 8px #6366f140",
          }}
        />
        <div className="font-barlow" style={{ fontSize: 16, color: "#f0f6ff" }}>
          Investment Tiers
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {INVESTMENT_TIERS.map((tier) => {
          const isHighlighted =
            highlighted === null || highlighted.includes(tier.id);
          const active = isHighlighted && highlighted;

          return (
            <div
              key={tier.id}
              className={isHighlighted ? "card-highlight" : "card-dimmed"}
              style={{
                padding: "20px 20px",
                background: "#0d1f35",
                border: `1px solid ${active ? `${tier.color}60` : "#1e3a5f"}`,
                borderRadius: 12,
                transition: "all 0.3s ease",
                boxShadow: active ? `0 0 20px ${tier.color}25` : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top color bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: active
                    ? tier.color
                    : "#1e3a5f",
                  transition: "background 0.3s",
                }}
              />

              {/* Tier header */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                <div
                  className="font-barlow"
                  style={{
                    fontSize: 18,
                    color: active ? tier.color : "#f0f6ff",
                    transition: "color 0.3s",
                  }}
                >
                  {tier.label}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: active ? `${tier.color}cc` : "#7a9bbf",
                  marginBottom: 14,
                  fontFamily: "'Barlow Condensed', Inter, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                }}
              >
                {tier.equity}
              </div>

              {/* Perks list */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {tier.perks.map((perk, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: 12,
                      color: "#f0f6ff",
                      lineHeight: 1.4,
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: active ? tier.color : "#1e3a5f",
                        flexShrink: 0,
                        marginTop: 5,
                        transition: "background 0.3s",
                      }}
                    />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
