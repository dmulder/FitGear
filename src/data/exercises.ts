const EQUIPMENT_DEFINITIONS = [
  { id: "dumbbells", name: "Dumbbells", category: "Free Weights" },
  { id: "adjustable-dumbbells", name: "Adjustable Dumbbells", category: "Free Weights" },
  { id: "barbell", name: "Barbell", category: "Free Weights" },
  { id: "ez-curl-bar", name: "EZ Curl Bar", category: "Free Weights" },
  { id: "kettlebells", name: "Kettlebells", category: "Free Weights" },
  { id: "medicine-ball", name: "Medicine Ball", category: "Free Weights" },
  { id: "weight-plates", name: "Weight Plates", category: "Free Weights" },
  { id: "hex-trap-bar", name: "Trap / Hex Bar", category: "Free Weights" },
  { id: "sandbag", name: "Sandbag", category: "Free Weights" },
  { id: "atlas-stone", name: "Atlas Stone", category: "Free Weights" },
  { id: "keg", name: "Keg", category: "Free Weights" },
  { id: "axle-bar", name: "Axle Bar", category: "Free Weights" },
  { id: "log-bar", name: "Log Bar", category: "Free Weights" },

  { id: "cable-machine", name: "Cable Machine", category: "Machines" },
  { id: "smith-machine", name: "Smith Machine", category: "Machines" },
  { id: "leg-press", name: "Leg Press", category: "Machines" },
  { id: "leg-extension", name: "Leg Extension", category: "Machines" },
  { id: "leg-curl", name: "Leg Curl Machine", category: "Machines" },
  { id: "hack-squat-machine", name: "Hack Squat Machine", category: "Machines" },
  { id: "pec-deck", name: "Pec Deck / Butterfly", category: "Machines" },
  { id: "chest-press-machine", name: "Chest Press Machine", category: "Machines" },
  { id: "shoulder-press-machine", name: "Shoulder Press Machine", category: "Machines" },
  { id: "ab-crunch-machine", name: "Ab Crunch Machine", category: "Machines" },
  { id: "calf-raise-machine", name: "Calf Raise Machine", category: "Machines" },
  { id: "hip-abductor-machine", name: "Hip Abductor Machine", category: "Machines" },
  { id: "hip-adductor-machine", name: "Hip Adductor Machine", category: "Machines" },
  { id: "t-bar-row-machine", name: "T-Bar / Plate-Loaded Row", category: "Machines" },
  { id: "biceps-curl-machine", name: "Biceps Curl Machine", category: "Machines" },
  { id: "triceps-extension-machine", name: "Triceps Extension Machine", category: "Machines" },
  { id: "glute-ham-developer", name: "Glute-Ham Developer", category: "Machines" },
  { id: "hyperextension-bench", name: "Hyperextension Bench", category: "Machines" },

  { id: "pull-up-bar", name: "Pull-Up Bar", category: "Bodyweight Stations" },
  { id: "dip-station", name: "Dip Station / Parallel Bars", category: "Bodyweight Stations" },
  { id: "captains-chair", name: "Captain's Chair / VKR", category: "Bodyweight Stations" },
  { id: "power-tower", name: "Power Tower", category: "Bodyweight Stations" },
  { id: "gymnastic-rings", name: "Gymnastic Rings", category: "Bodyweight Stations" },

  { id: "resistance-bands", name: "Resistance Bands", category: "Accessories" },
  { id: "trx-suspension", name: "TRX / Suspension Straps", category: "Accessories" },
  { id: "ab-wheel", name: "Ab Wheel", category: "Accessories" },
  { id: "stationary-push-up-handles", name: "Stationary Push-Up Handles", category: "Accessories" },
  { id: "rotating-push-up-handles", name: "Rotating Push-Up Handles", category: "Accessories" },
  { id: "stability-ball", name: "Exercise Ball", category: "Accessories" },
  { id: "foam-roller", name: "Foam Roller", category: "Accessories" },
  { id: "jump-rope", name: "Jump Rope", category: "Accessories" },
  { id: "battle-ropes", name: "Battle Ropes", category: "Accessories" },
  { id: "climbing-rope", name: "Climbing Rope", category: "Accessories" },
  { id: "sled", name: "Sled / Prowler", category: "Accessories" },
  { id: "tire", name: "Tire", category: "Accessories" },
  { id: "sledgehammer", name: "Sledgehammer", category: "Accessories" },
  { id: "wrist-roller", name: "Wrist Roller", category: "Accessories" },
  { id: "head-harness", name: "Head Harness", category: "Accessories" },
  { id: "heavy-bag", name: "Heavy Bag", category: "Accessories" },
  { id: "chain-resistance", name: "Chains", category: "Accessories" },
  { id: "dip-belt", name: "Dip Belt", category: "Accessories" },
  { id: "balance-board", name: "Balance Board", category: "Accessories" },
  { id: "cones-hurdles", name: "Cones / Hurdles", category: "Accessories" },

  { id: "bench", name: "Bench", category: "Benches & Racks" },
  { id: "squat-rack", name: "Squat Rack / Power Rack", category: "Benches & Racks" },
  { id: "plyo-box", name: "Plyo Box", category: "Benches & Racks" },

  { id: "treadmill", name: "Treadmill", category: "Cardio Machines" },
  { id: "stationary-bike", name: "Stationary Bike", category: "Cardio Machines" },
  { id: "air-bike", name: "Air Bike", category: "Cardio Machines" },
  { id: "rowing-machine", name: "Rowing Machine", category: "Cardio Machines" },
  { id: "elliptical", name: "Elliptical", category: "Cardio Machines" },
  { id: "stair-climber", name: "Stair Climber", category: "Cardio Machines" },

  { id: "yoke", name: "Yoke", category: "Strongman" },
  { id: "rickshaw", name: "Rickshaw", category: "Strongman" },
  { id: "conans-wheel", name: "Conan's Wheel", category: "Strongman" },
  { id: "car-deadlift-machine", name: "Car Deadlift Apparatus", category: "Strongman" },
] as const;

