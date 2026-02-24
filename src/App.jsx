import { useState, useEffect } from "react";
import { STAKEHOLDERS } from "./data/ecosystem.js";
import Header from "./components/Header.jsx";
import EcosystemMap from "./components/EcosystemMap.jsx";
import DetailPanel from "./components/DetailPanel.jsx";
import CompaniesPanel from "./components/CompaniesPanel.jsx";
import FeaturePanel from "./components/FeaturePanel.jsx";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedSubId, setSelectedSubId] = useState(null);
  // selectedFeature: { item: { id, label, desc, how, screenshot, stakeholders }, accentColor }
  const [selectedFeature, setSelectedFeature] = useState(null);

  const activeStakeholder = selectedId
    ? STAKEHOLDERS.find((s) => s.id === selectedId)
    : null;

  function handleStakeholderSelect(id) {
    if (selectedId === id && !selectedSubId) {
      setSelectedId(null);
      setSelectedSubId(null);
    } else {
      setSelectedId(id);
      setSelectedSubId(null);
    }
  }

  function handleSubSelect(stakeholderId, subId) {
    setSelectedId(stakeholderId);
    setSelectedSubId((prev) =>
      prev === subId && selectedId === stakeholderId ? null : subId
    );
  }

  function handleFeatureSelect(item, accentColor) {
    // Toggle: clicking same feature closes it
    setSelectedFeature((prev) =>
      prev?.item.id === item.id ? null : { item, accentColor }
    );
  }

  function closeFeature() {
    setSelectedFeature(null);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        if (selectedFeature) {
          setSelectedFeature(null);
        } else if (selectedSubId) {
          setSelectedSubId(null);
        } else {
          setSelectedId(null);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedFeature, selectedSubId]);

  return (
    <div style={{ minHeight: "100vh", background: "#0c0c0c", color: "#f7f7f7" }}>
      <Header selectedId={selectedId} onClear={() => setSelectedId(null)} />

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 28px 48px" }}>
        {/* Context strip */}
        <div
          style={{
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          {selectedId ? (
            <div
              style={{
                fontSize: 10,
                color: activeStakeholder?.color,
                letterSpacing: "0.12em",
                fontFamily: "'Victor Mono', monospace",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {activeStakeholder?.label} — {activeStakeholder?.tagline}
            </div>
          ) : (
            <div
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.1em",
                fontFamily: "'Victor Mono', monospace",
                textTransform: "uppercase",
              }}
            >
              Select a stakeholder · Click any block element for details
            </div>
          )}
        </div>

        <EcosystemMap
          selectedId={selectedId}
          onSelect={handleStakeholderSelect}
          onFeatureSelect={handleFeatureSelect}
          selectedFeatureId={selectedFeature?.item.id ?? null}
          selectedSubId={selectedSubId}
          onSubSelect={handleSubSelect}
        />
      </main>

      {/* Left: company logos for selected stakeholder */}
      <CompaniesPanel stakeholder={activeStakeholder} onClose={() => setSelectedId(null)} />

      {/* Right: stakeholder detail panel — hidden when feature panel is open */}
      {!selectedFeature && (
        <DetailPanel
          stakeholder={activeStakeholder}
          selectedSubId={selectedSubId}
          onSubChange={(subId) => handleSubSelect(selectedId, subId)}
          onClose={() => { setSelectedId(null); setSelectedSubId(null); }}
        />
      )}

      {/* Right: feature detail panel — slides over everything */}
      <FeaturePanel
        feature={selectedFeature?.item ?? null}
        accentColor={selectedFeature?.accentColor ?? "#8b9aff"}
        onClose={closeFeature}
      />
    </div>
  );
}
