import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoUpload from "./LogoUpload.jsx";
import EditableText from "./EditableText.jsx";

const MONO = "'Victor Mono', monospace";

function LogoItem({ company, color, index, onCompanyChange }) {
  const [imgError, setImgError] = useState(false);

  const initials = company.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isClickable = !!company.articleUrl;

  const logoBox = (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        overflow: "hidden",
        background: `${color}18`,
        border: `1px solid ${color}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      {!imgError ? (
        <img
          src={company.logo}
          alt={company.name}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }}
        />
      ) : (
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 13, color, letterSpacing: "0.05em" }}>
          {initials}
        </span>
      )}
    </div>
  );

  const inner = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.07, duration: 0.28, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        cursor: isClickable ? "pointer" : "default",
        opacity: company.status === "pipeline" ? 0.55 : 1,
      }}
    >
      <LogoUpload
        companyId={company.id}
        onUpload={(url) => { setImgError(false); onCompanyChange?.(company.id, "logo", url); }}
        color={color}
      >
        {logoBox}
      </LogoUpload>

      <EditableText
        value={company.name}
        onChange={(val) => onCompanyChange?.(company.id, "name", val)}
        style={{
          fontSize: 9,
          fontFamily: MONO,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#7a9bbf",
          textAlign: "center",
          maxWidth: 52,
          lineHeight: 1.2,
        }}
        tag="span"
      />
    </motion.div>
  );

  if (!isClickable) return inner;

  return (
    <a href={company.articleUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} title={`${company.name} — case study`}>
      {inner}
    </a>
  );
}

export default function CompaniesPanel({ stakeholder, onClose, onCompanyChange }) {
  if (!stakeholder) return null;

  const entries = stakeholder.examples ?? [];

  return (
    <AnimatePresence>
      {stakeholder && (
        <div
          style={{
            position: "fixed",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {entries.map((company, i) => (
            <LogoItem
              key={company.id}
              company={company}
              color={stakeholder.color}
              index={i}
              onCompanyChange={onCompanyChange}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
