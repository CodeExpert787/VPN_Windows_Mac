import { useMemo, useState } from "react";
import { HeartIcon, MagnifyingGlassIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { SERVERS } from "../data/servers";
import { latencyColor } from "../utils/flags";
import type { Server } from "../types";

interface ServerListProps {
  onClose: () => void;
  onSelect?: (server: Server) => void;
}

// Function to get flag image path
const getFlagImage = (countryCode: string) => {
  const code = countryCode.toLowerCase();
  try {
    return new URL(`../assets/flag/${code}_flag.png`, import.meta.url).href;
  } catch {
    // Fallback to a default flag if the specific one doesn't exist
    return new URL(`../assets/flag/usa_flag.png`, import.meta.url).href;
  }
};

export default function ServerList({ onClose, onSelect }: ServerListProps) {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [expandedCountries, setExpandedCountries] = useState<Record<string, boolean>>({});

  const toggleFav = (id: string) =>
    setFavorites((f) => ({ ...f, [id]: !f[id] }));

  const toggleCountry = (country: string) =>
    setExpandedCountries((e) => ({ ...e, [country]: !e[country] }));

  const groupedServers = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = SERVERS.slice().sort((a, b) => a.latencyMs - b.latencyMs);
    const filtered = q
      ? base.filter(
          (s) =>
            s.country.toLowerCase().includes(q) ||
            s.city.toLowerCase().includes(q)
        )
      : base;

    // Group by country
    const grouped: Record<string, Server[]> = {};
    filtered.forEach(server => {
      if (!grouped[server.country]) {
        grouped[server.country] = [];
      }
      grouped[server.country].push(server);
    });

    // Sort countries by favorites first, then by lowest latency
    return Object.entries(grouped).sort(([, serversA], [, serversB]) => {
      const favA = serversA.some(s => favorites[s.id]);
      const favB = serversB.some(s => favorites[s.id]);
      if (favA !== favB) return favB ? 1 : -1;
      return Math.min(...serversA.map(s => s.latencyMs)) - Math.min(...serversB.map(s => s.latencyMs));
    });
  }, [search, favorites]);

  return (
    <div className="w-full h-full flex bg-gray-900 p-6">
      {/* Main server list container with frosted-glass effect */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full bg-gray-900/40 backdrop-blur-md overflow-hidden ">
          {/* Header */}
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-700/60 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            ←
          </button>

          {/* Search bar */}
          <div className="relative px-6 py-4">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-8 top-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search country or city…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/10 
                         focus:border-blue-500 text-base transition-all"
            />
          </div>

          {/* Server list */}
          <div className="max-h-[400px] overflow-y-auto">
            <ul className="space-y-1 px-3 pb-3">
              {groupedServers.map(([country, servers]) => {
                const isExpanded = expandedCountries[country];
                const shouldShowDropdown = servers.length > 1;

                return (
                  <li key={country} className="rounded-lg overflow-hidden">
                    {shouldShowDropdown ? (
                      // Country with dropdown
                      <>
                        <div
                          className="flex items-center justify-between py-3 px-3 hover:bg-gray-800/60 transition-colors cursor-pointer rounded-lg mx-1"
                          onClick={() => toggleCountry(country)}
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={getFlagImage(servers[0].code)} 
                              alt={`${country} flag`} 
                              className="w-7 h-5 object-cover rounded shadow-sm"
                            />
                            <div>
                              <div className="text-white font-medium leading-tight text-sm">{country}</div>
                              <div className="text-xs text-gray-400">{servers.length} cities</div>
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        
                        {isExpanded && (
                          <div className="bg-gray-800/40 mx-1 rounded-lg overflow-hidden">
                            {servers.map((server, serverIndex) => (
                              <div
                                key={server.id}
                                className={`flex items-center justify-between hover:bg-gray-700/60 transition-colors ${
                                  serverIndex !== servers.length - 1 ? 'border-b border-gray-700/50' : ''
                                }`}
                              >
                                <div
                                  className="flex items-center gap-3 text-left flex-1 py-2.5 px-4 pl-10 cursor-pointer"
                                  onClick={() => onSelect?.(server)}
                                  title="Connect to this server"
                                >
                                  <div>
                                    <div className="text-white font-medium leading-tight text-sm">{server.city}</div>
                                    <div className={`text-xs ${latencyColor(server.latencyMs)}`}>{server.latencyMs} ms</div>
                                  </div>
                                </div>

                                <div
                                  onClick={() => toggleFav(server.id)}
                                  className="p-1.5 mr-3 rounded-lg hover:bg-gray-600/60 transition-colors cursor-pointer"
                                  aria-label="Toggle favorite"
                                  title="Favorite"
                                >
                                  <HeartIcon className={`h-4 w-4 ${favorites[server.id] ? "text-pink-400" : "text-gray-400"}`} />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      // Individual servers (1 or fewer)
                      servers.map((server, serverIndex) => (
                        <div
                          key={server.id}
                          className={`flex items-center justify-between hover:bg-gray-800/60 transition-colors rounded-lg mx-1 ${
                            serverIndex !== servers.length - 1 ? 'border-b border-gray-700/50' : ''
                          }`}
                        >
                          <div
                            className="flex items-center gap-3 text-left flex-1 py-3 px-4 cursor-pointer"
                            onClick={() => onSelect?.(server)}
                            title="Connect to this server"
                          >
                            <img 
                              src={getFlagImage(server.code)} 
                              alt={`${server.country} flag`} 
                              className="w-7 h-5 object-cover rounded shadow-sm"
                            />
                            <div>
                              <div className="text-white font-medium leading-tight text-sm">{server.country} • {server.city}</div>
                              <div className={`text-xs ${latencyColor(server.latencyMs)}`}>{server.latencyMs} ms</div>
                            </div>
                          </div>

                          <div
                            onClick={() => toggleFav(server.id)}
                            className="p-1.5 mr-3 rounded-lg hover:bg-gray-600/60 transition-colors cursor-pointer"
                            aria-label="Toggle favorite"
                            title="Favorite"
                          >
                            <HeartIcon className={`h-4 w-4 ${favorites[server.id] ? "text-pink-400" : "text-gray-400"}`} />
                          </div>
                        </div>
                      ))
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
