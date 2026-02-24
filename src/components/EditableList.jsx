import { useEdit } from "../context/EditContext";
import EditableText from "./EditableText";

const MONO = "'Victor Mono', monospace";

export default function EditableList({ items, onChange, color, renderItem }) {
  const { isEditing } = useEdit();

  function updateItem(index, newText) {
    const next = [...items];
    next[index] = newText;
    onChange(next);
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, "New item"]);
  }

  if (!isEditing) {
    return <>{items.map((item, i) => renderItem(item, i))}</>;
  }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
          <div style={{ flex: 1 }}>
            {renderItem(
              item,
              i,
              { onChange: (text) => updateItem(i, text) }
            )}
          </div>
          <button
            onClick={() => removeItem(i)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,80,80,0.55)",
              fontSize: 14,
              flexShrink: 0,
              padding: "6px 4px",
              lineHeight: 1,
              fontFamily: MONO,
            }}
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        style={{
          marginTop: 6,
          background: "none",
          border: `1px dashed ${color}50`,
          color: color,
          cursor: "pointer",
          fontSize: 8,
          fontFamily: MONO,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "3px 10px",
        }}
      >
        + Add item
      </button>
    </div>
  );
}