export type EquipmentId = (typeof EQUIPMENT_DEFINITIONS)[number]["id"];

export interface EquipmentItem {
  id: EquipmentId;
  name: string;
  category: string;
}

export const equipmentList: EquipmentItem[] = EQUIPMENT_DEFINITIONS.map((equipment) => ({ ...equipment }));

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

const EQUIPMENT_IMPLIED_BY_SELECTION: Partial<Record<EquipmentId, EquipmentId[]>> = {
  "power-tower": ["pull-up-bar", "dip-station", "captains-chair", "stationary-push-up-handles"],
};

const SOURCE_EQUIPMENT_TO_REQUIRED: Record<Exclude<SourceEquipment, null>, EquipmentId[]> = {
  "medicine ball": ["medicine-ball"],
  dumbbell: ["dumbbells"],
  "body only": [],
  bands: ["resistance-bands"],
  kettlebells: ["kettlebells"],
  "foam roll": ["foam-roller"],
  cable: ["cable-machine"],
  machine: [],
  barbell: ["barbell"],
  "exercise ball": ["stability-ball"],
  "e-z curl bar": ["ez-curl-bar"],
  other: [],
};

const INFERENCE_RULES: Array<{ pattern: RegExp; equipment: EquipmentId[] }> = [
  { pattern: /\bsmith[_ -]?machine|\bsmith\b/i, equipment: ["smith-machine"] },
  { pattern: /\bleg[_ -]?press\b/i, equipment: ["leg-press"] },
  { pattern: /\bleg[_ -]?extension/i, equipment: ["leg-extension"] },
  { pattern: /\bleg[_ -]?curl/i, equipment: ["leg-curl"] },
  { pattern: /\bhack[_ -]?squat/i, equipment: ["hack-squat-machine"] },
  { pattern: /ab[_ -]?crunch[_ -]?machine/i, equipment: ["ab-crunch-machine"] },
  { pattern: /\bpec[_ -]?deck|\bbutterfly\b|reverse[_ -]?machine[_ -]?flye/i, equipment: ["pec-deck"] },
  { pattern: /machine[_ -]?bench[_ -]?press|leverage[_ -]?(decline|incline)?[_ -]?chest[_ -]?press/i, equipment: ["chest-press-machine"] },
  { pattern: /machine[_ -]?shoulder[_ -]?military[_ -]?press|leverage[_ -]?shoulder[_ -]?press/i, equipment: ["shoulder-press-machine"] },
  { pattern: /machine[_ -]?bicep[_ -]?curl|machine[_ -]?preacher[_ -]?curl/i, equipment: ["biceps-curl-machine"] },
  { pattern: /machine[_ -]?triceps[_ -]?extension/i, equipment: ["triceps-extension-machine"] },
  { pattern: /leverage[_ -]?(high|iso)[_ -]?row|lying[_ -]?t-bar[_ -]?row/i, equipment: ["t-bar-row-machine"] },
  { pattern: /calf[-_ ]machine|seated[_ -]?calf[_ -]?raise|standing[_ -]?calf[_ -]?raises?|calf[_ -]?press/i, equipment: ["calf-raise-machine"] },
  { pattern: /thigh[_ -]?abductor/i, equipment: ["hip-abductor-machine"] },
  { pattern: /thigh[_ -]?adductor/i, equipment: ["hip-adductor-machine"] },
  { pattern: /glute[_ -]?ham[_ -]?raise|floor[_ -]?glute[-_ ]ham[_ -]?raise|natural[_ -]?glute[_ -]?ham[_ -]?raise/i, equipment: ["glute-ham-developer"] },
  { pattern: /reverse[_ -]?hyperextension|hyperextensions[_ -]?back[_ -]?extensions/i, equipment: ["hyperextension-bench"] },

  { pattern: /\btreadmill\b/i, equipment: ["treadmill"] },
  { pattern: /bicycling[_ -]?stationary|recumbent[_ -]?bike|stationary bike/i, equipment: ["stationary-bike"] },
  { pattern: /air[_ -]?bike/i, equipment: ["air-bike"] },
  { pattern: /rowing[_ -]?stationary|rowing machine/i, equipment: ["rowing-machine"] },
  { pattern: /elliptical/i, equipment: ["elliptical"] },
  { pattern: /stairmaster|step[_ -]?mill|power[_ -]?stairs|stair[_ -]?climber/i, equipment: ["stair-climber"] },

  { pattern: /\bpull[-_ ]?ups?\b|\bchin[-_ ]?ups?\b|v-bar[_ -]?pullup|scapular[_ -]?pull-up|one[_ -]?handed[_ -]?hang|muscle[_ -]?up|sternum[_ -]?chins|rocky[_ -]?pull|hanging[_ -](leg|pike)/i, equipment: ["pull-up-bar"] },
  { pattern: /\bdips?\b|parallel[_ -]?bar[_ -]?dip|knee[_ -]?hip[_ -]?raise[_ -]?on[_ -]?parallel[_ -]?bars|dip[_ -]?machine/i, equipment: ["dip-station"] },
  { pattern: /\bring[_ -]?dips?\b|\bgymnastic rings\b|\brings\b/i, equipment: ["gymnastic-rings"] },
  { pattern: /suspended[_ -]|with[_ -]?straps|\btrx\b|bodyweight[_ -]?mid[_ -]?row/i, equipment: ["trx-suspension"] },

  { pattern: /\bbench\b|incline[_ -]|decline[_ -]|flat[_ -]?bench/i, equipment: ["bench"] },
  { pattern: /\bsquat[_ -]?rack\b|\bpower[_ -]?rack\b/i, equipment: ["squat-rack"] },
  { pattern: /\bbox[_ -]?jump|\bbox[_ -]|\bbox\b/i, equipment: ["plyo-box"] },

  { pattern: /exercise[_ -]?ball|stability[_ -]?ball|\bswiss ball\b/i, equipment: ["stability-ball"] },
  { pattern: /foam[_ -]?roll|\bsmr\b/i, equipment: ["foam-roller"] },
  { pattern: /\bbands?\b|band[_ -]/i, equipment: ["resistance-bands"] },
  { pattern: /ab[_ -]?roller|ab wheel/i, equipment: ["ab-wheel"] },
  { pattern: /rope[_ -]?jumping|jump rope/i, equipment: ["jump-rope"] },
  { pattern: /battling[_ -]?ropes/i, equipment: ["battle-ropes"] },
  { pattern: /rope[_ -]?climb/i, equipment: ["climbing-rope"] },
  { pattern: /\bsled\b|prowler|drag/i, equipment: ["sled"] },
  { pattern: /\btire\b/i, equipment: ["tire"] },
  { pattern: /sledgehammer/i, equipment: ["sledgehammer"] },
  { pattern: /\bmedicine[_ -]?ball\b|wall[_ -]?ball/i, equipment: ["medicine-ball"] },
  { pattern: /\bdumbbell\b/i, equipment: ["dumbbells"] },
  { pattern: /\bbarbell\b/i, equipment: ["barbell"] },
  { pattern: /e-z[_ -]?curl|ez[_ -]?bar/i, equipment: ["ez-curl-bar"] },
  { pattern: /\bkettlebell\b/i, equipment: ["kettlebells"] },
  { pattern: /\bplate\b/i, equipment: ["weight-plates"] },
  { pattern: /trap[_ -]?bar/i, equipment: ["hex-trap-bar"] },
  { pattern: /sandbag/i, equipment: ["sandbag"] },
  { pattern: /atlas[_ -]?stone/i, equipment: ["atlas-stone"] },
  { pattern: /\bkeg\b/i, equipment: ["keg"] },
  { pattern: /\blog[_ -]?lift\b/i, equipment: ["log-bar"] },
  { pattern: /\baxle\b/i, equipment: ["axle-bar"] },
  { pattern: /\bchain\b/i, equipment: ["chain-resistance"] },
  { pattern: /head[_ -]?harness/i, equipment: ["head-harness"] },
  { pattern: /heavy[_ -]?bag/i, equipment: ["heavy-bag"] },
  { pattern: /wrist[_ -]?roller/i, equipment: ["wrist-roller"] },
  { pattern: /weighted[_ -]?pull[_ -]?ups?|weighted[_ -]?bench[_ -]?dip/i, equipment: ["dip-belt"] },
  { pattern: /balance[_ -]?board/i, equipment: ["balance-board"] },
  { pattern: /cone|hurdle|agility/i, equipment: ["cones-hurdles"] },

  { pattern: /yoke[_ -]?walk/i, equipment: ["yoke"] },
  { pattern: /rickshaw/i, equipment: ["rickshaw"] },
  { pattern: /conans[_ -]?wheel/i, equipment: ["conans-wheel"] },
  { pattern: /car[_ -]?deadlift/i, equipment: ["car-deadlift-machine"] },
];

