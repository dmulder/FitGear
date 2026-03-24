import type { EquipmentId } from "@/data/exercises";

const DB_NAME = "fitgear-db";
const DB_VERSION = 1;
const STORE_NAME = "settings";
const SETTINGS_KEY = "selected-equipment";
const LOCAL_STORAGE_KEY = "fitgear:selected-equipment";

interface EquipmentSettingsRecord {
  key: string;
  value: EquipmentId[];
}

function parseEquipmentList(value: unknown): EquipmentId[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is EquipmentId => typeof item === "string");
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error ?? new Error("Failed to open IndexedDB"));
    };
  });
}

async function readFromIndexedDb(): Promise<EquipmentId[]> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(SETTINGS_KEY);

    request.onsuccess = () => {
      const record = request.result as EquipmentSettingsRecord | undefined;
      resolve(parseEquipmentList(record?.value));
    };

    request.onerror = () => {
      reject(request.error ?? new Error("Failed to read selected equipment"));
    };

    tx.oncomplete = () => {
      db.close();
    };

    tx.onerror = () => {
      reject(tx.error ?? new Error("IndexedDB transaction failed"));
    };
  });
}

async function writeToIndexedDb(selectedEquipment: EquipmentId[]): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const record: EquipmentSettingsRecord = {
      key: SETTINGS_KEY,
      value: selectedEquipment,
    };

    const request = store.put(record);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error ?? new Error("Failed to save selected equipment"));
    };

    tx.oncomplete = () => {
      db.close();
    };

    tx.onerror = () => {
      reject(tx.error ?? new Error("IndexedDB transaction failed"));
    };
  });
}

export async function loadSelectedEquipment(): Promise<EquipmentId[]> {
  if (typeof window === "undefined") return [];

  if ("indexedDB" in window) {
    try {
      return await readFromIndexedDb();
    } catch {
      // Fall back to localStorage if IndexedDB is unavailable.
    }
  }

  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return parseEquipmentList(parsed);
  } catch {
    return [];
  }
}

export async function saveSelectedEquipment(selectedEquipment: EquipmentId[]): Promise<void> {
  if (typeof window === "undefined") return;

  if ("indexedDB" in window) {
    try {
      await writeToIndexedDb(selectedEquipment);
      return;
    } catch {
      // Fall back to localStorage if IndexedDB fails.
    }
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedEquipment));
}
