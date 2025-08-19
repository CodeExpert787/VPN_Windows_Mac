export type Protocol = "WireGuard" | "OpenVPN";
export type Transport = "UDP" | "TCP";

export interface Server {
  id: string;
  country: string;
  code: string;      // ISO-2 country code
  city: string;
  ip: string;
  favorite?: boolean;
}

// Import electron types
import './types/electron';
