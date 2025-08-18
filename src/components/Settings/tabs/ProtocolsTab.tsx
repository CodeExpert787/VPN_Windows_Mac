import { useState } from "react";

export default function ProtocolsTab() {
  const [protocol, setProtocol] = useState("WireGuard");
  const [transport, setTransport] = useState("UDP");
  const [port, setPort] = useState("Auto");

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Protocols</h3>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <Dropdown 
            label="VPN Protocol" 
            value={protocol} 
            options={["WireGuard", "OpenVPN", "IKEv2"]} 
            onChange={setProtocol}
          />
          <Dropdown 
            label="Transport" 
            value={transport} 
            options={["UDP", "TCP"]} 
            onChange={setTransport}
          />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Dropdown 
            label="Port" 
            value={port} 
            options={["Auto", "1194", "443", "8080"]} 
            onChange={setPort}
          />
          <div className="p-4 bg-gray-800/40 rounded-lg border border-white/10">
            <h4 className="text-white font-medium mb-2">Current Protocol: {protocol}</h4>
            <p className="text-gray-400 text-sm">
              {protocol === "WireGuard" && "Modern, fast VPN protocol with excellent performance."}
              {protocol === "OpenVPN" && "Reliable and secure VPN protocol with wide compatibility."}
              {protocol === "IKEv2" && "Fast and secure protocol, great for mobile devices."}
            </p>
          </div>
        </div>
      </div>

      {/* Advanced settings */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Advanced Protocol Settings</h4>
        <div className="grid grid-cols-2 gap-6">
          <Checkbox 
            label="Enable Protocol Fallback" 
            checked={true}
          />
          <Checkbox 
            label="Force Protocol Selection" 
            checked={false}
          />
          <Checkbox 
            label="Auto-detect Best Protocol" 
            checked={true}
          />
          <Checkbox 
            label="Log Protocol Details" 
            checked={false}
          />
        </div>
      </div>
    </div>
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
