// Image base URL for the free-exercise-db
const IMG_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

const EXERCISE_IMAGE_ALIASES: Record<string, string> = {
  Burpee: "Body-Up",
  "Butt_Lift_(Bridge)": "Butt_Lift_Bridge",
  High_Knee_Jog: "Fast_Skipping",
  "Kettlebell_Turkish_Get-Up_(Squat_style)": "Kettlebell_Turkish_Get-Up_Squat_style",
  "Pushups_(Close_and_Wide_Hand_Positions)": "Pushups_Close_and_Wide_Hand_Positions",
};

function exImg(id: string, count: number = 2): string[] {
  const resolvedId = EXERCISE_IMAGE_ALIASES[id] ?? id;
  return Array.from({ length: count }, (_, i) => `${IMG_BASE}/${resolvedId}/${i}.jpg`);
}

export type EquipmentId =
  | "dumbbells"
  | "adjustable-dumbbells"
  | "barbell"
  | "ez-curl-bar"
  | "kettlebells"
  | "weight-plates"
  | "cable-machine"
  | "smith-machine"
  | "leg-press"
  | "lat-pulldown"
  | "chest-press-machine"
  | "leg-extension"
  | "leg-curl"
  | "pec-deck"
  | "shoulder-press-machine"
  | "pull-up-bar"
  | "power-tower"
  | "captains-chair"
  | "dip-station"
  | "gymnastic-rings"
  | "push-up-handles"
  | "rotating-push-up-handles"
  | "resistance-bands"
  | "trx-suspension"
  | "ab-wheel"
  | "medicine-ball"
  | "stability-ball"
  | "yoga-ball"
  | "yoga-mat"
  | "bench"
  | "squat-rack"
  | "plyo-box"
  | "battle-ropes"
  | "parallettes"
  | "jump-rope"
  | "foam-roller"
  | "ankle-weights"
  | "wrist-weights"
  | "pull-up-assist-band"
  | "door-anchor"
  | "landmine-attachment"
  | "hex-trap-bar"
  | "dip-belt"
  | "sandbag"
  | "sledgehammer-tire"
  | "agility-ladder"
  | "bosu-ball"
  | "treadmill"
  | "stationary-bike"
  | "rowing-machine"
  | "elliptical"
  | "stair-climber"
  | "air-bike";

export interface EquipmentItem {
  id: EquipmentId;
  name: string;
  category: string;
}

export const equipmentList: EquipmentItem[] = [
  // Free Weights
  { id: "dumbbells", name: "Dumbbells", category: "Free Weights" },
  { id: "adjustable-dumbbells", name: "Adjustable Dumbbells / Hand Weights", category: "Free Weights" },
  { id: "barbell", name: "Barbell", category: "Free Weights" },
  { id: "ez-curl-bar", name: "EZ Curl Bar", category: "Free Weights" },
  { id: "kettlebells", name: "Kettlebells", category: "Free Weights" },
  { id: "weight-plates", name: "Weight Plates", category: "Free Weights" },
  { id: "hex-trap-bar", name: "Hex / Trap Bar", category: "Free Weights" },
  { id: "sandbag", name: "Sandbag", category: "Free Weights" },

  // Machines
  { id: "cable-machine", name: "Cable Machine", category: "Machines" },
  { id: "smith-machine", name: "Smith Machine", category: "Machines" },
  { id: "leg-press", name: "Leg Press", category: "Machines" },
  { id: "lat-pulldown", name: "Lat Pulldown", category: "Machines" },
  { id: "chest-press-machine", name: "Chest Press Machine", category: "Machines" },
  { id: "leg-extension", name: "Leg Extension", category: "Machines" },
  { id: "leg-curl", name: "Leg Curl Machine", category: "Machines" },
  { id: "pec-deck", name: "Pec Deck / Fly Machine", category: "Machines" },
  { id: "shoulder-press-machine", name: "Shoulder Press Machine", category: "Machines" },

  // Bodyweight Stations
  { id: "pull-up-bar", name: "Pull-Up Bar", category: "Bodyweight Stations" },
  { id: "power-tower", name: "Power Tower (Pull-Up / Dip / VKR)", category: "Bodyweight Stations" },
  { id: "captains-chair", name: "Captain's Chair / VKR", category: "Bodyweight Stations" },
  { id: "dip-station", name: "Dip Station", category: "Bodyweight Stations" },
  { id: "gymnastic-rings", name: "Gymnastic Rings", category: "Bodyweight Stations" },
  { id: "parallettes", name: "Parallettes", category: "Bodyweight Stations" },

  // Push-Up & Grip Accessories
  { id: "push-up-handles", name: "Stationary Push-Up Handles", category: "Accessories" },
  { id: "rotating-push-up-handles", name: "Rotating Push-Up Handles", category: "Accessories" },

  // Accessories
  { id: "resistance-bands", name: "Resistance Bands", category: "Accessories" },
  { id: "pull-up-assist-band", name: "Pull-Up Assist Band", category: "Accessories" },
  { id: "trx-suspension", name: "TRX / Suspension Trainer", category: "Accessories" },
  { id: "ab-wheel", name: "Ab Wheel", category: "Accessories" },
  { id: "medicine-ball", name: "Medicine Ball", category: "Accessories" },
  { id: "stability-ball", name: "Stability Ball", category: "Accessories" },
  { id: "yoga-ball", name: "Yoga Ball (Exercise Ball)", category: "Accessories" },
  { id: "yoga-mat", name: "Yoga Mat", category: "Accessories" },
  { id: "jump-rope", name: "Jump Rope", category: "Accessories" },
  { id: "foam-roller", name: "Foam Roller", category: "Accessories" },
  { id: "battle-ropes", name: "Battle Ropes", category: "Accessories" },
  { id: "ankle-weights", name: "Ankle Weights", category: "Accessories" },
  { id: "wrist-weights", name: "Wrist Weights", category: "Accessories" },
  { id: "door-anchor", name: "Door Anchor (for Bands)", category: "Accessories" },
  { id: "bosu-ball", name: "BOSU Ball", category: "Accessories" },
  { id: "agility-ladder", name: "Agility Ladder", category: "Accessories" },
  { id: "sledgehammer-tire", name: "Sledgehammer & Tire", category: "Accessories" },

  // Benches & Racks
  { id: "bench", name: "Bench (Flat/Incline)", category: "Benches & Racks" },
  { id: "squat-rack", name: "Squat Rack / Power Rack", category: "Benches & Racks" },
  { id: "plyo-box", name: "Plyo Box", category: "Benches & Racks" },
  { id: "landmine-attachment", name: "Landmine Attachment", category: "Benches & Racks" },
  { id: "dip-belt", name: "Dip Belt (Weighted)", category: "Benches & Racks" },

  // Cardio Machines
  { id: "treadmill", name: "Treadmill", category: "Cardio Machines" },
  { id: "stationary-bike", name: "Stationary Bike", category: "Cardio Machines" },
  { id: "rowing-machine", name: "Rowing Machine", category: "Cardio Machines" },
  { id: "elliptical", name: "Elliptical", category: "Cardio Machines" },
  { id: "stair-climber", name: "Stair Climber", category: "Cardio Machines" },
  { id: "air-bike", name: "Air Bike / Assault Bike", category: "Cardio Machines" },
];

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  requiredEquipment: EquipmentId[];
  images: string[];
  duration: number; // seconds
  difficulty: Difficulty;
}

export type Difficulty = "easy" | "medium" | "hard";

type ExerciseTemplate = Omit<Exercise, "difficulty">;

