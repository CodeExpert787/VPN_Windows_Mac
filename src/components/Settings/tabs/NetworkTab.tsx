import { useState } from "react";

export default function NetworkTab() {
  const [allowLanTraffic, setAllowLanTraffic] = useState(false);
  const [dnsProvider, setDnsProvider] = useState("PIA DNS");
  const [customDns, setCustomDns] = useState("");
  const [blockIpv6, setBlockIpv6] = useState(true);
  const [allowLocalhost, setAllowLocalhost] = useState(true);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Network</h3>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <Checkbox 
            label="Allow LAN Traffic" 
            checked={allowLanTraffic}
            onChange={setAllowLanTraffic}
          />
          <Checkbox 
            label="Block IPv6 Traffic" 
            checked={blockIpv6}
            onChange={setBlockIpv6}
          />
          <Checkbox 
            label="Allow Localhost Access" 
            checked={allowLocalhost}
            onChange={setAllowLocalhost}
          />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Dropdown 
            label="DNS Provider" 
            value={dnsProvider} 
            options={["PIA DNS", "Custom DNS", "System DNS", "Cloudflare", "Google DNS"]} 
            onChange={setDnsProvider}
          />
          {dnsProvider === "Custom DNS" && (
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Custom DNS Servers</label>
              <input
                type="text"
                placeholder="8.8.8.8, 1.1.1.1"
                value={customDns}
                onChange={(e) => setCustomDns(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          placeholder-gray-400 transition-all text-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* Network information */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Current Network Status</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-gray-800/40 rounded-lg border border-white/10">
            <h5 className="text-white font-medium mb-2">Current DNS</h5>
            <p className="text-gray-400 text-sm font-mono">192.168.1.1</p>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-white/10">
            <h5 className="text-white font-medium mb-2">Network Interface</h5>
            <p className="text-gray-400 text-sm">Wi-Fi (802.11ac)</p>
          </div>
        </div>
      </div>

      {/* Advanced network settings */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Advanced Network Settings</h4>
        <div className="grid grid-cols-2 gap-6">
          <Checkbox 
            label="Enable Network Monitoring" 
            checked={true}
          />
          <Checkbox 
            label="Auto-reconnect on Network Change" 
            checked={true}
          />
          <Checkbox 
            label="Prevent DNS Leaks" 
            checked={true}
          />
          <Checkbox 
            label="Use Custom MTU" 
            checked={false}
          />
        </div>
      </div>
    </div>
  );
}

function Checkbox({ label, checked }: { label: string; checked: boolean; onChange?: (checked: boolean) => void }) {
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

function Dropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-gray-300 text-sm font-medium">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
