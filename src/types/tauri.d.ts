declare global {
  interface Window {
    __TAURI__?: {
      window: {
        getCurrent: () => any;
      };
    };
  }
}

export {};
