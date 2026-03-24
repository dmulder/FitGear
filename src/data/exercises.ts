import pushupImg from "@/assets/exercises/pushup.jpg";
import squatImg from "@/assets/exercises/squat.jpg";
import curlImg from "@/assets/exercises/curl.jpg";
import plankImg from "@/assets/exercises/plank.jpg";
import lungeImg from "@/assets/exercises/lunge.jpg";
import shoulderPressImg from "@/assets/exercises/shoulder-press.jpg";
import deadliftImg from "@/assets/exercises/deadlift.jpg";
import pullupImg from "@/assets/exercises/pullup.jpg";
import rowImg from "@/assets/exercises/row.jpg";
import kettlebellSwingImg from "@/assets/exercises/kettlebell-swing.jpg";
import benchPressImg from "@/assets/exercises/bench-press.jpg";
import jumpRopeImg from "@/assets/exercises/jump-rope.jpg";

export type EquipmentId =
  | "dumbbells"
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
  | "dip-station"
  | "gymnastic-rings"
  | "resistance-bands"
  | "trx-suspension"
  | "ab-wheel"
  | "medicine-ball"
  | "stability-ball"
  | "bench"
  | "squat-rack"
  | "plyo-box"
  | "battle-ropes"
  | "parallettes"
  | "jump-rope"
  | "foam-roller"
  | "treadmill"
  | "stationary-bike"
  | "rowing-machine"
  | "elliptical"
  | "stair-climber";

export interface EquipmentItem {
  id: EquipmentId;
  name: string;
  category: string;
}

export const equipmentList: EquipmentItem[] = [
  // Free Weights
  { id: "dumbbells", name: "Dumbbells", category: "Free Weights" },
  { id: "barbell", name: "Barbell", category: "Free Weights" },
  { id: "ez-curl-bar", name: "EZ Curl Bar", category: "Free Weights" },
  { id: "kettlebells", name: "Kettlebells", category: "Free Weights" },
  { id: "weight-plates", name: "Weight Plates", category: "Free Weights" },

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
  { id: "dip-station", name: "Dip Station", category: "Bodyweight Stations" },
  { id: "gymnastic-rings", name: "Gymnastic Rings", category: "Bodyweight Stations" },
  { id: "parallettes", name: "Parallettes", category: "Bodyweight Stations" },

  // Accessories
  { id: "resistance-bands", name: "Resistance Bands", category: "Accessories" },
  { id: "trx-suspension", name: "TRX / Suspension Trainer", category: "Accessories" },
  { id: "ab-wheel", name: "Ab Wheel", category: "Accessories" },
  { id: "medicine-ball", name: "Medicine Ball", category: "Accessories" },
  { id: "stability-ball", name: "Stability Ball", category: "Accessories" },
  { id: "jump-rope", name: "Jump Rope", category: "Accessories" },
  { id: "foam-roller", name: "Foam Roller", category: "Accessories" },
  { id: "battle-ropes", name: "Battle Ropes", category: "Accessories" },

  // Benches & Racks
  { id: "bench", name: "Bench (Flat/Incline)", category: "Benches & Racks" },
  { id: "squat-rack", name: "Squat Rack / Power Rack", category: "Benches & Racks" },
  { id: "plyo-box", name: "Plyo Box", category: "Benches & Racks" },

  // Cardio Machines
  { id: "treadmill", name: "Treadmill", category: "Cardio Machines" },
  { id: "stationary-bike", name: "Stationary Bike", category: "Cardio Machines" },
  { id: "rowing-machine", name: "Rowing Machine", category: "Cardio Machines" },
  { id: "elliptical", name: "Elliptical", category: "Cardio Machines" },
  { id: "stair-climber", name: "Stair Climber", category: "Cardio Machines" },
];

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  requiredEquipment: EquipmentId[];
  image: string;
  duration: number; // seconds
}

