use tauri::Manager;
use serde::Deserialize;

#[tauri::command]
async fn get_public_ip() -> Result<String, String> {
    let resp = reqwest::Client::new()
        .get("https://api.ipify.org?format=json")
        .send().await.map_err(|e| e.to_string())?
        .json::<serde_json::Value>().await.map_err(|e| e.to_string())?;
    Ok(resp.get("ip").and_then(|v| v.as_str()).unwrap_or("").to_string())
}

#[derive(Deserialize)]
struct ProxyArgs {
    host: String,
    port: u16,
}

#[tauri::command]
fn enable_proxy(args: ProxyArgs) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        use winreg::enums::*;
        use winreg::RegKey;
        use std::ptr;

        let hkcu = RegKey::predef(HKEY_CURRENT_USER);
        let path = "Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings";
        let (key, _) = hkcu.create_subkey(path).map_err(|e| e.to_string())?;
        key.set_value("ProxyEnable", &1u32).map_err(|e| e.to_string())?;
        // For SOCKS: use format!("socks={}:{}", args.host, args.port)
        key.set_value("ProxyServer", &format!("{}:{}", args.host, args.port)).map_err(|e| e.to_string())?;

        // Broadcast settings change (best-effort)
        unsafe {
            use windows_sys::Win32::UI::WindowsAndMessaging::{SendMessageTimeoutA, HWND_BROADCAST, SMTO_ABORTIFHUNG, WM_SETTINGCHANGE};
            use windows_sys::Win32::Foundation::LPARAM;
            SendMessageTimeoutA(
                HWND_BROADCAST,
                WM_SETTINGCHANGE,
                0,
                "Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\0".as_ptr() as LPARAM,
                SMTO_ABORTIFHUNG,
                5000,
                std::ptr::null_mut(),
            );
        }

        // Optional: WinHTTP (system services)
        let _ = std::process::Command::new("netsh")
            .args(["winhttp", "set", "proxy", &format!("{}:{}", args.host, args.port)])
            .output();

        Ok(())
    }

    #[cfg(target_os = "macos")]
    {
        use std::process::Command;
        // Apply to all network services
        let services = Command::new("networksetup")
            .args(["-listallnetworkservices"])
            .output().map_err(|e| e.to_string())?;
        let text = String::from_utf8_lossy(&services.stdout);
        for line in text.lines().filter(|l| !l.trim().is_empty() && !l.contains('*')) {
            // HTTP & HTTPS proxies
            let _ = Command::new("networksetup").args(["-setwebproxy", line, &args.host, &args.port.to_string()]).status();
            let _ = Command::new("networksetup").args(["-setsecurewebproxy", line, &args.host, &args.port.to_string()]).status();
            let _ = Command::new("networksetup").args(["-setwebproxystate", line, "on"]).status();
            let _ = Command::new("networksetup").args(["-setsecurewebproxystate", line, "on"]).status();

            // SOCKS example (uncomment if you use SOCKS5)
            // let _ = Command::new("networksetup").args(["-setsocksfirewallproxy", line, &args.host, &args.port.to_string()]).status();
            // let _ = Command::new("networksetup").args(["-setsocksfirewallproxystate", line, "on"]).status();
        }
        Ok(())
    }

    #[cfg(not(any(target_os = "windows", target_os = "macos")))]
    {
        Err("Proxy enabling is only implemented for Windows and macOS in this sample.".into())
    }
}

#[tauri::command]
fn disable_proxy() -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        use winreg::enums::*;
        use winreg::RegKey;
        use std::ptr;

        let hkcu = RegKey::predef(HKEY_CURRENT_USER);
        let path = "Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings";
        if let Ok((key, _)) = hkcu.create_subkey(path) {
            let _ = key.set_value("ProxyEnable", &0u32);
            let _ = key.delete_value("ProxyServer");
        }

        unsafe {
            use windows_sys::Win32::UI::WindowsAndMessaging::{SendMessageTimeoutA, HWND_BROADCAST, SMTO_ABORTIFHUNG, WM_SETTINGCHANGE};
            use windows_sys::Win32::Foundation::LPARAM;
            SendMessageTimeoutA(
                HWND_BROADCAST,
                WM_SETTINGCHANGE,
                0,
                "Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\0".as_ptr() as LPARAM,
                SMTO_ABORTIFHUNG,
                5000,
                std::ptr::null_mut(),
            );
        }

        let _ = std::process::Command::new("netsh")
            .args(["winhttp", "reset", "proxy"])
            .output();

        Ok(())
    }

    #[cfg(target_os = "macos")]
    {
        use std::process::Command;
        let services = Command::new("networksetup")
            .args(["-listallnetworkservices"])
            .output().map_err(|e| e.to_string())?;
        let text = String::from_utf8_lossy(&services.stdout);
        for line in text.lines().filter(|l| !l.trim().is_empty() && !l.contains('*')) {
            let _ = Command::new("networksetup").args(["-setwebproxystate", line, "off"]).status();
            let _ = Command::new("networksetup").args(["-setsecurewebproxystate", line, "off"]).status();
            let _ = Command::new("networksetup").args(["-setsocksfirewallproxystate", line, "off"]).status();
        }
        Ok(())
    }

    #[cfg(not(any(target_os = "windows", target_os = "macos")))]
    {
        Err("Proxy disabling is only implemented for Windows and macOS in this sample.".into())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_public_ip,
            enable_proxy,
            disable_proxy
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
