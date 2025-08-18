import { useState } from "react";

export default function SplitTunnelTab() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page title */}
      <h2 className="text-3xl font-bold text-white">Split Tunnel</h2>

      {/* Toggle + helper text */}
      <div className="space-y-2">
        <label className="inline-flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-5 w-5 rounded border border-white/20 bg-transparent text-blue-500
                       checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-400/60"
          />
          <span className="text-white text-base">Split Tunnel</span>
        </label>
        <p className="text-gray-400">
          Enabling this feature will install the split tunnel filter.
        </p>
      </div>

      {/* Actions + Rules */}
      <div className="space-y-4">
        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/15
                       px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/5 transition-colors"
            onClick={() => {/* TODO: open add application modal */}}
          >
            <span className="text-lg leading-none">＋</span>
            Add Application
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/15
                       px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/5 transition-colors"
            onClick={() => {/* TODO: open add IP modal */}}
          >
            <span className="text-lg leading-none">＋</span>
            Add IP Address
          </button>
        </div>

        {/* Rules list */}
        <div className="space-y-3">
          <RuleRow
            iconGrid
            label="All Other Apps"
            actionLabel="Use VPN"
          />
          <RuleRow
            iconGrid
            label="Name Servers"
            actionLabel="Follow App Rules"
          />
        </div>
      </div>

      {/* Footer hint */}
      <p className="text-gray-500 text-sm">
        Apps may need to be restarted for changes to be applied.
      </p>
    </div>
  );
}

/* ---------- subcomponents ---------- */

function RuleRow({
  label,
  actionLabel,
  iconGrid = false,
}: {
  label: string;
  actionLabel: string;
  iconGrid?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-gray-800/40 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-md border border-white/10 bg-gray-900/60 grid place-items-center">
          {iconGrid ? (
            /* simple “app grid” glyph */
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-300" fill="currentColor">
              <rect x="4" y="4" width="6" height="6" rx="1" />
              <rect x="14" y="4" width="6" height="6" rx="1" />
              <rect x="4" y="14" width="6" height="6" rx="1" />
              <rect x="14" y="14" width="6" height="6" rx="1" />
            </svg>
          ) : (
            <div className="h-4 w-4 bg-gray-300 rounded-sm" />
          )}
        </div>
        <span className="text-gray-200 font-medium">{label}</span>
      </div>

      {/* Right-side select button */}
      <button
        type="button"
        className="inline-flex items-center justify-between gap-3 rounded-md border border-white/10
                   bg-gray-900/60 px-3 py-2 text-sm text-gray-200 hover:bg-gray-900/80 transition-colors"
        onClick={() => {/* TODO: open dropdown menu */}}
      >
        {actionLabel}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
