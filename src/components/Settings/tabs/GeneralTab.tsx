import { useState } from "react";

export default function GeneralTab() {
  const [settings, setSettings] = useState({
    launchOnStartup: false,
    connectOnLaunch: false,
    showGeoRegions: true,
    showNotifications: true,
    allowBackgroundChecks: true,
    language: "English",
    theme: "Dark",
    trayIconStyle: "System",
    dashboardAppearance: "Attached to Tray"
  });

  const updateSetting = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">General</h3>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <Checkbox 
            label="Launch on System Startup" 
            checked={settings.launchOnStartup}
            onChange={(checked) => updateSetting('launchOnStartup', checked)}
          />
          <Checkbox 
            label="Connect on Launch" 
            checked={settings.connectOnLaunch}
            onChange={(checked) => updateSetting('connectOnLaunch', checked)}
          />
          <Checkbox 
            label="Show Geo-Located Regions" 
            checked={settings.showGeoRegions}
            onChange={(checked) => updateSetting('showGeoRegions', checked)}
          />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Checkbox 
            label="Show Desktop Notifications" 
            checked={settings.showNotifications}
            onChange={(checked) => updateSetting('showNotifications', checked)}
          />
          <Checkbox 
            label="Allow Background Latency Checks" 
            checked={settings.allowBackgroundChecks}
            onChange={(checked) => updateSetting('allowBackgroundChecks', checked)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <Dropdown 
            label="Language" 
            value={settings.language} 
            options={["English", "Spanish", "French", "German"]} 
          />
          <Dropdown 
            label="Theme" 
            value={settings.theme} 
            options={["Dark", "Light", "System"]} 
          />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Dropdown 
            label="Tray Icon Style" 
            value={settings.trayIconStyle} 
            options={["System", "Custom", "Hidden"]} 
            info={true}
          />
          <Dropdown 
            label="Dashboard Appearance" 
            value={settings.dashboardAppearance} 
            options={["Attached to Tray", "Floating", "Minimized"]} 
          />
        </div>
      </div>

      {/* Reset button */}
      <div className="flex justify-center pt-4">
        <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
          Reset All Settings
        </button>
      </div>
    </div>
  );
}

/* Reusable UI Components */
function Checkbox({ label, checked }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
        checked ? "bg-green-500 border-green-500" : "border-gray-400"
      }`}>
        {checked && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <span className="text-white text-sm">{label}</span>
    </label>
  );
}

function Dropdown({ label, value, options, info }: { label: string; value: string; options: string[]; info?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-gray-300 text-sm font-medium">{label}</label>
        {info && (
          <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center text-xs text-gray-300">
            i
          </div>
        )}
      </div>
      <select className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm">
        {options.map((opt, i) => (
          <option key={i} selected={opt === value}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
