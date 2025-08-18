import { useState } from "react";

export default function DedicatedIPTab() {
  const [dedicatedIp, setDedicatedIp] = useState("");
  const [location, setLocation] = useState("United States");
  const [isActive] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Dedicated IP</h3>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium">Dedicated IP Address</label>
            <input
              type="text"
              placeholder="Enter dedicated IP token"
              value={dedicatedIp}
              onChange={(e) => setDedicatedIp(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        placeholder-gray-400 transition-all text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium">Location</label>
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="Japan">Japan</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/40 rounded-lg border border-white/10">
            <h4 className="text-white font-medium mb-2">Current Status</h4>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <span className={`text-sm font-medium ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-gray-400 text-xs">
              {isActive ? 'Dedicated IP is currently active' : 'No dedicated IP configured'}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          Save Token
        </button>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Test Connection
        </button>
        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
          Remove IP
        </button>
      </div>

      {/* Information */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">About Dedicated IPs</h4>
        <div className="space-y-3 text-gray-300 text-sm">
          <p>• A dedicated IP gives you a consistent IP address that only you use</p>
          <p>• Useful for accessing services that require IP whitelisting</p>
          <p>• Provides better stability for streaming and gaming</p>
          <p>• Available on Premium and Enterprise plans</p>
        </div>
      </div>
    </div>
  );
}
