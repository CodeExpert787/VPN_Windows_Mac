import { useState } from "react";

export default function PrivacyTab() {
  const [killSwitch, setKillSwitch] = useState(true);
  const [mace, setMace] = useState(true);
  const [blockIpv6, setBlockIpv6] = useState(true);
  const [preventLeaks, setPreventLeaks] = useState(true);
  const [blockAds, setBlockAds] = useState(true);
  const [blockTrackers, setBlockTrackers] = useState(true);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Privacy</h3>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <Checkbox 
            label="Enable Kill Switch" 
            checked={killSwitch}
            onChange={setKillSwitch}
          />
          <Checkbox 
            label="Enable MACE (Ad & Tracker Blocker)" 
            checked={mace}
            onChange={setMace}
          />
          <Checkbox 
            label="Block IPv6 Traffic" 
            checked={blockIpv6}
            onChange={setBlockIpv6}
          />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Checkbox 
            label="Prevent DNS Leaks" 
            checked={preventLeaks}
            onChange={setPreventLeaks}
          />
          <Checkbox 
            label="Block Advertisements" 
            checked={blockAds}
            onChange={setBlockAds}
          />
          <Checkbox 
            label="Block Tracking Scripts" 
            checked={blockTrackers}
            onChange={setBlockTrackers}
          />
        </div>
      </div>

      {/* Privacy information */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Privacy Status</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-gray-800/40 rounded-lg border border-white/10">
            <h5 className="text-white font-medium mb-2">Current Protection Level</h5>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm font-medium">Maximum Protection</span>
            </div>
            <p className="text-gray-400 text-xs mt-2">All privacy features are enabled</p>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-white/10">
            <h5 className="text-white font-medium mb-2">Trackers Blocked Today</h5>
            <p className="text-2xl font-bold text-green-400">1,247</p>
            <p className="text-gray-400 text-xs">Last 24 hours</p>
          </div>
        </div>
      </div>

      {/* Advanced privacy settings */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Advanced Privacy Settings</h4>
        <div className="grid grid-cols-2 gap-6">
          <Checkbox 
            label="WebRTC Protection" 
            checked={true}
            onChange={() => {}}
          />
          <Checkbox 
            label="Fingerprint Protection" 
            checked={true}
            onChange={() => {}}
          />
          <Checkbox 
            label="Location Spoofing" 
            checked={false}
            onChange={() => {}}
          />
          <Checkbox 
            label="Time Zone Protection" 
            checked={true}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Privacy policy link */}
      <div className="border-t border-white/10 pt-6 text-center">
        <p className="text-gray-400 text-sm mb-2">Learn more about our privacy features</p>
        <button className="text-blue-400 hover:text-blue-300 text-sm underline">
          Privacy Policy & Settings Guide
        </button>
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
