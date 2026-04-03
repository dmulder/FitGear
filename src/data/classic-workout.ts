import type { Exercise, EquipmentId } from "./exercises";
import type { SavedWorkout } from "@/lib/equipment-settings-db";

/**
 * Custom exercise definitions for the "Classic Workout" (7-minute workout)
 * that don't exist in the free-exercise-db.
 */
const classicOnlyExercises: Exercise[] = [
  {
    id: "classic_jumping_jacks",
    name: "Jumping Jacks",
    description: "A full-body cardio exercise. Jump while spreading your legs and raising your arms overhead, then return to standing.",
    instructions: [
      "Stand upright with your feet together and arms at your sides.",
      "Jump and spread your feet wide while raising your arms overhead.",
      "Jump again to return to the starting position with feet together and arms at your sides.",
      "Repeat at a brisk pace for the duration of the exercise.",
    ],
    muscleGroup: "Full Body",
    category: "cardio",
    requiredEquipment: [],
    images: [],
    duration: 30,
    difficulty: "easy",
  },
  {
    id: "classic_wall_sit",
    name: "Wall Sit",
    description: "An isometric lower-body exercise. Slide your back down a wall until your thighs are parallel to the ground and hold.",
    instructions: [
      "Stand with your back flat against a wall.",
      "Slide down the wall until your thighs are parallel to the floor, with knees bent at 90 degrees.",
      "Keep your back pressed against the wall and hold this position.",
      "Hold for the prescribed duration, breathing steadily.",
    ],
    muscleGroup: "Quadriceps",
    category: "strength",
    requiredEquipment: [],
    images: [],
    duration: 30,
    difficulty: "easy",
  },
  {
    id: "classic_step_up_onto_chair",
    name: "Step-Up onto Chair",
    description: "Step up onto a sturdy chair or bench, alternating legs to work your lower body.",
    instructions: [
      "Stand facing a sturdy chair or bench.",
      "Step up onto the chair with your right foot, pressing through your heel to lift your body up.",
      "Bring your left foot up to stand on the chair.",
      "Step down with your right foot, then your left.",
      "Alternate the leading leg with each repetition.",
    ],
    muscleGroup: "Quadriceps",
    category: "strength",
    requiredEquipment: [],
    images: [],
    duration: 30,
    difficulty: "easy",
  },
  {
    id: "classic_high_knees",
    name: "High Knees",
    description: "A cardio exercise where you jog in place, driving your knees as high as possible with each step.",
    instructions: [
      "Stand with your feet hip-width apart.",
      "Drive your right knee up toward your chest as high as possible.",
      "Quickly switch legs, driving the left knee up.",
      "Continue alternating at a fast pace, pumping your arms as you go.",
    ],
    muscleGroup: "Full Body",
    category: "cardio",
    requiredEquipment: [],
    images: [],
    duration: 30,
    difficulty: "easy",
  },
  {
    id: "classic_lunges",
    name: "Lunges",
    description: "A lower-body exercise. Step forward into a lunge position, lowering your hips until both knees are bent at 90 degrees.",
    instructions: [
      "Stand tall with feet hip-width apart.",
      "Take a large step forward with your right leg.",
      "Lower your hips until both knees are bent at about 90 degrees.",
      "Push back up to the starting position and repeat with the left leg.",
      "Continue alternating legs.",
    ],
    muscleGroup: "Quadriceps",
    category: "strength",
    requiredEquipment: [],
    images: [],
    duration: 30,
    difficulty: "easy",
  },
  {
    id: "classic_side_plank_right",
    name: "Side Plank (Right)",
    description: "An isometric core exercise. Support your body on your right forearm and the side of your right foot, keeping your body in a straight line.",
    instructions: [
      "Lie on your right side with your legs straight.",
      "Prop yourself up on your right forearm, elbow directly under your shoulder.",
      "Raise your hips off the ground so your body forms a straight line from head to feet.",
      "Hold this position for the prescribed duration.",
    ],
    muscleGroup: "Abdominals",
    category: "strength",
    requiredEquipment: [],
    images: [],
    duration: 30,
    difficulty: "easy",
  },
  {
    id: "classic_side_plank_left",
    name: "Side Plank (Left)",
    description: "An isometric core exercise. Support your body on your left forearm and the side of your left foot, keeping your body in a straight line.",
    instructions: [
      "Lie on your left side with your legs straight.",
      "Prop yourself up on your left forearm, elbow directly under your shoulder.",
      "Raise your hips off the ground so your body forms a straight line from head to feet.",
      "Hold this position for the prescribed duration.",
    ],
    muscleGroup: "Abdominals",
    category: "strength",
    requiredEquipment: [],
    images: [],
    duration: 30,
    difficulty: "easy",
  },
];

/** IDs of custom classic exercises (to merge into allExercises). */
export const classicExercises: Exercise[] = classicOnlyExercises;

/**
 * The exercise IDs for the Classic Workout, in order.
 * Uses free-exercise-db IDs where available, custom IDs otherwise.
 */
export const CLASSIC_WORKOUT_EXERCISE_IDS: string[] = [
  "classic_jumping_jacks",
  "classic_wall_sit",
  "Pushups",
  "Crunches",
  "classic_step_up_onto_chair",
  "Bodyweight_Squat",
  "Bench_Dips",
  "Plank",
  "classic_high_knees",
  "classic_lunges",
  "Push_Up_to_Side_Plank",
  "classic_side_plank_right",
  "classic_side_plank_left",
];

export const CLASSIC_WORKOUT_ID = "preset_classic_workout";

export const CLASSIC_WORKOUT: SavedWorkout = {
  id: CLASSIC_WORKOUT_ID,
  name: "Classic Workout",
  createdAt: "2024-01-01T00:00:00.000Z",
  difficulty: "easy",
  workoutMode: "all",
  workoutFocus: "full-body",
  exerciseCount: CLASSIC_WORKOUT_EXERCISE_IDS.length,
  restSeconds: 10,
  selectedEquipment: [] as EquipmentId[],
  exerciseIds: CLASSIC_WORKOUT_EXERCISE_IDS,
};