// Bodyweight exercises (no equipment needed)
const bodyweightExercises: Exercise[] = [
  { id: "pushups", name: "Push-Ups", description: "Start in a high plank. Lower your chest to the floor, then push back up. Keep your core tight and body straight.", muscleGroup: "Chest", requiredEquipment: [], image: pushupImg, duration: 40 },
  { id: "squats", name: "Bodyweight Squats", description: "Stand with feet shoulder-width apart. Bend knees and lower hips as if sitting in a chair. Drive through heels to stand.", muscleGroup: "Legs", requiredEquipment: [], image: squatImg, duration: 40 },
  { id: "lunges", name: "Walking Lunges", description: "Step forward with one leg, lowering your hips until both knees are bent at 90°. Push off your front foot and step the back leg forward.", muscleGroup: "Legs", requiredEquipment: [], image: lungeImg, duration: 40 },
  { id: "plank", name: "Plank Hold", description: "Hold a straight-arm or forearm plank position. Keep your body in a straight line from head to heels. Engage your core throughout.", muscleGroup: "Core", requiredEquipment: [], image: plankImg, duration: 40 },
  { id: "mountain-climbers", name: "Mountain Climbers", description: "Start in a high plank. Drive your knees alternately toward your chest in a running motion. Keep your hips level.", muscleGroup: "Core", requiredEquipment: [], image: plankImg, duration: 30 },
  { id: "burpees", name: "Burpees", description: "From standing, drop into a squat, kick feet back into plank, do a push-up, jump feet forward, then jump up with arms overhead.", muscleGroup: "Full Body", requiredEquipment: [], image: pushupImg, duration: 30 },
  { id: "high-knees", name: "High Knees", description: "Run in place, driving your knees up to hip height as fast as possible. Pump your arms for momentum.", muscleGroup: "Cardio", requiredEquipment: [], image: lungeImg, duration: 30 },
  { id: "glute-bridge", name: "Glute Bridge", description: "Lie on your back with knees bent. Drive through your heels to lift your hips until your body forms a straight line from shoulders to knees.", muscleGroup: "Glutes", requiredEquipment: [], image: squatImg, duration: 40 },
  { id: "superman", name: "Superman Hold", description: "Lie face down. Simultaneously lift your arms, chest, and legs off the floor. Hold briefly and lower back down.", muscleGroup: "Back", requiredEquipment: [], image: plankImg, duration: 30 },
  { id: "tricep-dips-floor", name: "Floor Tricep Dips", description: "Sit on the floor with hands behind you, fingers forward. Lift hips and bend elbows to lower, then press back up.", muscleGroup: "Arms", requiredEquipment: [], image: pushupImg, duration: 40 },
];

