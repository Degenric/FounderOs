import { useRef, useEffect } from "react";
import { useEdit } from "../context/EditContext";

export default function EditableText({ value, onChange, style = {}, tag: Tag = "span" }) {
  const { isEditing } = useEdit();
  const ref = useRef(null);

  // Sync DOM when value changes externally (e.g. after revert)
  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value ?? "";
    }
  }, [value, isEditing]);

  if (!isEditing) {
    return <Tag style={style}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      style={{
        ...style,
        outline: "none",
        cursor: "text",
        borderBottom: "1px dashed rgba(251,146,60,0.45)",
        minWidth: 20,
        display: Tag === "span" ? "inline-block" : undefined,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderBottomColor = "rgba(251,146,60,0.9)";
        e.currentTarget.style.background = "rgba(251,146,60,0.05)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderBottomColor = "rgba(251,146,60,0.45)";
        e.currentTarget.style.background = "transparent";
        const newVal = e.currentTarget.innerText.trim();
        if (newVal !== value) onChange(newVal);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
        if (e.key === "Escape") {
          e.currentTarget.innerText = value ?? "";
          e.currentTarget.blur();
        }
        // Prevent click-to-select-stakeholder from firing while editing
        e.stopPropagation();
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {value}
    </Tag>
  );
}
