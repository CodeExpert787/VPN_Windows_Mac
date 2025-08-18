import { useState } from "react";

export default function AccountTab() {
  const [username, setUsername] = useState("johndoe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [subscriptionType, setSubscriptionType] = useState("Premium");
  const [expiryDate, setExpiryDate] = useState("2024-12-31");

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Account</h3>
      
      {/* Account Information */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium">Subscription Type</label>
            <select 
              value={subscriptionType}
              onChange={(e) => setSubscriptionType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            >
              <option value="Free">Free</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium">Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Subscription Status</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-gray-800/40 rounded-lg border border-white/10">
            <h5 className="text-white font-medium mb-2">Current Plan</h5>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm font-medium">{subscriptionType}</span>
            </div>
            <p className="text-gray-400 text-xs">Active subscription</p>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-white/10">
            <h5 className="text-white font-medium mb-2">Days Remaining</h5>
            <p className="text-2xl font-bold text-blue-400">45</p>
            <p className="text-gray-400 text-xs">Until {expiryDate}</p>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Account Actions</h4>
        <div className="grid grid-cols-2 gap-4">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Change Password
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            Upgrade Plan
          </button>
          <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
            Billing History
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            Log Out
          </button>
        </div>
      </div>

      {/* Account Security */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Security Settings</h4>
        <div className="grid grid-cols-2 gap-6">
          <Checkbox 
            label="Two-Factor Authentication" 
            checked={true}
          />
          <Checkbox 
            label="Login Notifications" 
            checked={true}
          />
          <Checkbox 
            label="Session Management" 
            checked={false}
          />
          <Checkbox 
            label="API Access" 
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
