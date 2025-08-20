import { useEffect, useState } from "react";
import {
  PowerIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import type { Server } from "../types";
import { invoke } from "@tauri-apps/api/core";

interface DashboardProps {
  onOpenServerList: () => void;
  onOpenSettings: () => void;
  onOpenVPNPage: () => void;
  disabled?: boolean;
  onLogout?: () => void;
  selectedServer?: Server | null;
}

export default function Dashboard({
  onOpenServerList,
  onOpenSettings,
  onOpenVPNPage,
  disabled = false,
  onLogout,
  selectedServer,
}: DashboardProps) {
  const [connected, setConnected] = useState(false);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [realIp, setRealIp] = useState<string>("—");
  const [vpnIp, setVpnIp] = useState<string>("");

  // Fetch current public IP on mount & whenever we disconnect
  useEffect(() => {
    (async () => {
      try {
        const ip = await invoke<string>("get_public_ip");
        setRealIp(ip || "—");
      } catch {
        setRealIp("—");
      }
    })();
  }, []);

  const toggleConnect = async () => {
    if (disabled || busy) return;
    setBusy(true);
    try {
      if (!connected) {
        // Connect (enable system proxy using selected server)
        const host = selectedServer?.ip;
        const port = selectedServer && (selectedServer as any).port ? (selectedServer as any).port as number : 8080; // adjust as needed
        if (!host) {
          alert("Please select a server first.");
          return;
        }
        await invoke("enable_proxy", { args: { host, port } });
        // confirm changed IP
        const ip = await invoke<string>("get_public_ip");
        setVpnIp(ip || "");
        setConnected(true);
      } else {
        // Disconnect (disable system proxy)
        await invoke("disable_proxy");
        const ip = await invoke<string>("get_public_ip");
        setRealIp(ip || "—");
        setVpnIp("");
        setConnected(false);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to toggle proxy. Check logs/console for details.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-7 w-7" />
          <span className="text-sm text-white/80">Dashboard</span>
        </div>

        <div className="relative">
          <button
            className={`p-2 rounded-xl hover:bg-white/10 transition ${disabled ? "opacity-50 pointer-events-none" : ""}`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <EllipsisVerticalIcon className="h-6 w-6 text-white/70" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur rounded-xl shadow-xl border border-white/10 overflow-hidden z-20">
              <button
                className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
                onClick={() => {
                  setShowDropdown(false);
                  onOpenSettings();
                }}
              >
                Settings
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
                onClick={() => {
                  setShowDropdown(false);
                  onOpenServerList();
                }}
              >
                Choose Server
              </button>
              {onLogout && (
                <button
                  className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-red-300"
                  onClick={() => {
                    setShowDropdown(false);
                    onLogout();
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {/* Main content area - side by side layout */}
        <div className="flex gap-8">
          {/* Left - Main control */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">VPN Status</h2>
            </div>

            {/* Connection button */}
            <div
              className={`rounded-full border-4 shadow-2xl transition-all duration-300 ${
                disabled || busy ? "opacity-50 pointer-events-none" : "hover:scale-105 cursor-pointer"
              }`}
              onClick={toggleConnect}
            >
              <div
                className={`rounded-full p-6 border-4 shadow-lg transition-all ${
                  connected ? "border-green-500/70" : "border-gray-600/70"
                }`}
              >
                <PowerIcon
                  className={`h-20 w-20 transition-colors ${
                    connected ? "text-green-400" : "text-gray-400"
                  }`}
                />
              </div>
            </div>

            <p className="text-lg font-semibold mt-4">
              {connected ? (busy ? "Connecting..." : "Connected") : busy ? "Disconnecting..." : "Disconnected"}
            </p>

            {/* Selected server */}
            <div
              className={`mt-8 w-full max-w-md p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between ${
                disabled ? "opacity-50 pointer-events-none" : "hover:bg-white/10"
              }`}
              onClick={onOpenServerList}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gray-800/50 border border-white/10 flex items-center justify-center">
                  <span className="text-xs text-white/70">SVR</span>
                </div>
                <div>
                  <p className="text-white font-medium">
                    {selectedServer ? `${selectedServer.city}, ${selectedServer.country}` : "Select Server"}
                  </p>
                  {selectedServer && (
                    <p className="text-xs text-gray-400 mt-1">IP: {selectedServer.ip}</p>
                  )}
                </div>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </div>

            {/* IP addresses */}
            <div className="mt-6 w-full max-w-md p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Real IP</p>
                  <p className="font-mono text-white">{realIp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">VPN IP</p>
                  <p className="font-mono text-white">{connected ? vpnIp || "…" : "—"}</p>
                </div>
              </div>
            </div>

            {/* Expandable section */}
            <div className={`flex justify-center mt-4 ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
              <button
                onClick={onOpenVPNPage}
                className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors flex items-center gap-2"
              >
                <span className="text-sm text-gray-300">Details</span>
                {expanded ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Right - Placeholder side panel (you can keep your existing content) */}
          <div className="w-[360px] space-y-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-sm text-white/80">Quick Actions</p>
              <div className="mt-3 flex gap-2">
                <button
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
                  onClick={onOpenSettings}
                >
                  Settings
                </button>
                <button
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
                  onClick={onOpenServerList}
                >
                  Servers
                </button>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-sm text-white/80">Status</p>
              <div className="mt-3 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>State</span>
                  <span>{connected ? "Connected" : "Disconnected"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Busy</span>
                  <span>{busy ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
