export type EquipmentId =
  | "dumbbell"
  | "barbell"
  | "kettlebells"
  | "medicine-ball"
  | "e-z-curl-bar"
  | "cable-machine"
  | "machine"
  | "resistance-bands"
  | "stability-ball"
  | "foam-roller"
  | "other-equipment";

export interface EquipmentItem {
  id: EquipmentId;
  name: string;
  category: string;
}

export const equipmentList: EquipmentItem[] = [
  { id: "dumbbell", name: "Dumbbell", category: "Free Weights" },
  { id: "barbell", name: "Barbell", category: "Free Weights" },
  { id: "kettlebells", name: "Kettlebells", category: "Free Weights" },
  { id: "medicine-ball", name: "Medicine Ball", category: "Free Weights" },
  { id: "e-z-curl-bar", name: "EZ Curl Bar", category: "Free Weights" },
  { id: "machine", name: "Machine", category: "Machines & Cables" },
  { id: "cable-machine", name: "Cable Machine", category: "Machines & Cables" },
  { id: "resistance-bands", name: "Resistance Bands", category: "Accessories" },
  { id: "stability-ball", name: "Exercise Ball", category: "Accessories" },
  { id: "foam-roller", name: "Foam Roller", category: "Accessories" },
  { id: "other-equipment", name: "Other Equipment", category: "Accessories" },
];

const EQUIPMENT_IDS = new Set<EquipmentId>(equipmentList.map((equipment) => equipment.id));

export function isEquipmentId(value: string): value is EquipmentId {
  return EQUIPMENT_IDS.has(value as EquipmentId);
}

export type Difficulty = "easy" | "medium" | "hard";

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  requiredEquipment: EquipmentId[];
  images: string[];
  duration: number;
  difficulty: Difficulty;
}

type SourceLevel = "beginner" | "intermediate" | "expert";
type SourceEquipment =
  | "medicine ball"
  | "dumbbell"
  | "body only"
  | "bands"
  | "kettlebells"
  | "foam roll"
  | "cable"
  | "machine"
  | "barbell"
  | "exercise ball"
  | "e-z curl bar"
  | "other"
  | null;

interface SourceExercise {
  id: string;
  name: string;
  level: SourceLevel;
  equipment: SourceEquipment;
  primaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
}

const sourceExerciseModules = import.meta.glob("/src/free-exercise-db/exercises/*.json", {
  eager: true,
  import: "default",
}) as Record<string, SourceExercise>;

const sourceImageModules = import.meta.glob("/src/free-exercise-db/exercises/*/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const imageUrlByRelativePath = new Map<string, string>(
  Object.entries(sourceImageModules).map(([path, imageUrl]) => [
    path.replace("/src/free-exercise-db/exercises/", ""),
    imageUrl,
  ])
);

const LEVEL_TO_DIFFICULTY: Record<SourceLevel, Difficulty> = {
  beginner: "easy",
  intermediate: "medium",
  expert: "hard",
};

const EQUIPMENT_TO_REQUIRED: Record<Exclude<SourceEquipment, null | "body only">, EquipmentId[]> = {
  "medicine ball": ["medicine-ball"],
  dumbbell: ["dumbbell"],
  bands: ["resistance-bands"],
  kettlebells: ["kettlebells"],
  "foam roll": ["foam-roller"],
  cable: ["cable-machine"],
  machine: ["machine"],
  barbell: ["barbell"],
  "exercise ball": ["stability-ball"],
  "e-z curl bar": ["e-z-curl-bar"],
  other: ["other-equipment"],
};

