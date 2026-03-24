import type { Difficulty, EquipmentId } from "@/data/exercises";

const DB_NAME = "fitgear-db";
const DB_VERSION = 1;
const STORE_NAME = "settings";
const EQUIPMENT_SETTINGS_KEY = "selected-equipment";
const DIFFICULTY_SETTINGS_KEY = "workout-difficulty";
const LOCAL_STORAGE_EQUIPMENT_KEY = "fitgear:selected-equipment";
const LOCAL_STORAGE_DIFFICULTY_KEY = "fitgear:workout-difficulty";

interface SettingsRecord<T> {
  key: string;
  value: T;
}

function parseEquipmentList(value: unknown): EquipmentId[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is EquipmentId => typeof item === "string");
}

function parseDifficulty(value: unknown): Difficulty {
  if (value === "easy" || value === "medium" || value === "hard") {
    return value;
  }
  return "medium";
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

async function readSettingFromIndexedDb(key: string): Promise<unknown> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(key);

    request.onsuccess = () => {
      const record = request.result as SettingsRecord<unknown> | undefined;
      resolve(record?.value);
    };

    request.onerror = () => {
      reject(request.error ?? new Error("Failed to read settings"));
    };

    tx.oncomplete = () => {
      db.close();
    };

    tx.onerror = () => {
      reject(tx.error ?? new Error("IndexedDB transaction failed"));
    };
  });
}

async function writeSettingToIndexedDb(key: string, value: unknown): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const record: SettingsRecord<unknown> = {
      key,
      value,
    };

    const request = store.put(record);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error ?? new Error("Failed to save settings"));
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
      const raw = await readSettingFromIndexedDb(EQUIPMENT_SETTINGS_KEY);
      return parseEquipmentList(raw);
    } catch {
      // Fall back to localStorage if IndexedDB is unavailable.
    }
  }

  const raw = window.localStorage.getItem(LOCAL_STORAGE_EQUIPMENT_KEY);
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
      await writeSettingToIndexedDb(EQUIPMENT_SETTINGS_KEY, selectedEquipment);
      return;
    } catch {
      // Fall back to localStorage if IndexedDB fails.
    }
  }

  window.localStorage.setItem(LOCAL_STORAGE_EQUIPMENT_KEY, JSON.stringify(selectedEquipment));
}

export async function loadWorkoutDifficulty(): Promise<Difficulty> {
  if (typeof window === "undefined") return "medium";

  if ("indexedDB" in window) {
    try {
      const raw = await readSettingFromIndexedDb(DIFFICULTY_SETTINGS_KEY);
      return parseDifficulty(raw);
    } catch {
      // Fall back to localStorage if IndexedDB is unavailable.
    }
  }

  const raw = window.localStorage.getItem(LOCAL_STORAGE_DIFFICULTY_KEY);
  if (!raw) return "medium";
  return parseDifficulty(raw);
}

export async function saveWorkoutDifficulty(difficulty: Difficulty): Promise<void> {
  if (typeof window === "undefined") return;

  if ("indexedDB" in window) {
    try {
      await writeSettingToIndexedDb(DIFFICULTY_SETTINGS_KEY, difficulty);
      return;
    } catch {
      // Fall back to localStorage if IndexedDB fails.
    }
  }

  window.localStorage.setItem(LOCAL_STORAGE_DIFFICULTY_KEY, difficulty);
}
