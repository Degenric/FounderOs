import { useState, useEffect, Component } from "react";
import { ContentProvider, useContent } from "./context/ContentContext.jsx";
import { EditProvider } from "./context/EditContext.jsx";
import { useEdit } from "./context/EditContext.jsx";

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ position: "fixed", inset: 0, background: "#0c0c0c", color: "#f87171",
          fontFamily: "monospace", padding: 32, fontSize: 13, whiteSpace: "pre-wrap" }}>
          {"[App Error]\n" + String(this.state.error)}
        </div>
      );
    }
    return this.props.children;
  }
}
import Header from "./components/Header.jsx";
import EcosystemMap from "./components/EcosystemMap.jsx";
import DetailPanel from "./components/DetailPanel.jsx";
import CompaniesPanel from "./components/CompaniesPanel.jsx";
import FeaturePanel from "./components/FeaturePanel.jsx";
import EditBar from "./components/EditBar.jsx";

function AppInner() {
  const { content, setContent } = useContent();
  const { isEditing } = useEdit();

  const [selectedId, setSelectedId] = useState(null);
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const activeStakeholder = selectedId
    ? content.STAKEHOLDERS.find((s) => s.id === selectedId)
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

  // ── Content update helpers ──

  function handleFeatureChange(featureId, field, value) {
    setContent((prev) => {
      const updateList = (list) =>
        list.map((f) => (f.id === featureId ? { ...f, [field]: value } : f));
      return {
        ...prev,
        CORE_FEATURES: updateList(prev.CORE_FEATURES),
        MEDIA_ITEMS: updateList(prev.MEDIA_ITEMS),
        IRL_ITEMS: updateList(prev.IRL_ITEMS),
      };
    });
    // Keep selectedFeature in sync so FeaturePanel re-renders immediately
    setSelectedFeature((prev) =>
      prev?.item.id === featureId
        ? { ...prev, item: { ...prev.item, [field]: value } }
        : prev
    );
  }

  function handleStakeholderChange(stakeholderId, subId, field, value) {
    setContent((prev) => ({
      ...prev,
      STAKEHOLDERS: prev.STAKEHOLDERS.map((s) => {
        if (s.id !== stakeholderId) return s;
        if (subId) {
          return {
            ...s,
            subcategories: s.subcategories.map((sub) =>
              sub.id === subId ? { ...sub, [field]: value } : sub
            ),
          };
        }
        return { ...s, [field]: value };
      }),
    }));
  }

  function handleBlockTitleChange(blockId, newTitle) {
    setContent((prev) => ({
      ...prev,
      BLOCKS: prev.BLOCKS.map((b) =>
        b.id === blockId ? { ...b, title: newTitle } : b
      ),
    }));
  }

  function handleCompanyChange(stakeholderId, companyId, field, value) {
    setContent((prev) => ({
      ...prev,
      STAKEHOLDERS: prev.STAKEHOLDERS.map((s) => {
        if (s.id !== stakeholderId) return s;
        return {
          ...s,
          examples: s.examples.map((ex) =>
            ex.id === companyId ? { ...ex, [field]: value } : ex
          ),
        };
      }),
    }));
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        color: "#f7f7f7",
        paddingTop: isEditing ? 40 : 0,
      }}
    >
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
          stakeholders={content.STAKEHOLDERS}
          coreFeatures={content.CORE_FEATURES}
          mediaItems={content.MEDIA_ITEMS}
          irlItems={content.IRL_ITEMS}
          blocks={content.BLOCKS}
          onBlockTitleChange={handleBlockTitleChange}
        />
      </main>

      <CompaniesPanel
        stakeholder={activeStakeholder}
        onClose={() => setSelectedId(null)}
        onCompanyChange={(companyId, field, value) =>
          handleCompanyChange(selectedId, companyId, field, value)
        }
      />

      {!selectedFeature && (
        <DetailPanel
          stakeholder={activeStakeholder}
          selectedSubId={selectedSubId}
          onSubChange={(subId) => handleSubSelect(selectedId, subId)}
          onStakeholderChange={handleStakeholderChange}
          onClose={() => { setSelectedId(null); setSelectedSubId(null); }}
        />
      )}

      <FeaturePanel
        feature={selectedFeature?.item ?? null}
        accentColor={selectedFeature?.accentColor ?? "#8b9aff"}
        onFeatureChange={handleFeatureChange}
        onClose={closeFeature}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ContentProvider>
        <EditProvider>
          <AppInner />
          <EditBar />
        </EditProvider>
      </ContentProvider>
    </ErrorBoundary>
  );
}
