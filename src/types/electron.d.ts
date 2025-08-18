declare global {
  interface Window {
    electronAPI: {
      openSettings: () => Promise<void>;
      closeSettings: () => Promise<void>;
      resizeMainWindow: (width: number, height: number) => Promise<void>;
      resizeSettingsWindow: (width: number, height: number) => Promise<void>;
    };
  }
}

export {};
