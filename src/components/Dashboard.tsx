import { useState } from "react";
import { PowerIcon, ChevronRightIcon, EllipsisVerticalIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import type { Server } from "../types";

interface DashboardProps {
  onOpenServerList: () => void;
  onOpenSettings: () => void;
  onOpenVPNPage: () => void;
  disabled?: boolean;
  onLogout?: () => void;
  selectedServer?: Server | null;
}

export default function Dashboard({ onOpenServerList, onOpenSettings, onOpenVPNPage, disabled = false, onLogout, selectedServer }: DashboardProps) {
  const [connected, setConnected] = useState(false);
  const [expanded] = useState(false);
  const [snoozed, setSnoozed] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const vpnIp = "10.24.6.12";
  const realIp = "123.45.67.89";

  const toggleConnect = () => {
    if (disabled) return;
    if (snoozed) setSnoozed(false);
    setConnected((c) => !c);
  };

  return (
    <div className="w-full h-full flex bg-gray-900">
      {/* Main dashboard container with frosted-glass effect */}
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-gray-900/40 backdrop-blur-md  p-6">
          {/* Header with logo and menu */}
          <div className="flex items-center justify-between mb-28 relative">
            {/* Centered logo and title */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <h1 className="text-2xl font-extrabold text-white tracking-tight">EnterVPN</h1>
            </div>
            
            {/* Right-aligned menu button */}
            <div className="ml-auto">
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors"
                >
                  <EllipsisVerticalIcon className="h-5 w-5 text-gray-200" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl border border-white/10 min-w-[140px] z-10">
                    <div
                      onClick={() => {
                        onOpenSettings();
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-700/60 rounded-t-xl text-sm text-gray-200 cursor-pointer transition-colors"
                    >
                      Settings
                    </div>
                    <div
                      onClick={() => {
                        setShowDropdown(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-700/60 text-sm text-gray-200 cursor-pointer transition-colors"
                    >
                      Logout
                    </div>
                    <div
                      onClick={() => {
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-700/60 rounded-b-xl text-sm text-gray-200 cursor-pointer transition-colors"
                    >
                      Quit
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main content area - side by side layout */}
          <div className="flex gap-8">
            {/* Left side - Main VPN control section */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">VPN Status</h2>
                <p className={`text-lg font-semibold ${
                  connected && !snoozed ? "text-green-400" : "text-yellow-300"
                }`}>
                  {connected && !snoozed ? "Connected" : "Disconnected"}
                </p>
                {snoozed && (
                  <p className="text-sm text-gray-400 mt-1">Snoozed for 5 minutes</p>
                )}
              </div>

              {/* Connection button */}
              <div 
                className={`rounded-full border-4 shadow-2xl transition-all duration-300 ${
                  disabled ? 'opacity-50 pointer-events-none' : 'hover:scale-105 cursor-pointer'
                }`} 
                onClick={toggleConnect}
              >
                <div className={`rounded-full p-6 border-4 shadow-lg transition-all ${
                  connected && !snoozed 
                    ? "border-green-500 bg-green-500/20" 
                    : "border-yellow-400 bg-yellow-400/20"
                }`}>
                  <PowerIcon className={`h-20 w-20 transition-colors ${
                    connected && !snoozed ? "text-green-400" : "text-yellow-300"
                  }`} />
                </div>
              </div>

              {/* VPN Page Button */}
            
            </div>

            {/* Right side - Server info, IP addresses, and other details */}
            <div className="flex-1 space-y-4">
              {/* Server selection */}
              <div 
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  disabled ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-800/60 cursor-pointer'
                }`} 
                onClick={onOpenServerList}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-400">VPN Server</p>
                    <p className="text-white font-medium">
                      {selectedServer ? `${selectedServer.city}, ${selectedServer.country}` : "Select Server"}
                    </p>
                    {selectedServer && (
                      <p className="text-xs text-gray-400 mt-1">
                        Latency: {selectedServer.latencyMs}ms
                      </p>
                    )}
                  </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              </div>

              {/* IP addresses */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-800/40">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Real IP</p>
                  <p className="font-mono text-white">{realIp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">VPN IP</p>
                  <p className="font-mono text-white">{connected && !snoozed ? vpnIp : "—"}</p>
                </div>
              </div>

              {/* Expandable section */}
              <div className={`flex justify-center transition-all ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
                <button
                  onClick={onOpenVPNPage}
                  className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors"
                >
                  {expanded ? (
                    <ChevronUpIcon className="h-6 w-6 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
