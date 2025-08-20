import { invoke } from "@tauri-apps/api/core";

export type ConnectArgs = {
  ip: string; // e.g. "196.196.234.93:8080"
  ip_config?: string; // optional JSON: { "socks": "1080" }
  username?: string;
  password?: string;
};

export async function connectProxy(cfg: ConnectArgs): Promise<string> {
  return await invoke<string>("connect_proxy", { cfg });
}

export async function disconnectProxy(): Promise<boolean> {
  return await invoke<boolean>("disconnect_proxy");
}

export async function getOutboundIp(): Promise<string> {
  return await invoke<string>("get_outbound_ip");
}
