import type { Server } from "../types";

export const SERVERS: Server[] = [
  { id: "us-ny", country: "United States", code: "US", city: "New York", latencyMs: 38 },
  { id: "us-la", country: "United States", code: "US", city: "Los Angeles", latencyMs: 72 },
  { id: "us-chi", country: "United States", code: "US", city: "Chicago", latencyMs: 45 },
  { id: "us-mia", country: "United States", code: "US", city: "Miami", latencyMs: 28 },
  { id: "us-sea", country: "United States", code: "US", city: "Seattle", latencyMs: 89 },
  { id: "de-fra", country: "Germany", code: "DE", city: "Frankfurt", latencyMs: 58 },
  { id: "de-ber", country: "Germany", code: "DE", city: "Berlin", latencyMs: 62 },
  { id: "de-mun", country: "Germany", code: "DE", city: "Munich", latencyMs: 65 },
  { id: "gb-lon", country: "United Kingdom", code: "GB", city: "London", latencyMs: 49 },
  { id: "gb-man", country: "United Kingdom", code: "GB", city: "Manchester", latencyMs: 52 },
  { id: "jp-tyo", country: "Japan", code: "JP", city: "Tokyo", latencyMs: 121 },
  { id: "jp-osk", country: "Japan", code: "JP", city: "Osaka", latencyMs: 125 },
  { id: "gr-ath", country: "Greece", code: "GR", city: "Athens", latencyMs: 35 },
];