// Bodyweight exercises (no equipment needed)
const bodyweightExercises: ExerciseTemplate[] = [
  { id: "pushups", name: "Push-Ups", description: "Start in a high plank. Lower your chest to the floor, then push back up. Keep your core tight and body straight.", muscleGroup: "Chest", requiredEquipment: [], images: exImg("Pushups"), duration: 40 },
  { id: "squats", name: "Bodyweight Squats", description: "Stand with feet shoulder-width apart. Bend knees and lower hips as if sitting in a chair. Drive through heels to stand.", muscleGroup: "Legs", requiredEquipment: [], images: exImg("Bodyweight_Squat"), duration: 40 },
  { id: "lunges", name: "Walking Lunges", description: "Step forward with one leg, lowering your hips until both knees are bent at 90°. Push off your front foot and step the back leg forward.", muscleGroup: "Legs", requiredEquipment: [], images: exImg("Bodyweight_Walking_Lunge"), duration: 40 },
  { id: "plank", name: "Plank Hold", description: "Hold a straight-arm or forearm plank position. Keep your body in a straight line from head to heels. Engage your core throughout.", muscleGroup: "Core", requiredEquipment: [], images: exImg("Plank"), duration: 40 },
  { id: "mountain-climbers", name: "Mountain Climbers", description: "Start in a high plank. Drive your knees alternately toward your chest in a running motion. Keep your hips level.", muscleGroup: "Core", requiredEquipment: [], images: exImg("Mountain_Climbers"), duration: 30 },
  { id: "burpees", name: "Burpees", description: "From standing, drop into a squat, kick feet back into plank, do a push-up, jump feet forward, then jump up with arms overhead.", muscleGroup: "Full Body", requiredEquipment: [], images: exImg("Burpee"), duration: 30 },
  { id: "high-knees", name: "High Knees", description: "Run in place, driving your knees up to hip height as fast as possible. Pump your arms for momentum.", muscleGroup: "Cardio", requiredEquipment: [], images: exImg("High_Knee_Jog"), duration: 30 },
  { id: "glute-bridge", name: "Glute Bridge", description: "Lie on your back with knees bent. Drive through your heels to lift your hips until your body forms a straight line from shoulders to knees.", muscleGroup: "Glutes", requiredEquipment: [], images: exImg("Butt_Lift_(Bridge)"), duration: 40 },
  { id: "superman", name: "Superman Hold", description: "Lie face down. Simultaneously lift your arms, chest, and legs off the floor. Hold briefly and lower back down.", muscleGroup: "Back", requiredEquipment: [], images: exImg("Superman"), duration: 30 },
  { id: "tricep-dips-floor", name: "Floor Tricep Dips", description: "Sit on the floor with hands behind you, fingers forward. Lift hips and bend elbows to lower, then press back up.", muscleGroup: "Arms", requiredEquipment: [], images: exImg("Bench_Dips"), duration: 40 },
];

