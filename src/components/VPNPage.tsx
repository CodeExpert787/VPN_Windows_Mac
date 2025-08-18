import { useState } from "react";
import { ChevronLeftIcon, EllipsisHorizontalIcon, BookmarkIcon, BellIcon, GlobeAltIcon, LightBulbIcon, EllipsisVerticalIcon, ArrowUpIcon, ArrowDownIcon, ClockIcon, BoltIcon, ShieldCheckIcon, KeyIcon, PlusIcon, LockClosedIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon as ChevronLeftSolid, ChevronRightIcon as ChevronRightSolid } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import type { Server } from "../types";

interface VPNPageProps {
  onBack: () => void;
  selectedServer?: Server | null;
}

export default function VPNPage({ onBack, selectedServer }: VPNPageProps) {
  const [snoozeTime, setSnoozeTime] = useState(5);

  const quickConnectCountries = [
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
    { code: "DK", name: "Denmark", flag: "🇩🇰" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "NO", name: "Norway", flag: "🇳🇴" }
  ];

  const quickSettings = [
    { icon: BellIcon, active: true, label: "Notifications" },
    { icon: PlusIcon, active: false, label: "Block Ads" },
    { icon: GlobeAltIcon, active: true, label: "DNS" },
    { icon: LightBulbIcon, active: true, label: "Split Tunnel" },
    { icon: PlusIcon, active: false, label: "Malware Block" },
    { icon: LightBulbIcon, active: true, label: "Automation" },
    { icon: EllipsisVerticalIcon, active: false, label: "More" },
    { icon: EllipsisVerticalIcon, active: false, label: "More" }
  ];

  return (
    <div className="w-full h-full bg-gray-900 text-white p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-300" />
          </button>
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-white">EnterVPN</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* VPN SERVER Section */}
        <div className="bg-gray-800/40 rounded-xl p-6 border border-white/10">
          <h2 className="text-gray-300 text-sm font-medium mb-3">VPN SERVER</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-semibold text-white">
                {selectedServer ? `${selectedServer.city}, ${selectedServer.country}` : "Auto (JP Tokyo)"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-700/60 rounded-lg transition-colors">
                <ChevronLeftSolid className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700/60 rounded-lg transition-colors">
                <ChevronRightSolid className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700/60 rounded-lg transition-colors">
                <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="flex gap-8 mt-4">
            <div>
              <span className="text-gray-400 text-sm">IP</span>
              <p className="text-white font-mono">123.45.67.89</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">VPN IP</span>
              <p className="text-white font-mono">---</p>
            </div>
          </div>
        </div>

        {/* DEFAULT DISPLAY Button */}
        <div className="text-center">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors font-medium">
            DEFAULT DISPLAY
          </button>
        </div>

        {/* QUICK CONNECT Section */}
        <div className="bg-gray-800/40 rounded-xl p-6 border border-white/10">
          <h2 className="text-gray-300 text-sm font-medium mb-3">QUICK CONNECT</h2>
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              {quickConnectCountries.map((country) => (
                <button
                  key={country.code}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-gray-700/60 rounded-lg transition-colors"
                >
                  <div className="text-2xl">{country.flag}</div>
                  <span className="text-xs text-gray-400">{country.name}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-700/60 rounded-lg transition-colors">
                <EllipsisHorizontalIcon className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700/60 rounded-lg transition-colors">
                <BookmarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* PERFORMANCE Section */}
        <div className="bg-gray-800/40 rounded-xl p-6 border border-white/10">
          <h2 className="text-gray-300 text-sm font-medium mb-3">PERFORMANCE</h2>
          <div className="bg-gray-700/40 rounded-lg h-32 mb-4 flex items-center justify-center">
            <span className="text-gray-500">Performance Graph</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <ArrowDownIcon className="h-5 w-5 text-green-500" />
              <span className="text-gray-400 text-sm">Download</span>
              <span className="text-white">---</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpIcon className="h-5 w-5 text-white" />
              <span className="text-gray-400 text-sm">Upload</span>
              <span className="text-white">---</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400 text-sm">Latency</span>
              <span className="text-white">---</span>
            </div>
          </div>
        </div>

        {/* USAGE Section */}
        <div className="bg-gray-800/40 rounded-xl p-6 border border-white/10">
          <h2 className="text-gray-300 text-sm font-medium mb-3">USAGE</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-gray-400 text-sm">Download</span>
              <p className="text-white text-lg">0 KB</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Upload</span>
              <p className="text-white text-lg">0 KB</p>
            </div>
          </div>
        </div>

        {/* QUICK SETTINGS Section */}
        <div className="bg-gray-800/40 rounded-xl p-6 border border-white/10">
          <h2 className="text-gray-300 text-sm font-medium mb-3">QUICK SETTINGS</h2>
          <div className="grid grid-cols-4 gap-4">
            {quickSettings.map((setting, index) => {
              const Icon = setting.icon;
              return (
                <button
                  key={index}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                    setting.active ? 'bg-green-600/20 text-green-400' : 'hover:bg-gray-700/60 text-gray-300'
                  }`}
                >
                  <Icon className={`h-6 w-6 ${setting.active ? 'text-green-400' : 'text-gray-400'}`} />
                  <span className="text-xs">{setting.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SUBSCRIPTION Section */}
        <div className="bg-gray-800/40 rounded-xl p-6 border border-white/10">
          <h2 className="text-gray-300 text-sm font-medium mb-3">SUBSCRIPTION</h2>
          <div className="text-white">---</div>
        </div>

        {/* CONNECTION Section */}
        <div className="bg-gray-800/40 rounded-xl p-6 border border-white/10">
          <h2 className="text-gray-300 text-sm font-medium mb-3">CONNECTION</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <BoltIcon className="h-5 w-5 text-yellow-400" />
                <span className="text-white">OpenVPN®</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
                <span className="text-white">Default</span>
              </div>
              <div className="flex items-center gap-3">
                <KeyIcon className="h-5 w-5 text-green-400" />
                <span className="text-white">GCM</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <PlusIcon className="h-5 w-5 text-purple-400" />
                <span className="text-white">UDP</span>
              </div>
              <div className="flex items-center gap-3">
                <LockClosedIcon className="h-5 w-5 text-red-400" />
                <span className="text-white">AES-128-GCM</span>
              </div>
              <div className="flex items-center gap-3">
                <PlusIcon className="h-5 w-5 text-indigo-400" />
                <span className="text-white">RSA-4096</span>
              </div>
            </div>
          </div>
        </div>

        {/* VPN SNOOZE Section */}
        <div className="bg-gray-800/40 rounded-xl p-6 border border-white/10">
          <h2 className="text-gray-300 text-sm font-medium mb-3">VPN SNOOZE</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSnoozeTime(Math.max(1, snoozeTime - 1))}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
              >
                -
              </button>
              <div className="w-16 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-white font-mono">
                {snoozeTime}:00
              </div>
              <button
                onClick={() => setSnoozeTime(Math.min(60, snoozeTime + 1))}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
              Snooze
            </button>
            <button className="p-2 hover:bg-gray-700/60 rounded-lg transition-colors">
              <InformationCircleIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
