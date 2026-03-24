const FREE_EXERCISE_DB_JSON_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";
const FREE_EXERCISE_DB_IMAGE_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

export type EquipmentId =
  | "barbell"
  | "dumbbell"
  | "ez-curl-bar"
  | "kettlebells"
  | "cable"
  | "machine"
  | "bands"
  | "medicine-ball"
  | "exercise-ball"
  | "foam-roll"
  | "other";

export interface EquipmentItem {
  id: EquipmentId;
  name: string;
  category: string;
}

export const equipmentList: EquipmentItem[] = [
  { id: "barbell", name: "Barbell", category: "Free Weights" },
  { id: "dumbbell", name: "Dumbbell", category: "Free Weights" },
  { id: "ez-curl-bar", name: "EZ Curl Bar", category: "Free Weights" },
  { id: "kettlebells", name: "Kettlebells", category: "Free Weights" },
  { id: "machine", name: "Machine", category: "Machines" },
  { id: "cable", name: "Cable Machine", category: "Machines" },
  { id: "bands", name: "Resistance Bands", category: "Accessories" },
  { id: "medicine-ball", name: "Medicine Ball", category: "Accessories" },
  { id: "exercise-ball", name: "Exercise Ball", category: "Accessories" },
  { id: "foam-roll", name: "Foam Roller", category: "Accessories" },
  { id: "other", name: "Other Equipment", category: "Benches & Racks" },
];

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  requiredEquipment: EquipmentId[];
  images: string[];
  duration: number;
}

interface FreeExerciseDbExercise {
  id: string;
  name: string;
  equipment: string | null;
  primaryMuscles: string[];
  instructions: string[];
  level: string | null;
  images: string[];
}

const EQUIPMENT_MAP: Record<string, EquipmentId[]> = {
  "body only": [],
  barbell: ["barbell"],
  dumbbell: ["dumbbell"],
  cable: ["cable"],
  machine: ["machine"],
  kettlebells: ["kettlebells"],
  bands: ["bands"],
  "medicine ball": ["medicine-ball"],
  "exercise ball": ["exercise-ball"],
  "e-z curl bar": ["ez-curl-bar"],
  "foam roll": ["foam-roll"],
  other: ["other"],
};

const LEVEL_DURATION: Record<string, number> = {
  beginner: 35,
  intermediate: 40,
  expert: 45,
};

let exercisesCache: Exercise[] | null = null;
let exercisesPromise: Promise<Exercise[]> | null = null;

function toTitleCase(value: string): string {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function mapEquipment(equipment: string | null): EquipmentId[] {
  if (!equipment) return [];
  return EQUIPMENT_MAP[equipment] ?? ["other"];
}

function mapDuration(level: string | null): number {
  if (!level) return 40;
  return LEVEL_DURATION[level] ?? 40;
}

function mapDescription(instructions: string[]): string {
  if (!instructions || instructions.length === 0) {
    return "Perform this exercise with controlled tempo and good form.";
  }
  return instructions.slice(0, 2).join(" ").replace(/\s+/g, " ").trim();
}

function mapExercise(item: FreeExerciseDbExercise): Exercise {
  const images = (item.images ?? []).map((path) => `${FREE_EXERCISE_DB_IMAGE_BASE}/${path}`);

  return {
    id: item.id,
    name: item.name,
    description: mapDescription(item.instructions),
    muscleGroup: toTitleCase(item.primaryMuscles?.[0] ?? "full body"),
    requiredEquipment: mapEquipment(item.equipment),
    images,
    duration: mapDuration(item.level),
  };
}

function canDoExercise(exercise: Exercise, selectedEquipment: EquipmentId[]): boolean {
  if (exercise.requiredEquipment.length === 0) return true;
  return exercise.requiredEquipment.every((eq) => selectedEquipment.includes(eq));
}

export async function loadExerciseLibrary(): Promise<Exercise[]> {
  if (exercisesCache) return exercisesCache;
  if (exercisesPromise) return exercisesPromise;

  exercisesPromise = fetch(FREE_EXERCISE_DB_JSON_URL)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to load free-exercise-db dataset: HTTP ${res.status}`);
      }

      const raw = (await res.json()) as FreeExerciseDbExercise[];
      const mapped = raw
        .map(mapExercise)
        .filter((exercise) => exercise.images.length > 0)
        .sort((a, b) => a.name.localeCompare(b.name));

      exercisesCache = mapped;
      return mapped;
    })
    .catch((error) => {
      exercisesPromise = null;
      throw error;
    });

  return exercisesPromise;
}

export function filterAvailableExercises(exercises: Exercise[], selectedEquipment: EquipmentId[]): Exercise[] {
  return exercises.filter((exercise) => canDoExercise(exercise, selectedEquipment));
}

export async function getAvailableExercises(selectedEquipment: EquipmentId[]): Promise<Exercise[]> {
  const all = await loadExerciseLibrary();
  return filterAvailableExercises(all, selectedEquipment);
}

export function buildWorkoutFromAvailable(available: Exercise[], exerciseCount: number = 8): Exercise[] {
  if (available.length === 0) return [];

  const targetCount = Math.min(exerciseCount, available.length);
  const muscleGroups = [...new Set(available.map((e) => e.muscleGroup))];
  const picked: Exercise[] = [];
  const used = new Set<string>();

  let groupIndex = 0;
  while (picked.length < targetCount) {
    const group = muscleGroups[groupIndex % muscleGroups.length];
    const candidates = available.filter((e) => e.muscleGroup === group && !used.has(e.id));

    if (candidates.length > 0) {
      const selected = candidates[Math.floor(Math.random() * candidates.length)];
      picked.push(selected);
      used.add(selected.id);
    }

    groupIndex += 1;
    if (groupIndex > muscleGroups.length * targetCount * 2) break;
  }

  if (picked.length < targetCount) {
    const remaining = available.filter((e) => !used.has(e.id));
    while (picked.length < targetCount && remaining.length > 0) {
      const randomIndex = Math.floor(Math.random() * remaining.length);
      picked.push(remaining[randomIndex]);
      remaining.splice(randomIndex, 1);
    }
  }

  return picked;
}

export async function buildWorkout(selectedEquipment: EquipmentId[], exerciseCount: number = 8): Promise<Exercise[]> {
  const available = await getAvailableExercises(selectedEquipment);
  return buildWorkoutFromAvailable(available, exerciseCount);
}