const equipmentExercises: ExerciseTemplate[] = [
  // Dumbbell exercises
  { id: "db-bicep-curl", name: "Dumbbell Bicep Curls", description: "Stand with dumbbells at your sides, palms forward. Curl the weights up to shoulder height, squeezing biceps. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["dumbbells"], images: exImg("Dumbbell_Bicep_Curl"), duration: 40 },
  { id: "db-shoulder-press", name: "Dumbbell Shoulder Press", description: "Sit or stand with dumbbells at shoulder height. Press weights overhead until arms are straight. Lower back to shoulders.", muscleGroup: "Shoulders", requiredEquipment: ["dumbbells"], images: exImg("Dumbbell_Shoulder_Press"), duration: 40 },
  { id: "db-goblet-squat", name: "Goblet Squat", description: "Hold one dumbbell at your chest with both hands. Squat down, keeping elbows inside your knees. Stand back up.", muscleGroup: "Legs", requiredEquipment: ["dumbbells"], images: exImg("Goblet_Squat"), duration: 40 },
  { id: "db-lunges", name: "Dumbbell Lunges", description: "Hold dumbbells at your sides. Step forward into a lunge, lowering until both knees are at 90°. Push back to start.", muscleGroup: "Legs", requiredEquipment: ["dumbbells"], images: exImg("Dumbbell_Lunges"), duration: 40 },
  { id: "db-bent-row", name: "Dumbbell Bent-Over Row", description: "Hinge at hips with dumbbells hanging. Pull weights to your ribcage, squeezing shoulder blades. Lower with control.", muscleGroup: "Back", requiredEquipment: ["dumbbells"], images: exImg("Bent_Over_Two-Dumbbell_Row"), duration: 40 },
  { id: "db-lateral-raise", name: "Lateral Raises", description: "Stand with dumbbells at sides. Raise arms out to the sides until parallel to the floor. Lower slowly.", muscleGroup: "Shoulders", requiredEquipment: ["dumbbells"], images: exImg("Side_Lateral_Raise"), duration: 40 },
  { id: "db-tricep-ext", name: "Overhead Tricep Extension", description: "Hold one dumbbell overhead with both hands. Lower it behind your head by bending elbows. Extend back up.", muscleGroup: "Arms", requiredEquipment: ["dumbbells"], images: exImg("Overhead_Triceps"), duration: 40 },
  { id: "db-chest-fly", name: "Dumbbell Chest Fly", description: "Lie on a bench with dumbbells above chest. Open arms wide, lowering weights in an arc. Squeeze chest to return.", muscleGroup: "Chest", requiredEquipment: ["dumbbells", "bench"], images: exImg("Dumbbell_Flyes"), duration: 40 },
  { id: "db-bench-press", name: "Dumbbell Bench Press", description: "Lie on bench with dumbbells at chest level. Press weights up until arms are straight. Lower with control.", muscleGroup: "Chest", requiredEquipment: ["dumbbells", "bench"], images: exImg("Dumbbell_Bench_Press"), duration: 40 },
  { id: "db-hammer-curl", name: "Hammer Curls", description: "Hold dumbbells with palms facing each other. Curl weights to shoulders without rotating wrists. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["dumbbells"], images: exImg("Hammer_Curls"), duration: 40 },
  { id: "db-renegade-row", name: "Renegade Row", description: "Start in push-up position with hands on dumbbells. Row one dumbbell to hip, then the other. Keep hips square.", muscleGroup: "Back", requiredEquipment: ["dumbbells"], images: exImg("Alternating_Renegade_Row"), duration: 40 },

  // Barbell exercises
  { id: "bb-squat", name: "Barbell Back Squat", description: "Bar on upper back, feet shoulder-width. Squat until thighs are parallel to floor. Drive through heels to stand.", muscleGroup: "Legs", requiredEquipment: ["barbell", "squat-rack"], images: exImg("Barbell_Squat"), duration: 45 },
  { id: "bb-deadlift", name: "Barbell Deadlift", description: "Stand over the bar, hip-width stance. Hinge at hips, grip bar. Drive through floor to stand tall. Lower with control.", muscleGroup: "Back", requiredEquipment: ["barbell"], images: exImg("Barbell_Deadlift"), duration: 45 },
  { id: "bb-bench-press", name: "Barbell Bench Press", description: "Lie on bench, grip bar slightly wider than shoulders. Lower bar to chest, then press up. Keep feet flat on floor.", muscleGroup: "Chest", requiredEquipment: ["barbell", "bench"], images: exImg("Barbell_Bench_Press_-_Medium_Grip"), duration: 45 },
  { id: "bb-overhead-press", name: "Barbell Overhead Press", description: "Stand with bar at shoulders. Press bar overhead until arms lock out. Lower back to shoulders with control.", muscleGroup: "Shoulders", requiredEquipment: ["barbell"], images: exImg("Barbell_Shoulder_Press"), duration: 45 },
  { id: "bb-bent-row", name: "Barbell Bent-Over Row", description: "Hinge forward, grip bar overhand. Pull bar to lower chest, squeezing back muscles. Lower with control.", muscleGroup: "Back", requiredEquipment: ["barbell"], images: exImg("Bent_Over_Barbell_Row"), duration: 45 },
  { id: "bb-curl", name: "Barbell Curl", description: "Stand with bar at hip height, underhand grip. Curl bar to shoulders without swinging. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["barbell"], images: exImg("Barbell_Curl"), duration: 40 },

  // EZ Curl Bar
  { id: "ez-curl", name: "EZ Bar Curl", description: "Grip the EZ bar at the angled portions. Curl up to shoulders, keeping elbows pinned to your sides. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["ez-curl-bar"], images: exImg("Close-Grip_EZ_Bar_Curl"), duration: 40 },
  { id: "ez-skull-crusher", name: "Skull Crushers", description: "Lie on bench with EZ bar above chest. Lower bar toward forehead by bending elbows. Extend back up.", muscleGroup: "Arms", requiredEquipment: ["ez-curl-bar", "bench"], images: exImg("Decline_EZ_Bar_Triceps_Extension"), duration: 40 },

  // Kettlebell exercises
  { id: "kb-swing", name: "Kettlebell Swing", description: "Hinge at hips with kettlebell between legs. Snap hips forward to swing the bell to chest height. Control the descent.", muscleGroup: "Full Body", requiredEquipment: ["kettlebells"], images: exImg("One-Arm_Kettlebell_Swings"), duration: 35 },
  { id: "kb-goblet-squat", name: "Kettlebell Goblet Squat", description: "Hold kettlebell at chest. Squat deep with elbows inside knees. Stand back up through heels.", muscleGroup: "Legs", requiredEquipment: ["kettlebells"], images: exImg("Goblet_Squat"), duration: 40 },
  { id: "kb-turkish-getup", name: "Turkish Get-Up", description: "Lie down holding kettlebell overhead. Slowly stand up while keeping the weight overhead. Reverse to lie back down.", muscleGroup: "Full Body", requiredEquipment: ["kettlebells"], images: exImg("Kettlebell_Turkish_Get-Up_(Squat_style)"), duration: 50 },
  { id: "kb-clean-press", name: "Kettlebell Clean & Press", description: "Swing kettlebell to rack position at shoulder, then press overhead. Lower back to rack, then swing down.", muscleGroup: "Shoulders", requiredEquipment: ["kettlebells"], images: exImg("Clean_and_Press"), duration: 40 },

  // Cable Machine
  { id: "cable-fly", name: "Cable Chest Fly", description: "Set pulleys to chest height. Step forward, arms wide. Bring handles together in front of your chest in a hugging motion.", muscleGroup: "Chest", requiredEquipment: ["cable-machine"], images: exImg("Cable_Crossover"), duration: 40 },
  { id: "cable-row", name: "Seated Cable Row", description: "Sit at the cable row station. Pull handle to your torso, squeezing shoulder blades together. Extend arms slowly.", muscleGroup: "Back", requiredEquipment: ["cable-machine"], images: exImg("Seated_Cable_Rows"), duration: 40 },
  { id: "cable-tricep", name: "Cable Tricep Pushdown", description: "Face the cable machine with high pulley. Push the bar or rope down by extending elbows. Return slowly.", muscleGroup: "Arms", requiredEquipment: ["cable-machine"], images: exImg("Triceps_Pushdown"), duration: 40 },
  { id: "cable-bicep", name: "Cable Bicep Curl", description: "Face the cable machine with low pulley. Curl the handle up to shoulders, keeping elbows fixed. Lower with control.", muscleGroup: "Arms", requiredEquipment: ["cable-machine"], images: exImg("Cable_Hammer_Curls_-_Rope_Attachment"), duration: 40 },
  { id: "cable-woodchop", name: "Cable Woodchop", description: "Set cable high. Pull diagonally across body to opposite hip, rotating torso. Control the return.", muscleGroup: "Core", requiredEquipment: ["cable-machine"], images: exImg("Cable_Russian_Twists"), duration: 40 },

  // Machines
  { id: "leg-press-ex", name: "Leg Press", description: "Sit in the leg press machine. Place feet shoulder-width on platform. Push platform away, then bend knees to lower.", muscleGroup: "Legs", requiredEquipment: ["leg-press"], images: exImg("Leg_Press"), duration: 45 },
  { id: "lat-pulldown-ex", name: "Lat Pulldown", description: "Grip the wide bar overhand. Pull it to your upper chest while squeezing shoulder blades. Return slowly overhead.", muscleGroup: "Back", requiredEquipment: ["lat-pulldown"], images: exImg("Wide-Grip_Lat_Pulldown"), duration: 40 },
  { id: "chest-press-ex", name: "Machine Chest Press", description: "Sit in the chest press machine. Push handles forward until arms extend. Return slowly to start position.", muscleGroup: "Chest", requiredEquipment: ["chest-press-machine"], images: exImg("Leverage_Chest_Press"), duration: 40 },
  { id: "leg-ext-ex", name: "Leg Extensions", description: "Sit in the machine with pad on shins. Extend legs until straight, squeezing quads at top. Lower with control.", muscleGroup: "Legs", requiredEquipment: ["leg-extension"], images: exImg("Leg_Extensions"), duration: 40 },
  { id: "leg-curl-ex", name: "Leg Curls", description: "Lie face down on the machine. Curl your heels toward your glutes, squeezing hamstrings. Lower slowly.", muscleGroup: "Legs", requiredEquipment: ["leg-curl"], images: exImg("Lying_Leg_Curls"), duration: 40 },
  { id: "pec-deck-ex", name: "Pec Deck Fly", description: "Sit with arms on the pads at chest height. Bring pads together in front of your chest. Open arms slowly.", muscleGroup: "Chest", requiredEquipment: ["pec-deck"], images: exImg("Butterfly"), duration: 40 },
  { id: "machine-shoulder", name: "Machine Shoulder Press", description: "Sit in the shoulder press machine. Press handles overhead until arms are straight. Lower to shoulder height.", muscleGroup: "Shoulders", requiredEquipment: ["shoulder-press-machine"], images: exImg("Seated_Cable_Shoulder_Press"), duration: 40 },
  { id: "smith-squat", name: "Smith Machine Squat", description: "Stand under the smith machine bar. Unrack and squat, keeping feet slightly forward. Press back up.", muscleGroup: "Legs", requiredEquipment: ["smith-machine"], images: exImg("Smith_Machine_Squat"), duration: 45 },

  // Pull-Up Bar
  { id: "pullups", name: "Pull-Ups", description: "Hang from bar with overhand grip. Pull your chin above the bar by driving elbows down. Lower with control.", muscleGroup: "Back", requiredEquipment: ["pull-up-bar"], images: exImg("Pullups"), duration: 40 },
  { id: "chin-ups", name: "Chin-Ups", description: "Hang with underhand grip, shoulder-width. Pull chin above bar, focusing on biceps. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["pull-up-bar"], images: exImg("Chin-Up"), duration: 40 },
  { id: "hanging-leg-raise", name: "Hanging Leg Raise", description: "Hang from bar with straight arms. Raise legs to parallel or higher. Lower with control—don't swing.", muscleGroup: "Core", requiredEquipment: ["pull-up-bar"], images: exImg("Hanging_Leg_Raise"), duration: 35 },

  // Dip Station
  { id: "dips", name: "Parallel Bar Dips", description: "Support yourself on dip bars with straight arms. Lower by bending elbows until upper arms are parallel. Push back up.", muscleGroup: "Chest", requiredEquipment: ["dip-station"], images: exImg("Dips_-_Chest_Version"), duration: 40 },

  // Gymnastic Rings
  { id: "ring-rows", name: "Ring Rows", description: "Hang below the rings with body straight. Pull chest up to the rings, squeezing back. Lower with control.", muscleGroup: "Back", requiredEquipment: ["gymnastic-rings"], images: exImg("Inverted_Row"), duration: 40 },
  { id: "ring-pushups", name: "Ring Push-Ups", description: "Support yourself on rings in push-up position. Lower chest to ring level. Push back up, stabilizing throughout.", muscleGroup: "Chest", requiredEquipment: ["gymnastic-rings"], images: exImg("Pushups"), duration: 40 },
  { id: "ring-dips", name: "Ring Dips", description: "Support on rings with arms straight. Lower by bending elbows. Press back up while stabilizing the rings.", muscleGroup: "Chest", requiredEquipment: ["gymnastic-rings"], images: exImg("Dips_-_Chest_Version"), duration: 40 },

  // Resistance Bands
  { id: "band-pull-apart", name: "Band Pull-Apart", description: "Hold band in front at shoulder height. Pull hands apart, stretching the band across your chest. Return slowly.", muscleGroup: "Back", requiredEquipment: ["resistance-bands"], images: exImg("Back_Flyes_-_With_Bands"), duration: 40 },
  { id: "band-squat", name: "Banded Squat", description: "Stand on band, holding handles at shoulders. Squat down against the band tension. Stand back up.", muscleGroup: "Legs", requiredEquipment: ["resistance-bands"], images: exImg("Bodyweight_Squat"), duration: 40 },
  { id: "band-curl", name: "Band Bicep Curl", description: "Stand on band, grip handles. Curl hands to shoulders against band resistance. Lower with control.", muscleGroup: "Arms", requiredEquipment: ["resistance-bands"], images: exImg("Dumbbell_Bicep_Curl"), duration: 40 },
  { id: "band-lateral-walk", name: "Banded Lateral Walk", description: "Place band around ankles or knees. Get into a half-squat and step sideways, maintaining tension. Repeat.", muscleGroup: "Glutes", requiredEquipment: ["resistance-bands"], images: exImg("Band_Hip_Adductions"), duration: 40 },

  // TRX / Suspension
  { id: "trx-row", name: "TRX Row", description: "Lean back holding TRX handles, body straight. Pull chest toward handles, squeezing back. Lower with control.", muscleGroup: "Back", requiredEquipment: ["trx-suspension"], images: exImg("Inverted_Row"), duration: 40 },
  { id: "trx-pushup", name: "TRX Push-Up", description: "Place feet in TRX straps, hands on floor. Perform push-ups with feet suspended. Keep core tight.", muscleGroup: "Chest", requiredEquipment: ["trx-suspension"], images: exImg("Pushups"), duration: 40 },
  { id: "trx-squat", name: "TRX Squat", description: "Hold TRX handles, lean back slightly. Squat deep while using straps for balance. Stand back up.", muscleGroup: "Legs", requiredEquipment: ["trx-suspension"], images: exImg("Bodyweight_Squat"), duration: 40 },
  { id: "trx-pike", name: "TRX Pike", description: "Feet in straps, plank position. Pike hips up toward ceiling while keeping legs straight. Return to plank.", muscleGroup: "Core", requiredEquipment: ["trx-suspension"], images: exImg("Hanging_Pike"), duration: 35 },

  // Ab Wheel
  { id: "ab-rollout", name: "Ab Wheel Rollout", description: "Kneel with hands on ab wheel. Roll forward extending your body. Use core to pull back to start. Keep back flat.", muscleGroup: "Core", requiredEquipment: ["ab-wheel"], images: exImg("Ab_Roller"), duration: 35 },

  // Medicine Ball
  { id: "med-ball-slam", name: "Medicine Ball Slam", description: "Lift medicine ball overhead. Slam it to the ground as hard as possible. Squat to pick it up and repeat.", muscleGroup: "Full Body", requiredEquipment: ["medicine-ball"], images: exImg("Overhead_Slam"), duration: 30 },
  { id: "med-ball-twist", name: "Russian Twist w/ Med Ball", description: "Sit with knees bent, feet off floor, holding ball. Rotate torso side to side, tapping ball on each side.", muscleGroup: "Core", requiredEquipment: ["medicine-ball"], images: exImg("Russian_Twist"), duration: 40 },
  { id: "med-ball-wall-throw", name: "Wall Ball Throws", description: "Hold ball at chest, stand facing wall. Squat, then explode up, throwing ball to a target on the wall. Catch and repeat.", muscleGroup: "Full Body", requiredEquipment: ["medicine-ball"], images: exImg("Medicine_Ball_Chest_Pass"), duration: 35 },

  // Stability Ball
  { id: "stability-crunch", name: "Stability Ball Crunch", description: "Lie back on stability ball with feet on floor. Crunch upward, squeezing abs. Lower back over the ball.", muscleGroup: "Core", requiredEquipment: ["stability-ball"], images: exImg("Exercise_Ball_Crunch"), duration: 40 },
  { id: "stability-hamstring", name: "Stability Ball Hamstring Curl", description: "Lie on back, heels on ball. Lift hips, then curl the ball toward your glutes. Extend legs and repeat.", muscleGroup: "Legs", requiredEquipment: ["stability-ball"], images: exImg("Ball_Leg_Curl"), duration: 40 },

  // Bench
  { id: "step-ups", name: "Bench Step-Ups", description: "Step up onto bench with one foot. Drive through heel to stand on bench. Step down and switch legs.", muscleGroup: "Legs", requiredEquipment: ["bench"], images: exImg("Dumbbell_Step_Ups"), duration: 40 },
  { id: "bench-dips", name: "Bench Tricep Dips", description: "Hands on bench edge, legs extended. Lower your body by bending elbows. Push back up to straight arms.", muscleGroup: "Arms", requiredEquipment: ["bench"], images: exImg("Bench_Dips"), duration: 40 },
  { id: "incline-pushup", name: "Incline Push-Ups", description: "Place hands on bench, body at an angle. Perform push-ups. Easier than floor push-ups, great for beginners.", muscleGroup: "Chest", requiredEquipment: ["bench"], images: exImg("Incline_Push-Up"), duration: 40 },

  // Plyo Box
  { id: "box-jumps", name: "Box Jumps", description: "Stand facing the box. Bend knees and jump onto the box, landing softly. Step back down and repeat.", muscleGroup: "Legs", requiredEquipment: ["plyo-box"], images: exImg("Front_Box_Jump"), duration: 30 },
  { id: "box-step-ups", name: "Box Step-Ups", description: "Step onto the plyo box one foot at a time. Stand tall at the top, then step back down. Alternate legs.", muscleGroup: "Legs", requiredEquipment: ["plyo-box"], images: exImg("Dumbbell_Step_Ups"), duration: 40 },

  // Battle Ropes
  { id: "battle-waves", name: "Battle Rope Waves", description: "Hold rope ends, feet shoulder-width. Alternately whip arms up and down to create waves in the rope. Keep core tight.", muscleGroup: "Full Body", requiredEquipment: ["battle-ropes"], images: exImg("Rope_Jumping"), duration: 30 },
  { id: "battle-slams", name: "Battle Rope Slams", description: "Lift both rope ends overhead. Slam them down together forcefully. Repeat with explosive power.", muscleGroup: "Full Body", requiredEquipment: ["battle-ropes"], images: exImg("Overhead_Slam"), duration: 30 },

  // Parallettes
  { id: "parallette-pushup", name: "Parallette Push-Ups", description: "Grip parallettes in push-up position. Lower chest below hand level for deeper range. Push back up.", muscleGroup: "Chest", requiredEquipment: ["parallettes"], images: exImg("Pushups"), duration: 40 },
  { id: "parallette-l-sit", name: "L-Sit Hold", description: "Sit between parallettes, hands on bars. Press up, lifting your body with legs extended forward. Hold.", muscleGroup: "Core", requiredEquipment: ["parallettes"], images: exImg("Plank"), duration: 30 },

  // Jump Rope
  { id: "jump-rope-basic", name: "Jump Rope", description: "Swing rope overhead and jump with both feet together. Stay on balls of feet. Keep jumps small and wrists active.", muscleGroup: "Cardio", requiredEquipment: ["jump-rope"], images: exImg("Rope_Jumping"), duration: 45 },
  { id: "jump-rope-double", name: "Double Unders", description: "Swing rope fast enough to pass under feet twice per jump. Jump higher than normal. Requires practice!", muscleGroup: "Cardio", requiredEquipment: ["jump-rope"], images: exImg("Rope_Jumping"), duration: 30 },

  // Cardio Machines
  { id: "treadmill-sprint", name: "Treadmill Sprint", description: "Set the treadmill to a challenging pace. Sprint at high intensity for the duration. Use the rails for safety.", muscleGroup: "Cardio", requiredEquipment: ["treadmill"], images: exImg("Running_Treadmill"), duration: 30 },
  { id: "bike-intervals", name: "Bike Sprint Intervals", description: "Pedal at maximum effort with high resistance. Go all-out for the interval duration. Great for leg endurance.", muscleGroup: "Cardio", requiredEquipment: ["stationary-bike"], images: exImg("Recumbent_Bike"), duration: 30 },
  { id: "rowing-intervals", name: "Rowing Intervals", description: "Row at maximum effort. Drive with legs first, then pull with arms. Keep strokes powerful and rhythmic.", muscleGroup: "Full Body", requiredEquipment: ["rowing-machine"], images: exImg("Rowing_Stationary"), duration: 40 },
  { id: "elliptical-intervals", name: "Elliptical Sprint", description: "Set resistance high and move at maximum pace. Push and pull with both arms and legs. Full body cardio.", muscleGroup: "Cardio", requiredEquipment: ["elliptical"], images: exImg("Elliptical_Trainer"), duration: 30 },
  { id: "stair-climber-intervals", name: "Stair Climber Sprint", description: "Climb at high intensity without holding the rails. Drive through each step. Great for glutes and quads.", muscleGroup: "Cardio", requiredEquipment: ["stair-climber"], images: exImg("Stairmaster"), duration: 30 },

  // Power Tower exercises
  { id: "pt-pullups", name: "Power Tower Pull-Ups", description: "Grip the pull-up handles on the power tower. Pull chin above the bar, driving elbows down. Lower with control.", muscleGroup: "Back", requiredEquipment: ["power-tower"], images: exImg("Pullups"), duration: 40 },
  { id: "pt-dips", name: "Power Tower Dips", description: "Use the dip handles on the power tower. Lower body by bending elbows to 90°. Press back up.", muscleGroup: "Chest", requiredEquipment: ["power-tower"], images: exImg("Dips_-_Chest_Version"), duration: 40 },
  { id: "pt-knee-raise", name: "Power Tower Knee Raise", description: "Support yourself on the arm rests. Raise knees to chest, squeezing abs. Lower slowly without swinging.", muscleGroup: "Core", requiredEquipment: ["power-tower"], images: exImg("Hanging_Leg_Raise"), duration: 35 },
  { id: "pt-leg-raise", name: "Power Tower Leg Raise", description: "Hang from the pull-up bar. Raise straight legs to parallel or higher. Lower with control—don't swing.", muscleGroup: "Core", requiredEquipment: ["power-tower"], images: exImg("Hanging_Leg_Raise"), duration: 35 },
  { id: "pt-chin-ups", name: "Power Tower Chin-Ups", description: "Grip with palms facing you on the power tower. Pull chin above bar, focusing on bicep contraction.", muscleGroup: "Arms", requiredEquipment: ["power-tower"], images: exImg("Chin-Up"), duration: 40 },
  { id: "pt-pushups", name: "Power Tower Push-Ups (Handles)", description: "Use the stationary push-up handles at the base of the power tower. Deeper range of motion than floor push-ups.", muscleGroup: "Chest", requiredEquipment: ["power-tower"], images: exImg("Pushups_(Close_and_Wide_Hand_Positions)"), duration: 40 },

  // Captain's Chair
  { id: "cc-knee-raise", name: "Captain's Chair Knee Raise", description: "Support yourself on arm pads. Bring knees up toward chest, rounding lower back slightly. Lower with control.", muscleGroup: "Core", requiredEquipment: ["captains-chair"], images: exImg("Hanging_Leg_Raise"), duration: 35 },
  { id: "cc-leg-raise", name: "Captain's Chair Leg Raise", description: "Support on arm pads. Raise straight legs to parallel. Pause and lower slowly. Don't swing.", muscleGroup: "Core", requiredEquipment: ["captains-chair"], images: exImg("Hanging_Leg_Raise"), duration: 35 },
  { id: "cc-oblique-raise", name: "Captain's Chair Oblique Raise", description: "Support on arm pads. Raise knees to one side, twisting torso. Alternate sides each rep.", muscleGroup: "Core", requiredEquipment: ["captains-chair"], images: exImg("Hanging_Leg_Raise"), duration: 35 },

  // Stationary Push-Up Handles
  { id: "puh-pushup", name: "Push-Up Handle Push-Ups", description: "Place handles shoulder-width. Grip and perform push-ups with a deeper range of motion. Keep core tight.", muscleGroup: "Chest", requiredEquipment: ["push-up-handles"], images: exImg("Pushups_(Close_and_Wide_Hand_Positions)"), duration: 40 },
  { id: "puh-wide", name: "Wide Push-Ups (Handles)", description: "Place handles wider than shoulders. Perform push-ups emphasizing chest stretch at the bottom.", muscleGroup: "Chest", requiredEquipment: ["push-up-handles"], images: exImg("Push-Up_Wide"), duration: 40 },
  { id: "puh-close", name: "Close-Grip Push-Ups (Handles)", description: "Place handles close together under chest. Perform push-ups focusing on tricep engagement.", muscleGroup: "Arms", requiredEquipment: ["push-up-handles"], images: exImg("Close-Grip_Push-Up_off_of_a_Dumbbell"), duration: 40 },

  // Rotating Push-Up Handles
  { id: "rph-pushup", name: "Rotating Push-Up", description: "Grip rotating handles and perform push-ups. The rotation engages stabilizer muscles and reduces wrist strain.", muscleGroup: "Chest", requiredEquipment: ["rotating-push-up-handles"], images: exImg("Pushups_(Close_and_Wide_Hand_Positions)"), duration: 40 },
  { id: "rph-wide", name: "Wide Rotating Push-Up", description: "Place rotating handles wide. Push up while allowing natural wrist rotation. Emphasizes chest.", muscleGroup: "Chest", requiredEquipment: ["rotating-push-up-handles"], images: exImg("Push-Up_Wide"), duration: 40 },
  { id: "rph-close", name: "Close Rotating Push-Up", description: "Place handles close together. Rotate inward as you push up, targeting triceps and inner chest.", muscleGroup: "Arms", requiredEquipment: ["rotating-push-up-handles"], images: exImg("Close-Grip_Push-Up_off_of_a_Dumbbell"), duration: 40 },
  { id: "rph-tblock", name: "T-Rotation Push-Up", description: "Do a push-up on rotating handles, then rotate one arm to the ceiling in a T position. Alternate sides.", muscleGroup: "Core", requiredEquipment: ["rotating-push-up-handles"], images: exImg("Push_Up_to_Side_Plank"), duration: 40 },

  // Adjustable Dumbbells / Hand Weights
  { id: "adj-curl", name: "Adjustable Dumbbell Curl", description: "Stand with adjustable dumbbells at sides. Curl up to shoulders, squeezing biceps at top. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["adjustable-dumbbells"], images: exImg("Dumbbell_Bicep_Curl"), duration: 40 },
  { id: "adj-press", name: "Adjustable Dumbbell Press", description: "Sit or stand with weights at shoulders. Press overhead until arms lock out. Lower with control.", muscleGroup: "Shoulders", requiredEquipment: ["adjustable-dumbbells"], images: exImg("Dumbbell_Shoulder_Press"), duration: 40 },
  { id: "adj-row", name: "Adjustable Dumbbell Row", description: "Hinge at hips holding adjustable dumbbells. Pull to ribcage, squeezing back. Lower with control.", muscleGroup: "Back", requiredEquipment: ["adjustable-dumbbells"], images: exImg("Bent_Over_Two-Dumbbell_Row"), duration: 40 },
  { id: "adj-lateral", name: "Adjustable Dumbbell Lateral Raise", description: "Stand with weights at sides. Raise arms to shoulder height, keeping slight elbow bend. Lower slowly.", muscleGroup: "Shoulders", requiredEquipment: ["adjustable-dumbbells"], images: exImg("Side_Lateral_Raise"), duration: 40 },
  { id: "adj-squat", name: "Adjustable Dumbbell Squat", description: "Hold weights at shoulders. Squat deep, then drive through heels to stand. Keep chest up.", muscleGroup: "Legs", requiredEquipment: ["adjustable-dumbbells"], images: exImg("Goblet_Squat"), duration: 40 },
  { id: "adj-lunge", name: "Adjustable Dumbbell Lunge", description: "Hold weights at sides. Step forward into lunge, both knees to 90°. Push back to start.", muscleGroup: "Legs", requiredEquipment: ["adjustable-dumbbells"], images: exImg("Dumbbell_Lunges"), duration: 40 },
  { id: "adj-fly", name: "Adjustable Dumbbell Fly", description: "Lie on bench with weights above chest. Open arms wide in an arc, then squeeze chest to close.", muscleGroup: "Chest", requiredEquipment: ["adjustable-dumbbells", "bench"], images: exImg("Dumbbell_Flyes"), duration: 40 },
  { id: "adj-tricep", name: "Adjustable Dumbbell Tricep Extension", description: "Hold one weight overhead with both hands. Lower behind head, then extend back up.", muscleGroup: "Arms", requiredEquipment: ["adjustable-dumbbells"], images: exImg("Overhead_Triceps"), duration: 40 },

  // Yoga Ball (Exercise Ball)
  { id: "yb-crunch", name: "Yoga Ball Crunch", description: "Lie back on the yoga ball, feet planted. Crunch upward squeezing abs. Lower back over the ball.", muscleGroup: "Core", requiredEquipment: ["yoga-ball"], images: exImg("Exercise_Ball_Crunch"), duration: 40 },
  { id: "yb-pike", name: "Yoga Ball Pike", description: "Plank with shins on the ball. Pike hips up, rolling ball toward hands. Return to plank.", muscleGroup: "Core", requiredEquipment: ["yoga-ball"], images: exImg("Exercise_Ball_Pull-In"), duration: 35 },
  { id: "yb-hamstring-curl", name: "Yoga Ball Hamstring Curl", description: "Lie on back, heels on ball. Lift hips and curl ball toward glutes. Extend and repeat.", muscleGroup: "Legs", requiredEquipment: ["yoga-ball"], images: exImg("Ball_Leg_Curl"), duration: 40 },
  { id: "yb-wall-squat", name: "Yoga Ball Wall Squat", description: "Place ball between your back and the wall. Squat down, rolling the ball. Stand back up.", muscleGroup: "Legs", requiredEquipment: ["yoga-ball"], images: exImg("Bodyweight_Squat"), duration: 40 },
  { id: "yb-back-ext", name: "Yoga Ball Back Extension", description: "Lie face down over the ball, feet anchored. Lift chest up, squeezing lower back. Lower with control.", muscleGroup: "Back", requiredEquipment: ["yoga-ball"], images: exImg("Superman"), duration: 35 },
  { id: "yb-plank", name: "Yoga Ball Plank", description: "Forearms on the yoga ball, body straight. Hold the plank, fighting the instability. Engage your core.", muscleGroup: "Core", requiredEquipment: ["yoga-ball"], images: exImg("Plank"), duration: 40 },
  { id: "yb-pass", name: "Yoga Ball V-Pass", description: "Lie flat, ball in hands. Lift arms and legs, passing ball from hands to feet. Lower and repeat.", muscleGroup: "Core", requiredEquipment: ["yoga-ball"], images: exImg("3_4_Sit-Up"), duration: 35 },

  // Yoga Mat
  { id: "ym-cobra", name: "Cobra Stretch", description: "Lie face down on mat. Press hands into floor, lifting chest while keeping hips down. Hold and breathe.", muscleGroup: "Back", requiredEquipment: ["yoga-mat"], images: exImg("Superman"), duration: 40 },
  { id: "ym-bird-dog", name: "Bird Dog", description: "On all fours on the mat. Extend opposite arm and leg simultaneously. Hold briefly, then switch sides.", muscleGroup: "Core", requiredEquipment: ["yoga-mat"], images: exImg("Dead_Bug"), duration: 40 },
  { id: "ym-dead-bug", name: "Dead Bug", description: "Lie on back, arms up, knees at 90°. Lower opposite arm and leg toward floor. Return and switch.", muscleGroup: "Core", requiredEquipment: ["yoga-mat"], images: exImg("Dead_Bug"), duration: 40 },

  // Ankle Weights
  { id: "aw-leg-raise", name: "Weighted Leg Raise", description: "Lie on back with ankle weights. Raise straight legs to 90°. Lower slowly without touching floor.", muscleGroup: "Core", requiredEquipment: ["ankle-weights"], images: exImg("Flat_Bench_Lying_Leg_Raise"), duration: 40 },
  { id: "aw-donkey-kick", name: "Weighted Donkey Kick", description: "On all fours with ankle weights. Kick one leg back and up, squeezing glute at top. Switch legs.", muscleGroup: "Glutes", requiredEquipment: ["ankle-weights"], images: exImg("Rear_Leg_Raises"), duration: 40 },
  { id: "aw-side-leg", name: "Weighted Side Leg Raise", description: "Lie on side with ankle weights. Raise top leg up, keeping it straight. Lower slowly. Switch sides.", muscleGroup: "Glutes", requiredEquipment: ["ankle-weights"], images: exImg("Side_Leg_Raises"), duration: 40 },

  // Wrist Weights
  { id: "ww-shadow-box", name: "Weighted Shadow Boxing", description: "Wear wrist weights and throw punches—jabs, crosses, hooks, uppercuts. Keep core engaged, stay light on feet.", muscleGroup: "Cardio", requiredEquipment: ["wrist-weights"], images: exImg("Pushups"), duration: 40 },
  { id: "ww-arm-circles", name: "Weighted Arm Circles", description: "With wrist weights, extend arms and make circles. Alternate small/large, forward/backward.", muscleGroup: "Shoulders", requiredEquipment: ["wrist-weights"], images: exImg("Arm_Circles"), duration: 40 },

  // Pull-Up Assist Band
  { id: "pab-pullup", name: "Band-Assisted Pull-Up", description: "Loop band over bar, place knee or foot in band. Perform pull-ups with band supporting some of your weight.", muscleGroup: "Back", requiredEquipment: ["pull-up-assist-band", "pull-up-bar"], images: exImg("Band_Assisted_Pull-Up"), duration: 40 },
  { id: "pab-chinup", name: "Band-Assisted Chin-Up", description: "Loop band over bar, underhand grip. Pull chin above bar with band assist. Great for building strength.", muscleGroup: "Arms", requiredEquipment: ["pull-up-assist-band", "pull-up-bar"], images: exImg("Chin-Up"), duration: 40 },

  // Door Anchor + Bands
  { id: "da-face-pull", name: "Band Face Pull (Door)", description: "Anchor band at face height. Pull toward face, separating hands and squeezing rear delts.", muscleGroup: "Shoulders", requiredEquipment: ["door-anchor", "resistance-bands"], images: exImg("Face_Pull"), duration: 40 },
  { id: "da-chest-press", name: "Band Chest Press (Door)", description: "Anchor band behind you at chest height. Press handles forward, squeezing chest. Return slowly.", muscleGroup: "Chest", requiredEquipment: ["door-anchor", "resistance-bands"], images: exImg("Cable_Chest_Press"), duration: 40 },
  { id: "da-lat-pull", name: "Band Lat Pulldown (Door)", description: "Anchor band high. Kneel and pull handles down to shoulders, squeezing lats. Release slowly.", muscleGroup: "Back", requiredEquipment: ["door-anchor", "resistance-bands"], images: exImg("Wide-Grip_Lat_Pulldown"), duration: 40 },

  // Landmine
  { id: "lm-press", name: "Landmine Press", description: "Hold end of barbell at shoulder. Press up and forward at an angle. Great for shoulder-friendly pressing.", muscleGroup: "Shoulders", requiredEquipment: ["landmine-attachment", "barbell"], images: exImg("Barbell_Shoulder_Press"), duration: 40 },
  { id: "lm-row", name: "Landmine Row", description: "Straddle the barbell, hinge forward. Row the end of the bar to your chest. Lower with control.", muscleGroup: "Back", requiredEquipment: ["landmine-attachment", "barbell"], images: exImg("Bent_Over_Barbell_Row"), duration: 40 },
  { id: "lm-squat", name: "Landmine Squat", description: "Hold barbell end at chest. Squat deep, then drive up. The angle makes it more quad-dominant.", muscleGroup: "Legs", requiredEquipment: ["landmine-attachment", "barbell"], images: exImg("Barbell_Squat"), duration: 40 },
  { id: "lm-rotation", name: "Landmine Rotation", description: "Hold barbell end with both hands. Rotate side to side in an arc, engaging obliques. Control the movement.", muscleGroup: "Core", requiredEquipment: ["landmine-attachment", "barbell"], images: exImg("Russian_Twist"), duration: 40 },

  // Hex / Trap Bar
  { id: "htb-deadlift", name: "Trap Bar Deadlift", description: "Stand inside the hex bar. Grip handles, push through floor to stand tall. Lower with control.", muscleGroup: "Back", requiredEquipment: ["hex-trap-bar"], images: exImg("Barbell_Deadlift"), duration: 45 },
  { id: "htb-shrug", name: "Trap Bar Shrugs", description: "Stand inside hex bar, hold handles. Shrug shoulders up toward ears. Squeeze traps at top. Lower.", muscleGroup: "Shoulders", requiredEquipment: ["hex-trap-bar"], images: exImg("Barbell_Shrug"), duration: 40 },
  { id: "htb-carry", name: "Trap Bar Farmer's Carry", description: "Stand in hex bar, lift it. Walk forward with controlled steps, keeping core braced and shoulders back.", muscleGroup: "Full Body", requiredEquipment: ["hex-trap-bar"], images: exImg("Farmers_Walk"), duration: 40 },

  // Dip Belt
  { id: "db-weighted-dip", name: "Weighted Dips", description: "Attach weight to dip belt. Perform dips on parallel bars with added resistance. Lower and press up.", muscleGroup: "Chest", requiredEquipment: ["dip-belt", "dip-station"], images: exImg("Dips_-_Chest_Version"), duration: 40 },
  { id: "db-weighted-pullup", name: "Weighted Pull-Ups", description: "Attach weight to dip belt. Perform pull-ups with added resistance for advanced strength building.", muscleGroup: "Back", requiredEquipment: ["dip-belt", "pull-up-bar"], images: exImg("Pullups"), duration: 40 },

  // Sandbag
  { id: "sb-clean", name: "Sandbag Clean", description: "Grip sandbag handles from the floor. Explosively pull to shoulder height, catching in front rack. Lower.", muscleGroup: "Full Body", requiredEquipment: ["sandbag"], images: exImg("Clean"), duration: 35 },
  { id: "sb-carry", name: "Sandbag Bear Hug Carry", description: "Hug the sandbag to your chest. Walk forward with short, controlled steps. Engages entire body.", muscleGroup: "Full Body", requiredEquipment: ["sandbag"], images: exImg("Farmers_Walk"), duration: 40 },
  { id: "sb-squat", name: "Sandbag Front Squat", description: "Hold sandbag at chest. Squat deep, keeping chest up. Drive through heels to stand.", muscleGroup: "Legs", requiredEquipment: ["sandbag"], images: exImg("Barbell_Squat"), duration: 40 },

  // Sledgehammer & Tire
  { id: "st-slam", name: "Tire Sledgehammer Slam", description: "Swing sledgehammer overhead and slam onto tire. Alternate lead hand each rep. Full body explosive power.", muscleGroup: "Full Body", requiredEquipment: ["sledgehammer-tire"], images: exImg("Sledgehammer_Swings"), duration: 30 },
  { id: "st-flip", name: "Tire Flip", description: "Squat low, grip tire bottom. Drive through legs and flip it over. Walk to other side and repeat.", muscleGroup: "Full Body", requiredEquipment: ["sledgehammer-tire"], images: exImg("Tire_Flip"), duration: 35 },

  // Agility Ladder
  { id: "al-run", name: "Agility Ladder Sprint", description: "Run through the ladder placing one foot in each rung as fast as possible. Stay on balls of feet.", muscleGroup: "Cardio", requiredEquipment: ["agility-ladder"], images: exImg("Fast_Skipping"), duration: 30 },
  { id: "al-lateral", name: "Agility Ladder Lateral Shuffle", description: "Side-step through the ladder, two feet in each rung. Stay low in an athletic stance.", muscleGroup: "Cardio", requiredEquipment: ["agility-ladder"], images: exImg("Fast_Skipping"), duration: 30 },
  { id: "al-icky", name: "Agility Ladder Icky Shuffle", description: "In-in-out pattern through the ladder. Quick feet, staying light and balanced. Great for coordination.", muscleGroup: "Cardio", requiredEquipment: ["agility-ladder"], images: exImg("Fast_Skipping"), duration: 30 },

  // BOSU Ball
  { id: "bosu-squat", name: "BOSU Ball Squat", description: "Stand on flat side of BOSU. Perform squats while balancing. Engages stabilizers throughout.", muscleGroup: "Legs", requiredEquipment: ["bosu-ball"], images: exImg("Bodyweight_Squat"), duration: 40 },
  { id: "bosu-pushup", name: "BOSU Ball Push-Up", description: "Place hands on sides of BOSU (dome down). Perform push-ups on the unstable surface.", muscleGroup: "Chest", requiredEquipment: ["bosu-ball"], images: exImg("Pushups"), duration: 40 },
  { id: "bosu-plank", name: "BOSU Ball Plank", description: "Forearms on BOSU dome. Hold plank position, fighting the instability. Great core challenge.", muscleGroup: "Core", requiredEquipment: ["bosu-ball"], images: exImg("Plank"), duration: 40 },
  { id: "bosu-lunge", name: "BOSU Ball Lunge", description: "Place front foot on BOSU dome. Perform lunges, balancing on the unstable surface. Switch legs.", muscleGroup: "Legs", requiredEquipment: ["bosu-ball"], images: exImg("Bodyweight_Walking_Lunge"), duration: 40 },

  // Air Bike
  { id: "airbike-sprint", name: "Air Bike Sprint", description: "Pedal and push/pull handles as hard as possible. The harder you go, the more resistance. Full body cardio.", muscleGroup: "Cardio", requiredEquipment: ["air-bike"], images: exImg("Air_Bike"), duration: 30 },
  { id: "airbike-intervals", name: "Air Bike Intervals", description: "Alternate 10 seconds all-out effort with 10 seconds easy. The fan provides unlimited resistance.", muscleGroup: "Cardio", requiredEquipment: ["air-bike"], images: exImg("Air_Bike"), duration: 40 },
];

const EASY_EXERCISE_IDS = new Set<string>([
  "squats",
  "lunges",
  "plank",
  "glute-bridge",
  "superman",
  "tricep-dips-floor",
  "db-bicep-curl",
  "db-shoulder-press",
  "db-goblet-squat",
  "db-lunges",
  "db-bent-row",
  "db-lateral-raise",
  "db-hammer-curl",
  "ez-curl",
  "cable-fly",
  "cable-row",
  "cable-tricep",
  "cable-bicep",
  "leg-press-ex",
  "lat-pulldown-ex",
  "chest-press-ex",
  "leg-ext-ex",
  "leg-curl-ex",
  "pec-deck-ex",
  "machine-shoulder",
  "smith-squat",
  "band-pull-apart",
  "band-squat",
  "band-curl",
  "trx-row",
  "trx-squat",
  "stability-crunch",
  "stability-hamstring",
  "step-ups",
  "bench-dips",
  "incline-pushup",
  "box-step-ups",
  "ym-cobra",
  "ym-bird-dog",
  "ym-dead-bug",
  "aw-donkey-kick",
  "aw-side-leg",
  "ww-arm-circles",
  "da-face-pull",
  "da-chest-press",
  "da-lat-pull",
  "adj-curl",
  "adj-press",
  "adj-row",
  "adj-lateral",
  "adj-squat",
  "adj-lunge",
  "adj-fly",
  "adj-tricep",
  "yb-crunch",
  "yb-hamstring-curl",
  "yb-wall-squat",
  "yb-back-ext",
  "yb-plank",
]);

const HARD_EXERCISE_IDS = new Set<string>([
  "burpees",
  "db-renegade-row",
  "bb-squat",
  "bb-deadlift",
  "bb-bench-press",
  "bb-overhead-press",
  "bb-bent-row",
  "kb-swing",
  "kb-turkish-getup",
  "kb-clean-press",
  "pullups",
  "chin-ups",
  "hanging-leg-raise",
  "dips",
  "ring-pushups",
  "ring-dips",
  "trx-pushup",
  "trx-pike",
  "ab-rollout",
  "med-ball-slam",
  "box-jumps",
  "battle-waves",
  "battle-slams",
  "parallette-l-sit",
  "jump-rope-double",
  "treadmill-sprint",
  "bike-intervals",
  "rowing-intervals",
  "elliptical-intervals",
  "stair-climber-intervals",
  "pt-pullups",
  "pt-dips",
  "pt-knee-raise",
  "pt-leg-raise",
  "pt-chin-ups",
  "cc-knee-raise",
  "cc-leg-raise",
  "cc-oblique-raise",
  "rph-tblock",
  "lm-rotation",
  "htb-deadlift",
  "htb-carry",
  "db-weighted-dip",
  "db-weighted-pullup",
  "sb-clean",
  "sb-carry",
  "st-slam",
  "st-flip",
  "bosu-pushup",
  "bosu-plank",
  "bosu-lunge",
  "airbike-sprint",
  "airbike-intervals",
]);

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};

function classifyDifficulty(exerciseId: string): Difficulty {
  if (HARD_EXERCISE_IDS.has(exerciseId)) return "hard";
  if (EASY_EXERCISE_IDS.has(exerciseId)) return "easy";
  return "medium";
}

function canUseExerciseForDifficulty(exerciseDifficulty: Difficulty, selectedDifficulty: Difficulty): boolean {
  return DIFFICULTY_ORDER[exerciseDifficulty] <= DIFFICULTY_ORDER[selectedDifficulty];
}

export const allExercises: Exercise[] = [...bodyweightExercises, ...equipmentExercises].map((exercise) => ({
  ...exercise,
  difficulty: classifyDifficulty(exercise.id),
}));

export function getExercisesByIds(exerciseIds: string[]): Exercise[] {
  const byId = new Map(allExercises.map((exercise) => [exercise.id, exercise]));
  return exerciseIds
    .map((id) => byId.get(id))
    .filter((exercise): exercise is Exercise => Boolean(exercise));
}

export function getAvailableExercises(selectedEquipment: EquipmentId[], difficulty: Difficulty = "hard"): Exercise[] {
  return allExercises.filter((exercise) => {
    if (!canUseExerciseForDifficulty(exercise.difficulty, difficulty)) return false;
    if (exercise.requiredEquipment.length === 0) return true;
    return exercise.requiredEquipment.every((eq) => selectedEquipment.includes(eq));
  });
}

export function buildWorkout(
  selectedEquipment: EquipmentId[],
  exerciseCount: number = 8,
  difficulty: Difficulty = "hard"
): Exercise[] {
  const available = getAvailableExercises(selectedEquipment, difficulty);

  // Try to get variety across muscle groups
  const muscleGroups = [...new Set(available.map((e) => e.muscleGroup))];
  const workout: Exercise[] = [];
  const used = new Set<string>();

  // Round-robin through muscle groups
  let groupIndex = 0;
  while (workout.length < exerciseCount && workout.length < available.length) {
    const group = muscleGroups[groupIndex % muscleGroups.length];
    const candidates = available.filter((e) => e.muscleGroup === group && !used.has(e.id));
    if (candidates.length > 0) {
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      workout.push(pick);
      used.add(pick.id);
    }
    groupIndex++;
    if (groupIndex > muscleGroups.length * exerciseCount) break;
  }

  return workout;
}
