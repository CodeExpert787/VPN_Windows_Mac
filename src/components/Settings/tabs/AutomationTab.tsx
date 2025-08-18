import { useState } from "react";

export default function AutomationTab() {
  const [connectionAutomation, setConnectionAutomation] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-white">Automation</h2>

      {/* Connection Automation toggle + description */}
      <div className="space-y-2">
        <label className="inline-flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={connectionAutomation}
            onChange={(e) => setConnectionAutomation(e.target.checked)}
            className="h-5 w-5 rounded border border-white/20 bg-transparent text-blue-500
                       checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-400/60"
          />
          <span className="text-white text-base">Connection Automation</span>
        </label>
        <p className="text-gray-400">
          Create rules to automatically connect or disconnect the VPN when you join a particular network.
        </p>
      </div>

      {/* Rules section */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">
          Your Automation Rules
        </h3>

        <div className="rounded-2xl border border-white/10 bg-gray-800/40 p-8 md:p-12">
          {/* Empty state */}
          <div className="flex flex-col items-center justify-center text-center gap-5">
            {/* Icon circle */}
            <div className="h-16 w-16 rounded-full border border-white/10 bg-gray-900/50 grid place-items-center">
              {/* Lightbulb icon (inline SVG to avoid extra deps) */}
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.5 18h5M10 21h4M8 10a4 4 0 118 0c0 1.54-.74 2.62-1.62 3.39-.47.4-.86.86-1.08 1.41-.14.35-.23.74-.23 1.2h-2c0-.46-.09-.85-.23-1.2-.22-.55-.61-1.01-1.08-1.41C8.74 12.62 8 11.54 8 10z"
                />
              </svg>
            </div>

            <p className="text-gray-300 text-base">
              You don’t have any automation rules
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/15
                         px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/5
                         transition-colors"
              onClick={() => {
                // TODO: open create-rule modal
              }}
              aria-label="Add Automation Rule"
            >
              <span className="text-lg leading-none">＋</span>
              Add Automation Rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
