import { useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { useEdit } from "../context/EditContext";

export default function LogoUpload({ companyId, onUpload, color = "#8b9aff", children }) {
  const { isEditing } = useEdit();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (!isEditing) return children;

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${companyId}.${ext}`;
    const { error } = await supabase.storage
      .from("logos")
      .upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("logos").getPublicUrl(path);
      onUpload(data.publicUrl + "?t=" + Date.now());
    }
    setUploading(false);
    e.target.value = "";
  }

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && (
        <div
          onClick={() => inputRef.current?.click()}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(12,12,12,0.82)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 7,
            color,
            fontFamily: "'Victor Mono', monospace",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {uploading ? "..." : "Upload"}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </div>
  );
}
