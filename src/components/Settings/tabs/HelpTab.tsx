export default function HelpTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Help</h3>
      <p className="text-gray-400">Help and support resources.</p>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 bg-gray-800/40 rounded-lg border border-white/10">
          <h4 className="text-white font-medium mb-3">Documentation</h4>
          <div className="space-y-2">
            <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm py-2">
              Getting Started Guide
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm py-2">
              Troubleshooting
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm py-2">
              FAQ
            </button>
          </div>
        </div>
        
        <div className="p-6 bg-gray-800/40 rounded-lg border border-white/10">
          <h4 className="text-white font-medium mb-3">Support</h4>
          <div className="space-y-2">
            <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm py-2">
              Contact Support
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm py-2">
              Live Chat
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm py-2">
              Community Forum
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-800/40 rounded-lg border border-white/10">
        <h4 className="text-white font-medium mb-3">System Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Version:</span>
            <span className="text-white ml-2">1.0.0</span>
          </div>
          <div>
            <span className="text-gray-400">Build:</span>
            <span className="text-white ml-2">2024.01.15</span>
          </div>
          <div>
            <span className="text-gray-400">Platform:</span>
            <span className="text-white ml-2">Windows 10</span>
          </div>
          <div>
            <span className="text-gray-400">Architecture:</span>
            <span className="text-white ml-2">x64</span>
          </div>
        </div>
      </div>
    </div>
  );
}
