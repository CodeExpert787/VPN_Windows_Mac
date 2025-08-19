import { useEffect, useRef, useState } from "react";
import loginImage from "../assets/login.jpg";
import logo from "../assets/logo.png";

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  error?: string;
}

export default function LoginPage({ onLogin, error }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string>("");
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const getOrCreateUUID = (): string => {
    const existing = localStorage.getItem("uuid");
    if (existing) return existing;
    const created = crypto.randomUUID();
    localStorage.setItem("uuid", created);
    return created;
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank");
  };

  const handleSubmit = async () => {
    setLocalError("");

    if (!email) {
      setLocalError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setLocalError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setLocalError("Password is required");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    try {
      const udid = getOrCreateUUID();
      const resp = await fetch("https://api.v1.dev.entervpn.com/proxy/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, pass: password, udid })
      });
      const data: any = await resp.json();
      console.log("asdfasdfasdf", data);
      if (data?.message === 'You are successfully logged in') {
        try {
          localStorage.setItem('username', email);
          localStorage.setItem('password', password);
          if (data?.proxy_bundle) localStorage.setItem('proxies', JSON.stringify(data.proxy_bundle));
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('isConnected', 'false');
          localStorage.setItem('selectedServer', 'null');
          if (data?.turn_auth_config) localStorage.setItem('turnConfig', JSON.stringify(data.turn_auth_config));
        } catch {}
        onLogin(email, password);
      } else {
        setLocalError(data?.message || 'Login failed. Please check your credentials.');
      }
    } catch (e) {
      setLocalError('An error occurred during login. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex bg-cover bg-center"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      {/* Left: frosted-glass login panel */}
      <div className="w-full md:w-2/5 lg:w-2/5 xl:w-2/5 p-8 md:p-12 flex items-center
                      bg-gray-900/40 backdrop-blur-md">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
                Sign in
              </h2>
            </div>
            <p className="text-gray-200/80 text-lg mb-8">Access your VPN dashboard</p>
          </div>

          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            ref={emailInputRef}
            className="mb-4 w-full px-4 py-3 rounded-lg bg-black/40 text-white
                       placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                       border border-white/10 focus:border-blue-500 text-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label className="sr-only" htmlFor="password">Password</label>
          <div className="mb-4 relative">
            <input
              id="password"
              className="w-full px-4 py-3 pr-12 rounded-lg bg-black/40 text-white
                         placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                         border border-white/10 focus:border-blue-500 text-lg"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-white"
              onClick={() => setShowPassword(s => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {(localError || error) && (
            <div className="text-red-300 text-sm mb-4 font-medium">{localError || error}</div>
          )}

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600
                       hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg
                       transition-all text-lg tracking-wide focus:outline-none focus:ring-2
                       focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Logging In…' : 'Sign In'}
          </button>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-300">
            <button
              className="hover:underline"
              onClick={() => openExternal("https://billing.entervpn.com/passwordreset")}
            >
              Forgot password?
            </button>
            <button
              className="hover:underline"
              onClick={() => openExternal("https://billing.entervpn.com/signup")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Right side: empty flex child to keep layout; background image fills page */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}
