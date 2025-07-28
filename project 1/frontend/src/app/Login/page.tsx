"use client";
import { useState, useRef } from "react";
import { FiUser, FiMail, FiLock, FiArrowLeft, FiX, FiEye, FiEyeOff } from "react-icons/fi";

const siteName = "Site";

export default function LoginRegisterPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [eyeAnim, setEyeAnim] = useState(false);

  function handleSwitch() {
    setError(null);
    setName("");
    setEmail("");
    setPass("");
    setConfirm("");
    if (containerRef.current) {
      containerRef.current.classList.add("switching-fluent");
      setTimeout(() => {
        setMode((m) => (m === "login" ? "register" : "login"));
        setTimeout(() => {
          containerRef.current?.classList.remove("switching-fluent");
        }, 320);
      }, 180);
    } else {
      setMode((m) => (m === "login" ? "register" : "login"));
    }
  }

  function handleBack() {
    window.location.href = "/";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "register") {
        if (pass !== confirm) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password: pass }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Registration error.");
        } else {
          setMode("login");
          setError("Registration successful! Please log in.");
        }
      } else {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: pass }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Invalid email or password.");
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "/";
        }
      }
    } catch {
      setError("Connection error.");
    }
    setLoading(false);
  }

  function handleEyeClick() {
    setEyeAnim(true);
    setShowPassword((v) => !v);
    setTimeout(() => setEyeAnim(false), 320);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7fafc] via-[#e3e8ee] to-[#cbd5e1] relative"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <button
        onClick={handleBack}
        aria-label="Back to home"
        className="absolute top-6 left-6 bg-white/80 hover:bg-gray-100 rounded-full p-2 shadow transition z-20 cursor-pointer hidden sm:inline-flex"
        style={{ border: "1.5px solid #e5e7eb" }}
      >
        <FiX className="text-2xl text-gray-500" />
      </button>
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 bg-white/80 hover:bg-gray-100 rounded-full p-2 shadow transition cursor-pointer sm:hidden"
        style={{ border: "1.5px solid #e5e7eb" }}
        aria-label="Back to home"
      >
        <FiArrowLeft className="text-xl text-gray-500" />
      </button>
      <div
        ref={containerRef}
        className="relative w-full max-w-md mx-auto bg-white/90 rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center transition-all duration-500"
        style={{
          boxShadow: "0 8px 32px 0 #cbd5e1cc",
          border: "1.5px solid #e0e7ef",
          minHeight: 420,
        }}
      >
        <h1
          className="font-extrabold text-3xl mb-2 tracking-tight"
          style={{
            color: "#23272f",
            letterSpacing: "0.04em",
            textShadow: "0 2px 8px #e2e8f080",
            fontFamily: "monospace",
          }}
        >
          {siteName}
        </h1>
        <p className="text-gray-500 mb-7 text-center" style={{ fontSize: "1.13rem" }}>
          {mode === "login"
            ? "Access your account to manage your accounting."
            : "Create your account and simplify your MEI management."}
        </p>
        <form
          className="w-full flex flex-col gap-4 transition-all"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {mode === "register" && (
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition input-text-black"
                style={{ fontSize: "1.08rem" }}
              />
            </div>
          )}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition input-text-black"
              style={{ fontSize: "1.08rem" }}
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="pl-10 pr-10 py-2 rounded-lg border border-gray-200 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition input-text-black"
              style={{ fontSize: "1.08rem" }}
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={handleEyeClick}
              className={`absolute right-3 top-2.5 p-1 rounded-full transition cursor-pointer bg-transparent border-none outline-none flex items-center justify-center eye-btn ${eyeAnim ? "eye-anim" : ""}`}
            >
              {showPassword ? (
                <FiEyeOff className="text-xl text-gray-400 transition-all" />
              ) : (
                <FiEye className="text-xl text-gray-400 transition-all" />
              )}
            </button>
          </div>
          {mode === "register" && (
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="pl-10 pr-10 py-2 rounded-lg border border-gray-200 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition input-text-black"
                style={{ fontSize: "1.08rem" }}
              />
              <button
                type="button"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={handleEyeClick}
                className={`absolute right-3 top-2.5 p-1 rounded-full transition cursor-pointer bg-transparent border-none outline-none flex items-center justify-center eye-btn ${eyeAnim ? "eye-anim" : ""}`}
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl text-gray-400 transition-all" />
                ) : (
                  <FiEye className="text-xl text-gray-400 transition-all" />
                )}
              </button>
            </div>
          )}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-2 rounded-lg font-semibold text-lg transition bg-gray-900 text-white hover:bg-gray-800 shadow cursor-pointer ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            style={{
              letterSpacing: "0.01em",
              boxShadow: "0 3px 16px 0 #3341550b",
            }}
          >
            {loading
              ? mode === "login"
                ? "Logging in..."
                : "Registering..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center w-full">
          <button
            onClick={handleSwitch}
            className={`font-medium transition cursor-pointer ${
              mode === "register"
                ? "text-black hover:underline"
                : "text-indigo-600 hover:underline"
            }`}
            style={{ fontSize: "1.04rem" }}
            type="button"
          >
            {mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
        <style>{`
          .switching-fluent {
            animation: fadeSwitchFluent 0.5s cubic-bezier(.45,1.75,.38,.9);
          }
          @keyframes fadeSwitchFluent {
            0% { opacity: 1; transform: scale(1);}
            30% { opacity: 0.1; transform: scale(0.97) translateY(10px);}
            60% { opacity: 0.1; transform: scale(1.03) translateY(-10px);}
            100% { opacity: 1; transform: scale(1);}
          }
          .input-text-black::placeholder {
            color: #a3a3a3 !important;
            opacity: 1;
          }
          .input-text-black {
            color: #23272f !important;
          }
          .eye-btn {
            transition: background 0.18s, transform 0.25s;
          }
          .eye-btn:active {
            background: #e5e7eb;
          }
          .eye-anim {
            animation: eyePop 0.32s cubic-bezier(.45,1.75,.38,.9);
          }
          @keyframes eyePop {
            0% { transform: scale(1);}
            40% { transform: scale(1.18);}
            100% { transform: scale(1);}
          }
        `}</style>
      </div>
    </div>
  );
}