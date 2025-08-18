import { useState } from "react";
import loginImage from "../assets/login.jpg";
import logo from "../assets/logo.png";

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  error?: string;
}

export default function LoginPage({ onLogin, error }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

          <label className="sr-only" htmlFor="username">Username</label>
          <input
            id="username"
            className="mb-4 w-full px-4 py-3 rounded-lg bg-black/40 text-white
                       placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                       border border-white/10 focus:border-blue-500 text-lg"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <label className="sr-only" htmlFor="password">Password</label>
          <input
            id="password"
            className="mb-4 w-full px-4 py-3 rounded-lg bg-black/40 text-white
                       placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                       border border-white/10 focus:border-blue-500 text-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && (
            <div className="text-red-300 text-sm mb-4 font-medium">{error}</div>
          )}

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600
                       hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg
                       transition-all text-lg tracking-wide focus:outline-none focus:ring-2
                       focus:ring-blue-400"
            onClick={() => onLogin(username, password)}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Right side: empty flex child to keep layout; background image fills page */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}