const equipmentExercises: Exercise[] = [
  // Dumbbell exercises
  { id: "db-bicep-curl", name: "Dumbbell Bicep Curls", description: "Stand with dumbbells at your sides, palms forward. Curl the weights up to shoulder height, squeezing biceps. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["dumbbells"], image: curlImg, duration: 40 },
  { id: "db-shoulder-press", name: "Dumbbell Shoulder Press", description: "Sit or stand with dumbbells at shoulder height. Press weights overhead until arms are straight. Lower back to shoulders.", muscleGroup: "Shoulders", requiredEquipment: ["dumbbells"], image: shoulderPressImg, duration: 40 },
  { id: "db-goblet-squat", name: "Goblet Squat", description: "Hold one dumbbell at your chest with both hands. Squat down, keeping elbows inside your knees. Stand back up.", muscleGroup: "Legs", requiredEquipment: ["dumbbells"], image: squatImg, duration: 40 },
  { id: "db-lunges", name: "Dumbbell Lunges", description: "Hold dumbbells at your sides. Step forward into a lunge, lowering until both knees are at 90°. Push back to start.", muscleGroup: "Legs", requiredEquipment: ["dumbbells"], image: lungeImg, duration: 40 },
  { id: "db-bent-row", name: "Dumbbell Bent-Over Row", description: "Hinge at hips with dumbbells hanging. Pull weights to your ribcage, squeezing shoulder blades. Lower with control.", muscleGroup: "Back", requiredEquipment: ["dumbbells"], image: rowImg, duration: 40 },
  { id: "db-lateral-raise", name: "Lateral Raises", description: "Stand with dumbbells at sides. Raise arms out to the sides until parallel to the floor. Lower slowly.", muscleGroup: "Shoulders", requiredEquipment: ["dumbbells"], image: shoulderPressImg, duration: 40 },
  { id: "db-tricep-ext", name: "Overhead Tricep Extension", description: "Hold one dumbbell overhead with both hands. Lower it behind your head by bending elbows. Extend back up.", muscleGroup: "Arms", requiredEquipment: ["dumbbells"], image: curlImg, duration: 40 },
  { id: "db-chest-fly", name: "Dumbbell Chest Fly", description: "Lie on a bench with dumbbells above chest. Open arms wide, lowering weights in an arc. Squeeze chest to return.", muscleGroup: "Chest", requiredEquipment: ["dumbbells", "bench"], image: benchPressImg, duration: 40 },
  { id: "db-bench-press", name: "Dumbbell Bench Press", description: "Lie on bench with dumbbells at chest level. Press weights up until arms are straight. Lower with control.", muscleGroup: "Chest", requiredEquipment: ["dumbbells", "bench"], image: benchPressImg, duration: 40 },
  { id: "db-hammer-curl", name: "Hammer Curls", description: "Hold dumbbells with palms facing each other. Curl weights to shoulders without rotating wrists. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["dumbbells"], image: curlImg, duration: 40 },
  { id: "db-renegade-row", name: "Renegade Row", description: "Start in push-up position with hands on dumbbells. Row one dumbbell to hip, then the other. Keep hips square.", muscleGroup: "Back", requiredEquipment: ["dumbbells"], image: rowImg, duration: 40 },

  // Barbell exercises
  { id: "bb-squat", name: "Barbell Back Squat", description: "Bar on upper back, feet shoulder-width. Squat until thighs are parallel to floor. Drive through heels to stand.", muscleGroup: "Legs", requiredEquipment: ["barbell", "squat-rack"], image: deadliftImg, duration: 45 },
  { id: "bb-deadlift", name: "Barbell Deadlift", description: "Stand over the bar, hip-width stance. Hinge at hips, grip bar. Drive through floor to stand tall. Lower with control.", muscleGroup: "Back", requiredEquipment: ["barbell"], image: deadliftImg, duration: 45 },
  { id: "bb-bench-press", name: "Barbell Bench Press", description: "Lie on bench, grip bar slightly wider than shoulders. Lower bar to chest, then press up. Keep feet flat on floor.", muscleGroup: "Chest", requiredEquipment: ["barbell", "bench"], image: benchPressImg, duration: 45 },
  { id: "bb-overhead-press", name: "Barbell Overhead Press", description: "Stand with bar at shoulders. Press bar overhead until arms lock out. Lower back to shoulders with control.", muscleGroup: "Shoulders", requiredEquipment: ["barbell"], image: shoulderPressImg, duration: 45 },
  { id: "bb-bent-row", name: "Barbell Bent-Over Row", description: "Hinge forward, grip bar overhand. Pull bar to lower chest, squeezing back muscles. Lower with control.", muscleGroup: "Back", requiredEquipment: ["barbell"], image: rowImg, duration: 45 },
  { id: "bb-curl", name: "Barbell Curl", description: "Stand with bar at hip height, underhand grip. Curl bar to shoulders without swinging. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["barbell"], image: curlImg, duration: 40 },

  // EZ Curl Bar
  { id: "ez-curl", name: "EZ Bar Curl", description: "Grip the EZ bar at the angled portions. Curl up to shoulders, keeping elbows pinned to your sides. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["ez-curl-bar"], image: curlImg, duration: 40 },
  { id: "ez-skull-crusher", name: "Skull Crushers", description: "Lie on bench with EZ bar above chest. Lower bar toward forehead by bending elbows. Extend back up.", muscleGroup: "Arms", requiredEquipment: ["ez-curl-bar", "bench"], image: benchPressImg, duration: 40 },

  // Kettlebell exercises
  { id: "kb-swing", name: "Kettlebell Swing", description: "Hinge at hips with kettlebell between legs. Snap hips forward to swing the bell to chest height. Control the descent.", muscleGroup: "Full Body", requiredEquipment: ["kettlebells"], image: kettlebellSwingImg, duration: 35 },
  { id: "kb-goblet-squat", name: "Kettlebell Goblet Squat", description: "Hold kettlebell at chest. Squat deep with elbows inside knees. Stand back up through heels.", muscleGroup: "Legs", requiredEquipment: ["kettlebells"], image: squatImg, duration: 40 },
  { id: "kb-turkish-getup", name: "Turkish Get-Up", description: "Lie down holding kettlebell overhead. Slowly stand up while keeping the weight overhead. Reverse to lie back down.", muscleGroup: "Full Body", requiredEquipment: ["kettlebells"], image: kettlebellSwingImg, duration: 50 },
  { id: "kb-clean-press", name: "Kettlebell Clean & Press", description: "Swing kettlebell to rack position at shoulder, then press overhead. Lower back to rack, then swing down.", muscleGroup: "Shoulders", requiredEquipment: ["kettlebells"], image: shoulderPressImg, duration: 40 },

  // Cable Machine
  { id: "cable-fly", name: "Cable Chest Fly", description: "Set pulleys to chest height. Step forward, arms wide. Bring handles together in front of your chest in a hugging motion.", muscleGroup: "Chest", requiredEquipment: ["cable-machine"], image: benchPressImg, duration: 40 },
  { id: "cable-row", name: "Seated Cable Row", description: "Sit at the cable row station. Pull handle to your torso, squeezing shoulder blades together. Extend arms slowly.", muscleGroup: "Back", requiredEquipment: ["cable-machine"], image: rowImg, duration: 40 },
  { id: "cable-tricep", name: "Cable Tricep Pushdown", description: "Face the cable machine with high pulley. Push the bar or rope down by extending elbows. Return slowly.", muscleGroup: "Arms", requiredEquipment: ["cable-machine"], image: curlImg, duration: 40 },
  { id: "cable-bicep", name: "Cable Bicep Curl", description: "Face the cable machine with low pulley. Curl the handle up to shoulders, keeping elbows fixed. Lower with control.", muscleGroup: "Arms", requiredEquipment: ["cable-machine"], image: curlImg, duration: 40 },
  { id: "cable-woodchop", name: "Cable Woodchop", description: "Set cable high. Pull diagonally across body to opposite hip, rotating torso. Control the return.", muscleGroup: "Core", requiredEquipment: ["cable-machine"], image: kettlebellSwingImg, duration: 40 },

  // Machines
  { id: "leg-press-ex", name: "Leg Press", description: "Sit in the leg press machine. Place feet shoulder-width on platform. Push platform away, then bend knees to lower.", muscleGroup: "Legs", requiredEquipment: ["leg-press"], image: squatImg, duration: 45 },
  { id: "lat-pulldown-ex", name: "Lat Pulldown", description: "Grip the wide bar overhand. Pull it to your upper chest while squeezing shoulder blades. Return slowly overhead.", muscleGroup: "Back", requiredEquipment: ["lat-pulldown"], image: pullupImg, duration: 40 },
  { id: "chest-press-ex", name: "Machine Chest Press", description: "Sit in the chest press machine. Push handles forward until arms extend. Return slowly to start position.", muscleGroup: "Chest", requiredEquipment: ["chest-press-machine"], image: benchPressImg, duration: 40 },
  { id: "leg-ext-ex", name: "Leg Extensions", description: "Sit in the machine with pad on shins. Extend legs until straight, squeezing quads at top. Lower with control.", muscleGroup: "Legs", requiredEquipment: ["leg-extension"], image: squatImg, duration: 40 },
  { id: "leg-curl-ex", name: "Leg Curls", description: "Lie face down on the machine. Curl your heels toward your glutes, squeezing hamstrings. Lower slowly.", muscleGroup: "Legs", requiredEquipment: ["leg-curl"], image: lungeImg, duration: 40 },
  { id: "pec-deck-ex", name: "Pec Deck Fly", description: "Sit with arms on the pads at chest height. Bring pads together in front of your chest. Open arms slowly.", muscleGroup: "Chest", requiredEquipment: ["pec-deck"], image: benchPressImg, duration: 40 },
  { id: "machine-shoulder", name: "Machine Shoulder Press", description: "Sit in the shoulder press machine. Press handles overhead until arms are straight. Lower to shoulder height.", muscleGroup: "Shoulders", requiredEquipment: ["shoulder-press-machine"], image: shoulderPressImg, duration: 40 },
  { id: "smith-squat", name: "Smith Machine Squat", description: "Stand under the smith machine bar. Unrack and squat, keeping feet slightly forward. Press back up.", muscleGroup: "Legs", requiredEquipment: ["smith-machine"], image: deadliftImg, duration: 45 },

  // Pull-Up Bar
  { id: "pullups", name: "Pull-Ups", description: "Hang from bar with overhand grip. Pull your chin above the bar by driving elbows down. Lower with control.", muscleGroup: "Back", requiredEquipment: ["pull-up-bar"], image: pullupImg, duration: 40 },
  { id: "chin-ups", name: "Chin-Ups", description: "Hang with underhand grip, shoulder-width. Pull chin above bar, focusing on biceps. Lower slowly.", muscleGroup: "Arms", requiredEquipment: ["pull-up-bar"], image: pullupImg, duration: 40 },
  { id: "hanging-leg-raise", name: "Hanging Leg Raise", description: "Hang from bar with straight arms. Raise legs to parallel or higher. Lower with control—don't swing.", muscleGroup: "Core", requiredEquipment: ["pull-up-bar"], image: pullupImg, duration: 35 },

  // Dip Station
  { id: "dips", name: "Parallel Bar Dips", description: "Support yourself on dip bars with straight arms. Lower by bending elbows until upper arms are parallel. Push back up.", muscleGroup: "Chest", requiredEquipment: ["dip-station"], image: pushupImg, duration: 40 },

  // Gymnastic Rings
  { id: "ring-rows", name: "Ring Rows", description: "Hang below the rings with body straight. Pull chest up to the rings, squeezing back. Lower with control.", muscleGroup: "Back", requiredEquipment: ["gymnastic-rings"], image: rowImg, duration: 40 },
  { id: "ring-pushups", name: "Ring Push-Ups", description: "Support yourself on rings in push-up position. Lower chest to ring level. Push back up, stabilizing throughout.", muscleGroup: "Chest", requiredEquipment: ["gymnastic-rings"], image: pushupImg, duration: 40 },
  { id: "ring-dips", name: "Ring Dips", description: "Support on rings with arms straight. Lower by bending elbows. Press back up while stabilizing the rings.", muscleGroup: "Chest", requiredEquipment: ["gymnastic-rings"], image: pushupImg, duration: 40 },

  // Resistance Bands
  { id: "band-pull-apart", name: "Band Pull-Apart", description: "Hold band in front at shoulder height. Pull hands apart, stretching the band across your chest. Return slowly.", muscleGroup: "Back", requiredEquipment: ["resistance-bands"], image: rowImg, duration: 40 },
  { id: "band-squat", name: "Banded Squat", description: "Stand on band, holding handles at shoulders. Squat down against the band tension. Stand back up.", muscleGroup: "Legs", requiredEquipment: ["resistance-bands"], image: squatImg, duration: 40 },
  { id: "band-curl", name: "Band Bicep Curl", description: "Stand on band, grip handles. Curl hands to shoulders against band resistance. Lower with control.", muscleGroup: "Arms", requiredEquipment: ["resistance-bands"], image: curlImg, duration: 40 },
  { id: "band-lateral-walk", name: "Banded Lateral Walk", description: "Place band around ankles or knees. Get into a half-squat and step sideways, maintaining tension. Repeat.", muscleGroup: "Glutes", requiredEquipment: ["resistance-bands"], image: lungeImg, duration: 40 },

  // TRX / Suspension
  { id: "trx-row", name: "TRX Row", description: "Lean back holding TRX handles, body straight. Pull chest toward handles, squeezing back. Lower with control.", muscleGroup: "Back", requiredEquipment: ["trx-suspension"], image: rowImg, duration: 40 },
  { id: "trx-pushup", name: "TRX Push-Up", description: "Place feet in TRX straps, hands on floor. Perform push-ups with feet suspended. Keep core tight.", muscleGroup: "Chest", requiredEquipment: ["trx-suspension"], image: pushupImg, duration: 40 },
  { id: "trx-squat", name: "TRX Squat", description: "Hold TRX handles, lean back slightly. Squat deep while using straps for balance. Stand back up.", muscleGroup: "Legs", requiredEquipment: ["trx-suspension"], image: squatImg, duration: 40 },
  { id: "trx-pike", name: "TRX Pike", description: "Feet in straps, plank position. Pike hips up toward ceiling while keeping legs straight. Return to plank.", muscleGroup: "Core", requiredEquipment: ["trx-suspension"], image: plankImg, duration: 35 },

  // Ab Wheel
  { id: "ab-rollout", name: "Ab Wheel Rollout", description: "Kneel with hands on ab wheel. Roll forward extending your body. Use core to pull back to start. Keep back flat.", muscleGroup: "Core", requiredEquipment: ["ab-wheel"], image: plankImg, duration: 35 },

  // Medicine Ball
  { id: "med-ball-slam", name: "Medicine Ball Slam", description: "Lift medicine ball overhead. Slam it to the ground as hard as possible. Squat to pick it up and repeat.", muscleGroup: "Full Body", requiredEquipment: ["medicine-ball"], image: kettlebellSwingImg, duration: 30 },
  { id: "med-ball-twist", name: "Russian Twist w/ Med Ball", description: "Sit with knees bent, feet off floor, holding ball. Rotate torso side to side, tapping ball on each side.", muscleGroup: "Core", requiredEquipment: ["medicine-ball"], image: plankImg, duration: 40 },
  { id: "med-ball-wall-throw", name: "Wall Ball Throws", description: "Hold ball at chest, stand facing wall. Squat, then explode up, throwing ball to a target on the wall. Catch and repeat.", muscleGroup: "Full Body", requiredEquipment: ["medicine-ball"], image: squatImg, duration: 35 },

  // Stability Ball
  { id: "stability-crunch", name: "Stability Ball Crunch", description: "Lie back on stability ball with feet on floor. Crunch upward, squeezing abs. Lower back over the ball.", muscleGroup: "Core", requiredEquipment: ["stability-ball"], image: plankImg, duration: 40 },
  { id: "stability-hamstring", name: "Stability Ball Hamstring Curl", description: "Lie on back, heels on ball. Lift hips, then curl the ball toward your glutes. Extend legs and repeat.", muscleGroup: "Legs", requiredEquipment: ["stability-ball"], image: squatImg, duration: 40 },

  // Bench
  { id: "step-ups", name: "Bench Step-Ups", description: "Step up onto bench with one foot. Drive through heel to stand on bench. Step down and switch legs.", muscleGroup: "Legs", requiredEquipment: ["bench"], image: lungeImg, duration: 40 },
  { id: "bench-dips", name: "Bench Tricep Dips", description: "Hands on bench edge, legs extended. Lower your body by bending elbows. Push back up to straight arms.", muscleGroup: "Arms", requiredEquipment: ["bench"], image: pushupImg, duration: 40 },
  { id: "incline-pushup", name: "Incline Push-Ups", description: "Place hands on bench, body at an angle. Perform push-ups. Easier than floor push-ups, great for beginners.", muscleGroup: "Chest", requiredEquipment: ["bench"], image: pushupImg, duration: 40 },

  // Plyo Box
  { id: "box-jumps", name: "Box Jumps", description: "Stand facing the box. Bend knees and jump onto the box, landing softly. Step back down and repeat.", muscleGroup: "Legs", requiredEquipment: ["plyo-box"], image: squatImg, duration: 30 },
  { id: "box-step-ups", name: "Box Step-Ups", description: "Step onto the plyo box one foot at a time. Stand tall at the top, then step back down. Alternate legs.", muscleGroup: "Legs", requiredEquipment: ["plyo-box"], image: lungeImg, duration: 40 },

  // Battle Ropes
  { id: "battle-waves", name: "Battle Rope Waves", description: "Hold rope ends, feet shoulder-width. Alternately whip arms up and down to create waves in the rope. Keep core tight.", muscleGroup: "Full Body", requiredEquipment: ["battle-ropes"], image: kettlebellSwingImg, duration: 30 },
  { id: "battle-slams", name: "Battle Rope Slams", description: "Lift both rope ends overhead. Slam them down together forcefully. Repeat with explosive power.", muscleGroup: "Full Body", requiredEquipment: ["battle-ropes"], image: kettlebellSwingImg, duration: 30 },

  // Parallettes
  { id: "parallette-pushup", name: "Parallette Push-Ups", description: "Grip parallettes in push-up position. Lower chest below hand level for deeper range. Push back up.", muscleGroup: "Chest", requiredEquipment: ["parallettes"], image: pushupImg, duration: 40 },
  { id: "parallette-l-sit", name: "L-Sit Hold", description: "Sit between parallettes, hands on bars. Press up, lifting your body with legs extended forward. Hold.", muscleGroup: "Core", requiredEquipment: ["parallettes"], image: plankImg, duration: 30 },

  // Jump Rope
  { id: "jump-rope-basic", name: "Jump Rope", description: "Swing rope overhead and jump with both feet together. Stay on balls of feet. Keep jumps small and wrists active.", muscleGroup: "Cardio", requiredEquipment: ["jump-rope"], image: jumpRopeImg, duration: 45 },
  { id: "jump-rope-double", name: "Double Unders", description: "Swing rope fast enough to pass under feet twice per jump. Jump higher than normal. Requires practice!", muscleGroup: "Cardio", requiredEquipment: ["jump-rope"], image: jumpRopeImg, duration: 30 },

  // Cardio Machines
  { id: "treadmill-sprint", name: "Treadmill Sprint", description: "Set the treadmill to a challenging pace. Sprint at high intensity for the duration. Use the rails for safety.", muscleGroup: "Cardio", requiredEquipment: ["treadmill"], image: lungeImg, duration: 30 },
  { id: "bike-intervals", name: "Bike Sprint Intervals", description: "Pedal at maximum effort with high resistance. Go all-out for the interval duration. Great for leg endurance.", muscleGroup: "Cardio", requiredEquipment: ["stationary-bike"], image: lungeImg, duration: 30 },
  { id: "rowing-intervals", name: "Rowing Intervals", description: "Row at maximum effort. Drive with legs first, then pull with arms. Keep strokes powerful and rhythmic.", muscleGroup: "Full Body", requiredEquipment: ["rowing-machine"], image: rowImg, duration: 40 },
  { id: "elliptical-intervals", name: "Elliptical Sprint", description: "Set resistance high and move at maximum pace. Push and pull with both arms and legs. Full body cardio.", muscleGroup: "Cardio", requiredEquipment: ["elliptical"], image: lungeImg, duration: 30 },
  { id: "stair-climber-intervals", name: "Stair Climber Sprint", description: "Climb at high intensity without holding the rails. Drive through each step. Great for glutes and quads.", muscleGroup: "Cardio", requiredEquipment: ["stair-climber"], image: lungeImg, duration: 30 },
];

export const allExercises: Exercise[] = [...bodyweightExercises, ...equipmentExercises];

export function getAvailableExercises(selectedEquipment: EquipmentId[]): Exercise[] {
  return allExercises.filter((exercise) => {
    if (exercise.requiredEquipment.length === 0) return true;
    return exercise.requiredEquipment.every((eq) => selectedEquipment.includes(eq));
  });
}

export function buildWorkout(selectedEquipment: EquipmentId[], exerciseCount: number = 8): Exercise[] {
  const available = getAvailableExercises(selectedEquipment);

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
    // Safety: if we've cycled through all groups without adding, break
    if (groupIndex > muscleGroups.length * exerciseCount) break;
  }

  return workout;
}
