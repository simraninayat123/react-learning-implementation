import { useState, useSyncExternalStore } from "react";

const storageChanged = "local-storage-changed";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(storageChanged, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(storageChanged, onChange);
  };
}

export function useLocalStorage(key: string, defaultValue: string) {
  const [unsaved, setUnsaved] = useState<{ key: string; value: string } | null>(null);

  const storedValue = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(key) ?? defaultValue;
      } catch {
        return defaultValue;
      }
    },
    () => defaultValue,
  );

  function setValue(value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      setUnsaved({ key, value });
      return;
    }

    setUnsaved(null);
    window.dispatchEvent(new Event(storageChanged));
  }

  return [unsaved?.key === key ? unsaved.value : storedValue, setValue] as const;
}
