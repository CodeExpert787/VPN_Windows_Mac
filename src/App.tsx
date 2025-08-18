import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import ServerList from "./components/ServerList";
import SettingsWindow from "./components/Settings/SettingsWindow";
import VPNPage from "./components/VPNPage";
import type { Server } from "./types";
import { useTauriResize } from "./hooks/useTauriResize";
import LoginPage from "./components/LoginModal";
import { getCurrentWindow } from '@tauri-apps/api/window';

// Check if running in Tauri
const isTauri = typeof window !== 'undefined' && window.__TAURI__;

export default function App() {
  const [view, setView] = useState<"dashboard" | "servers" | "settings" | "vpn">("dashboard");
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const containerRef = useTauriResize('main');

  // Handle hash routing for Tauri settings window
  useEffect(() => {
    if (isTauri) {
      const hash = window.location.hash;
      if (hash === '#settings') {
        setView('settings');
      }
    }
  }, []);

  // Update window title based on current view
  useEffect(() => {
    if (isTauri && loggedIn) {
      const updateWindowTitle = async () => {
        try {
          const window = getCurrentWindow();
          let title = "EnterVPN";
          
          switch (view) {
            case "dashboard":
              title = "EnterVPN - Dashboard";
              break;
            case "servers":
              title = "EnterVPN - Server Selection";
              break;
            case "settings":
              title = "EnterVPN - Settings";
              break;
            case "vpn":
              title = "EnterVPN - VPN Details";
              break;
            default:
              title = "EnterVPN";
          }
          
          await window.setTitle(title);
        } catch (error) {
          console.error('Failed to update window title:', error);
        }
      };
      
      updateWindowTitle();
    }
  }, [view, loggedIn]);

  const handleOpenSettings = () => {
    setView('settings');
  };

  const handleCloseSettings = () => {
    setView('dashboard');
  };

  const handleLogin = (username: string, password: string) => {
    if (!username || !password) {
      setLoginError("Username and password are required.");
      return;
    }
    setLoggedIn(true);
    setLoginError("");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setSelectedServer(null);
    setView('dashboard');
  };

  return (
    <div ref={containerRef} className="h-screen bg-gray-900">
      {!loggedIn ? (
        <LoginPage onLogin={handleLogin} error={loginError} />
      ) : (
        <>
          {view === "dashboard" && (
            <Dashboard
              onOpenServerList={() => setView("servers")}
              onOpenSettings={handleOpenSettings}
              onOpenVPNPage={() => setView("vpn")}
              disabled={false}
              onLogout={handleLogout}
              selectedServer={selectedServer}
            />
          )}
          {view === "servers" && (
            <ServerList
              onClose={() => setView("dashboard")}
              onSelect={(srv) => { setSelectedServer(srv); setView("dashboard"); }}
            />
          )}
          {view === "settings" && (
            <SettingsWindow onClose={handleCloseSettings} />
          )}
          {view === "vpn" && (
            <VPNPage onBack={() => setView("dashboard")} selectedServer={selectedServer} />
          )}
          {/* {selectedServer && (
            <div className="fixed bottom-6 left-6 bg-gray-900/80 backdrop-blur-md text-sm text-gray-300 px-4 py-2 rounded-xl border border-white/10 shadow-lg">
              Selected: <span className="text-white font-medium">{selectedServer.country} • {selectedServer.city}</span>
            </div>
          )} */}
        </>
      )}
    </div>
  );
}
