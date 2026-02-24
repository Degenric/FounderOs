import { useState } from "react";
import { useEdit } from "../context/EditContext";

const MONO = "'Victor Mono', monospace";
const ORANGE = "#f97316";

export default function EditBar() {
  const { isEditing, login, logout, save, saveStatus } = useEdit();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    const { error } = await login(password);
    setLoggingIn(false);
    if (error) {
      setLoginError("Wrong password");
    } else {
      setShowModal(false);
      setPassword("");
    }
  }

  const saveLabel =
    saveStatus === "saving" ? "Saving..." :
    saveStatus === "saved"  ? "Saved ✓" :
    saveStatus === "error"  ? "Error — retry" :
    "Save Changes";

  return (
    <>
      {/* ── Edit Mode Toolbar ── */}
      {isEditing && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            zIndex: 200,
            background: ORANGE,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: 40,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#0c0c0c",
            }}
          >
            — Edit Mode Active
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={save}
              style={{
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(0,0,0,0.3)",
                color: "#0c0c0c",
                cursor: "pointer",
                fontFamily: MONO,
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "6px 16px",
              }}
            >
              {saveLabel}
            </button>
            <button
              onClick={logout}
              style={{
                background: "transparent",
                border: "1px solid rgba(0,0,0,0.25)",
                color: "rgba(0,0,0,0.6)",
                cursor: "pointer",
                fontFamily: MONO,
                fontSize: 8,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "6px 16px",
              }}
            >
              Exit Edit Mode
            </button>
          </div>
        </div>
      )}

      {/* ── Floating Edit Button ── */}
      {!isEditing && (
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            background: ORANGE,
            border: "none",
            color: "#000",
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "10px 22px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
      )}

      {/* ── Password Modal ── */}
      {showModal && !isEditing && (
        <>
          <div
            onClick={() => { setShowModal(false); setLoginError(""); setPassword(""); }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.72)",
              zIndex: 150,
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "32px",
              width: 320,
              zIndex: 160,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: ORANGE,
                marginBottom: 20,
              }}
            >
              — Enter Edit Password
            </div>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f7f7f7",
                  fontFamily: MONO,
                  fontSize: 12,
                  padding: "10px 12px",
                  outline: "none",
                  marginBottom: 10,
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              {loginError && (
                <div
                  style={{
                    color: "#f87171",
                    fontFamily: MONO,
                    fontSize: 8,
                    letterSpacing: "0.1em",
                    marginBottom: 10,
                  }}
                >
                  {loginError}
                </div>
              )}
              <button
                type="submit"
                disabled={loggingIn}
                style={{
                  width: "100%",
                  background: ORANGE,
                  border: "none",
                  color: "#0c0c0c",
                  cursor: loggingIn ? "not-allowed" : "pointer",
                  fontFamily: MONO,
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "10px 16px",
                  opacity: loggingIn ? 0.6 : 1,
                }}
              >
                {loggingIn ? "Authenticating..." : "Unlock Edit Mode"}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