const FORCED_NO_EQUIPMENT_IDS = new Set<string>([
  "Hyperextensions_With_No_Hyperextension_Bench",
  "Chair_Lower_Back_Stretch",
  "Chair_Upper_Body_Stretch",
  "Chair_Leg_Extended_Stretch",
  "Behind_Head_Chest_Stretch",
  "Chest_And_Front_Of_Shoulder_Stretch",
  "Round_The_World_Shoulder_Stretch",
  "Lying_Bent_Leg_Groin",
  "Lying_Hamstring",
  "Overhead_Lat",
  "Standing_Biceps_Stretch",
  "Bicycling",
  "Skating",
]);

function getEffectiveSelectedEquipment(selectedEquipment: EquipmentId[]): Set<EquipmentId> {
  const effectiveEquipment = new Set<EquipmentId>(selectedEquipment);

  for (const equipmentId of selectedEquipment) {
    const impliedEquipment = EQUIPMENT_IMPLIED_BY_SELECTION[equipmentId];
    if (!impliedEquipment) continue;

    for (const impliedId of impliedEquipment) {
      effectiveEquipment.add(impliedId);
    }
  }

  return effectiveEquipment;
}

function mapRequiredEquipment(sourceExercise: SourceExercise): EquipmentId[] {
  if (FORCED_NO_EQUIPMENT_IDS.has(sourceExercise.id)) {
    return [];
  }

  const requiredEquipment = new Set<EquipmentId>();

  const sourceEquipment = sourceExercise.equipment;
  if (sourceEquipment !== null) {
    for (const equipmentId of SOURCE_EQUIPMENT_TO_REQUIRED[sourceEquipment]) {
      requiredEquipment.add(equipmentId);
    }
  }

  const searchableText = `${sourceExercise.id} ${sourceExercise.name} ${sourceExercise.instructions.join(" ")}`.toLowerCase();

  for (const rule of INFERENCE_RULES) {
    if (!rule.pattern.test(searchableText)) continue;
    for (const equipmentId of rule.equipment) {
      requiredEquipment.add(equipmentId);
    }
  }

  return [...requiredEquipment];
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
    requiredEquipment: mapRequiredEquipment(sourceExercise),
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
  const effectiveSelectedEquipment = getEffectiveSelectedEquipment(selectedEquipment);

  return allExercises.filter((exercise) => {
    if (!canUseExerciseForDifficulty(exercise.difficulty, difficulty)) return false;
    if (exercise.requiredEquipment.length === 0) return true;
    return exercise.requiredEquipment.every((equipmentId) => effectiveSelectedEquipment.has(equipmentId));
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
