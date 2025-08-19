import type { Server } from "../types";

const DEFAULT_SERVERS: Server[] = [
  { id: "us-ny", country: "United States", code: "US", city: "New York", ip: "38" },
  { id: "us-la", country: "United States", code: "US", city: "Los Angeles", ip: "72" },
  { id: "us-chi", country: "United States", code: "US", city: "Chicago", ip: "45" },
  { id: "us-mia", country: "United States", code: "US", city: "Miami", ip: "28" },
  { id: "us-sea", country: "United States", code: "US", city: "Seattle", ip: "89" },
  { id: "de-fra", country: "Germany", code: "DE", city: "Frankfurt", ip: "58" },
  { id: "de-ber", country: "Germany", code: "DE", city: "Berlin", ip: "62" },
  { id: "de-mun", country: "Germany", code: "DE", city: "Munich", ip: "65" },
  { id: "gb-lon", country: "United Kingdom", code: "GB", city: "London", ip: "49" },
  { id: "gb-man", country: "United Kingdom", code: "GB", city: "Manchester", ip: "52" },
  { id: "jp-tyo", country: "Japan", code: "JP", city: "Tokyo", ip: "121" },
  { id: "jp-osk", country: "Japan", code: "JP", city: "Osaka", ip: "125" },
  { id: "gr-ath", country: "Greece", code: "GR", city: "Athens", ip: "35" },
];

function safeParse<T = unknown>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function toId(code: string, city: string): string {
  const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `${code.toLowerCase()}-${citySlug}`;
}

function isServerArrayLike(data: any): data is Server[] {
  return Array.isArray(data) && data.every((s) => s && typeof s === 'object' && 'country' in s && 'city' in s);
}

function mapUnknownArrayToServers(arr: any[]): Server[] | null {
  try {
    console.log("arr", arr);
    const mapped = arr.map((item, index) => {
      const country: string = item.countryName || item.country_name || item.cn || item.c || "";
      const city: string = item.server_city || item.location || item.l || "";
      const code = (country || "").toString().slice(0, 2).toUpperCase();
      const ip = item.ip;
      if (!country || !city || !code) return null;
      return {
        id: item.id || toId(code, city) || `srv-${index}`,
        country,
        code,
        city,
        ip: ip,
      } as Server;
    }).filter(Boolean) as Server[];
    return mapped.length ? mapped : null;
  } catch {
    return null;
  }
}

function loadServersFromStorage(): Server[] | null {
  if (typeof window === 'undefined') return null;
  // Try explicit 'servers' first
  const storedServers = safeParse<any[]>(localStorage.getItem('proxies'));
  // console.log("storedServers", storedServers);
  if (storedServers) {
    if (isServerArrayLike(storedServers)) return storedServers as Server[];
    const mapped = mapUnknownArrayToServers(storedServers);
    if (mapped) return mapped;
  }
  // Try 'proxies' bundle formats
  const proxies = safeParse<any>(localStorage.getItem('proxies'));
  if (Array.isArray(proxies)) {
    const mapped = mapUnknownArrayToServers(proxies);
    if (mapped) return mapped;
  } else if (proxies && typeof proxies === 'object') {
    // Look for arrays in common keys
    const possibleArrays = [
      proxies.servers,
      proxies.nodes,
      proxies.locations,
      proxies.endpoints,
      proxies.proxy_list,
    ].filter(Boolean);
    for (const arr of possibleArrays) {
      if (Array.isArray(arr)) {
        const mapped = mapUnknownArrayToServers(arr);
        if (mapped) return mapped;
      }
    }
  }
  return null;
}

export const SERVERS: Server[] = loadServersFromStorage() ?? DEFAULT_SERVERS;
