import { useState } from "react";
import { 
  Cog6ToothIcon, 
  GlobeAltIcon, 
  LockClosedIcon, 
  GlobeAsiaAustraliaIcon, 
  LightBulbIcon, 
  ArrowPathIcon, 
  GlobeEuropeAfricaIcon, 
  UserIcon, 
  QuestionMarkCircleIcon 
} from "@heroicons/react/24/outline";

// Import tab components
import GeneralTab from "./tabs/GeneralTab";
import ProtocolsTab from "./tabs/ProtocolsTab";
import NetworkTab from "./tabs/NetworkTab";
import PrivacyTab from "./tabs/PrivacyTab";
import DedicatedIPTab from "./tabs/DedicatedIPTab";
import AutomationTab from "./tabs/AutomationTab";
import SplitTunnelTab from "./tabs/SplitTunnelTab";
import MultiHopTab from "./tabs/MultiHopTab";
import AccountTab from "./tabs/AccountTab";
import HelpTab from "./tabs/HelpTab";

interface SettingsWindowProps {
  onClose: () => void;
}

type Tab =
  | "General"
  | "Protocols"
  | "Network"
  | "Privacy"
  | "Dedicated IP"
  | "Automation"
  | "Split Tunnel"
  | "Multi-Hop"
  | "Account"
  | "Help";

const tabs: { id: Tab; label: string; icon: React.ComponentType<any> }[] = [
  { id: "General", label: "General", icon: Cog6ToothIcon },
  { id: "Protocols", label: "Protocols", icon: GlobeAltIcon },
  { id: "Network", label: "Network", icon: GlobeAltIcon },
  { id: "Privacy", label: "Privacy", icon: LockClosedIcon },
  { id: "Dedicated IP", label: "Dedicated IP", icon: GlobeAsiaAustraliaIcon },
  { id: "Automation", label: "Automation", icon: LightBulbIcon },
  { id: "Split Tunnel", label: "Split Tunnel", icon: ArrowPathIcon },
  { id: "Multi-Hop", label: "Multi-Hop", icon: GlobeEuropeAfricaIcon },
  { id: "Account", label: "Account", icon: UserIcon },
  { id: "Help", label: "Help", icon: QuestionMarkCircleIcon },
];

export default function SettingsWindow({ onClose }: SettingsWindowProps) {
  const [activeTab, setActiveTab] = useState<Tab>("General");

  return (
    <div className="w-full h-full flex bg-gray-900 overflow-auto">
      {/* Main settings container with frosted-glass effect */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-5xl bg-gray-900/40 backdrop-blur-md">
          {/* Header */}
          <div className="flex justify-between items-center bg-gray-800/40 px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white tracking-tight">Settings</h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-700/60 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Main content area */}
          <div className="flex h-[500px]">
            {/* Left sidebar navigation */}
            <div className="w-64 bg-gray-800/40 border-r border-white/10 p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all text-left ${
                        isActive 
                          ? "bg-green-600 text-white" 
                          : "text-white hover:bg-gray-700/60"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-300"}`} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right content area */}
            <div className="flex-1 px-6 overflow-y-auto">
              {activeTab === "General" && <GeneralTab />}
              {activeTab === "Protocols" && <ProtocolsTab />}
              {activeTab === "Network" && <NetworkTab />}
              {activeTab === "Privacy" && <PrivacyTab />}
              {activeTab === "Dedicated IP" && <DedicatedIPTab />}
              {activeTab === "Automation" && <AutomationTab />}
              {activeTab === "Split Tunnel" && <SplitTunnelTab />}
              {activeTab === "Multi-Hop" && <MultiHopTab />}
              {activeTab === "Account" && <AccountTab />}
              {activeTab === "Help" && <HelpTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