function mapRequiredEquipment(equipment: SourceEquipment): EquipmentId[] {
  if (equipment === null || equipment === "body only") {
    return [];
  }

  return EQUIPMENT_TO_REQUIRED[equipment] ?? ["other-equipment"];
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function normalizeMuscleGroup(primaryMuscles: string[], category: string): string {
  const baseValue = primaryMuscles[0] ?? category;
  return toTitleCase(baseValue.replace(/[_-]/g, " "));
}

function buildDescription(instructions: string[]): string {
  if (instructions.length === 0) {
    return "Perform the movement with controlled reps and steady breathing.";
  }

  return instructions
    .slice(0, 2)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDuration(category: string, difficulty: Difficulty): number {
  if (category === "stretching") return 35;
  if (category === "cardio") return difficulty === "hard" ? 35 : 30;
  if (difficulty === "easy") return 40;
  if (difficulty === "medium") return 45;
  return 50;
}

function resolveImages(imagePaths: string[], exerciseId: string): string[] {
  const directImages = imagePaths
    .map((imagePath) => imageUrlByRelativePath.get(imagePath))
    .filter((imageUrl): imageUrl is string => Boolean(imageUrl));

  if (directImages.length > 0) {
    return directImages;
  }

  return [...imageUrlByRelativePath.entries()]
    .filter(([imagePath]) => imagePath.startsWith(`${exerciseId}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, imageUrl]) => imageUrl);
}

function toExercise(sourceExercise: SourceExercise): Exercise {
  const difficulty = LEVEL_TO_DIFFICULTY[sourceExercise.level] ?? "medium";

  return {
    id: sourceExercise.id,
    name: sourceExercise.name,
    description: buildDescription(sourceExercise.instructions),
    muscleGroup: normalizeMuscleGroup(sourceExercise.primaryMuscles, sourceExercise.category),
    requiredEquipment: mapRequiredEquipment(sourceExercise.equipment),
    images: resolveImages(sourceExercise.images, sourceExercise.id),
    duration: getDuration(sourceExercise.category, difficulty),
    difficulty,
  };
}

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};

export const allExercises: Exercise[] = Object.values(sourceExerciseModules)
  .map(toExercise)
  .sort((a, b) => a.name.localeCompare(b.name));

export function getExercisesByIds(exerciseIds: string[]): Exercise[] {
  const byId = new Map(allExercises.map((exercise) => [exercise.id, exercise]));

  return exerciseIds
    .map((exerciseId) => byId.get(exerciseId))
    .filter((exercise): exercise is Exercise => Boolean(exercise));
}

function canUseExerciseForDifficulty(exerciseDifficulty: Difficulty, selectedDifficulty: Difficulty): boolean {
  return DIFFICULTY_ORDER[exerciseDifficulty] <= DIFFICULTY_ORDER[selectedDifficulty];
}

export function getAvailableExercises(selectedEquipment: EquipmentId[], difficulty: Difficulty = "hard"): Exercise[] {
  return allExercises.filter((exercise) => {
    if (!canUseExerciseForDifficulty(exercise.difficulty, difficulty)) return false;
    if (exercise.requiredEquipment.length === 0) return true;
    return exercise.requiredEquipment.every((equipmentId) => selectedEquipment.includes(equipmentId));
  });
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items];

  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

export function buildWorkout(
  selectedEquipment: EquipmentId[],
  exerciseCount: number = 8,
  difficulty: Difficulty = "hard"
): Exercise[] {
  const available = shuffle(getAvailableExercises(selectedEquipment, difficulty));
  const targetCount = Math.min(exerciseCount, available.length);

  if (targetCount === 0) {
    return [];
  }

  const grouped = new Map<string, Exercise[]>();
  for (const exercise of available) {
    const existing = grouped.get(exercise.muscleGroup) ?? [];
    existing.push(exercise);
    grouped.set(exercise.muscleGroup, existing);
  }

  const groupNames = shuffle([...grouped.keys()]);
  const workout: Exercise[] = [];

  while (workout.length < targetCount) {
    let selectedInRound = false;

    for (const groupName of groupNames) {
      const groupExercises = grouped.get(groupName);
      const nextExercise = groupExercises?.shift();
      if (!nextExercise) continue;

      workout.push(nextExercise);
      selectedInRound = true;

      if (workout.length >= targetCount) {
        break;
      }
    }

    if (!selectedInRound) {
      break;
    }
  }

  return workout;
}
