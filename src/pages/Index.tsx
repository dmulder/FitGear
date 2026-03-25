import { useState, useCallback, useEffect } from "react";
import { EquipmentSelector } from "@/components/EquipmentSelector";
import { WorkoutTimer } from "@/components/WorkoutTimer";
import {
  buildWorkout,
  getAvailableExercisesForMode,
  getExercisesByIds,
  type Difficulty,
  type EquipmentId,
  type Exercise,
  type WorkoutMode,
} from "@/data/exercises";
import {
  loadSelectedEquipment,
  loadSavedWorkouts,
  loadWorkoutDifficulty,
  loadWorkoutMode,
  saveSavedWorkouts,
  saveSelectedEquipment,
  type SavedWorkout,
  saveWorkoutDifficulty,
  saveWorkoutMode,
} from "@/lib/equipment-settings-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dumbbell, RefreshCw, Play, Trash2 } from "lucide-react";

type Screen = "equipment" | "config" | "workout";
const difficultySteps: Difficulty[] = ["easy", "medium", "hard"];

const difficultyLabels: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

function makeDefaultWorkoutName(difficulty: Difficulty, exerciseCount: number): string {
  const dateLabel = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  return `${difficultyLabels[difficulty]} ${exerciseCount}-Move Workout (${dateLabel})`;
}

const Index = () => {
  const [screen, setScreen] = useState<Screen>("equipment");
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentId[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [workoutMode, setWorkoutMode] = useState<WorkoutMode>("all");
  const [exerciseCount, setExerciseCount] = useState(6);
  const [restSeconds, setRestSeconds] = useState(15);
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
  const [workoutName, setWorkoutName] = useState("");
  const [skipNextAutoBuild, setSkipNextAutoBuild] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    Promise.all([loadSelectedEquipment(), loadWorkoutDifficulty(), loadWorkoutMode(), loadSavedWorkouts()])
      .then(([savedEquipment, savedDifficulty, savedWorkoutMode, localSavedWorkouts]) => {
        if (!isMounted) return;
        setSelectedEquipment(savedEquipment);
        setDifficulty(savedDifficulty);
        setWorkoutMode(savedWorkoutMode);
        setSavedWorkouts(localSavedWorkouts);
      })
      .finally(() => {
        if (isMounted) {
          setSettingsLoaded(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!settingsLoaded) return;
    void saveSelectedEquipment(selectedEquipment);
  }, [selectedEquipment, settingsLoaded]);

  useEffect(() => {
    if (!settingsLoaded) return;
    void saveWorkoutDifficulty(difficulty);
  }, [difficulty, settingsLoaded]);

  useEffect(() => {
    if (!settingsLoaded) return;
    void saveWorkoutMode(workoutMode);
  }, [workoutMode, settingsLoaded]);

  const toggleEquipment = useCallback((id: EquipmentId) => {
    setSelectedEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }, []);

  const availableCount = getAvailableExercisesForMode(selectedEquipment, difficulty, workoutMode).length;
  const maxExercises = Math.max(4, Math.min(12, availableCount));

  useEffect(() => {
    setExerciseCount((prev) => Math.min(prev, maxExercises));
  }, [maxExercises]);

  const difficultyIndex = difficultySteps.indexOf(difficulty);

  const regenerate = () => {
    const workout = buildWorkout(selectedEquipment, exerciseCount, difficulty, workoutMode);
    setExercises(workout);
  };

  const saveWorkout = (name: string, workoutExercises: Exercise[]) => {
    if (workoutExercises.length === 0) return;

    const workout: SavedWorkout = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      createdAt: new Date().toISOString(),
      difficulty,
      workoutMode,
      exerciseCount: workoutExercises.length,
      restSeconds,
      selectedEquipment,
      exerciseIds: workoutExercises.map((exercise) => exercise.id),
    };

    const nextSavedWorkouts = [workout, ...savedWorkouts];
    setSavedWorkouts(nextSavedWorkouts);
    void saveSavedWorkouts(nextSavedWorkouts);
  };

  const saveCurrentWorkout = () => {
    if (exercises.length === 0) return;

    const trimmedName = workoutName.trim();
    const name = trimmedName || makeDefaultWorkoutName(difficulty, exercises.length);
    saveWorkout(name, exercises);
    setWorkoutName("");
  };

    const saveCompletedWorkout = useCallback(
    (name: string) => {
      saveWorkout(name.trim() || makeDefaultWorkoutName(difficulty, exercises.length), exercises);
    },
    [difficulty, exercises, restSeconds, selectedEquipment, savedWorkouts, workoutMode]
  );

  const loadSavedWorkout = (savedWorkout: SavedWorkout) => {
    setSkipNextAutoBuild(true);
    setSelectedEquipment(savedWorkout.selectedEquipment);
    setDifficulty(savedWorkout.difficulty);
    setWorkoutMode(savedWorkout.workoutMode ?? "all");
    setExerciseCount(savedWorkout.exerciseCount);
    setRestSeconds(savedWorkout.restSeconds);
    setExercises(getExercisesByIds(savedWorkout.exerciseIds));
  };

  const deleteSavedWorkout = (savedWorkoutId: string) => {
    const nextSavedWorkouts = savedWorkouts.filter((savedWorkout) => savedWorkout.id !== savedWorkoutId);
    setSavedWorkouts(nextSavedWorkouts);
    void saveSavedWorkouts(nextSavedWorkouts);
  };

  useEffect(() => {
    if (screen !== "config") return;

    if (skipNextAutoBuild) {
      setSkipNextAutoBuild(false);
      return;
    }

    setExercises(buildWorkout(selectedEquipment, exerciseCount, difficulty, workoutMode));
  }, [screen, selectedEquipment, exerciseCount, difficulty, workoutMode, skipNextAutoBuild]);

  if (screen === "workout" && exercises.length > 0) {
    return (
      <WorkoutTimer
        exercises={exercises}
        restDuration={restSeconds}
        onComplete={() => {}}
        onBack={() => setScreen("config")}
        onSaveCompletedWorkout={saveCompletedWorkout}
        defaultCompletedWorkoutName={makeDefaultWorkoutName(difficulty, exercises.length)}
      />
    );
  }

  if (screen === "config") {
    const totalTime = exercises.reduce((s, e) => s + e.duration, 0) + restSeconds * Math.max(exercises.length - 1, 0);
    return (
      <div className="min-h-[100dvh] bg-background">
        <div className="max-w-md mx-auto px-4 py-6">
          <button
            onClick={() => setScreen("equipment")}
            className="text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors"
          >
            ← Back to equipment
          </button>

          <h1 className="text-2xl font-bold mb-1">Your Workout</h1>
          <p className="text-muted-foreground text-sm mb-6">
            {availableCount} exercises available with your equipment
          </p>

          {/* Settings */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Difficulty: {difficultyLabels[difficulty]}
              </label>
              <Slider
                value={[difficultyIndex]}
                onValueChange={([v]) => setDifficulty(difficultySteps[v] ?? "medium")}
                min={0}
                max={2}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2 px-0.5">
                <span>Easy</span>
                <span>Medium</span>
                <span>Hard</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border bg-card p-3">
              <div>
                <p className="text-sm font-medium">Stretch-only workout</p>
                <p className="text-xs text-muted-foreground">Only include stretching exercises</p>
              </div>
              <Switch
                checked={workoutMode === "stretch-only"}
                onCheckedChange={(checked) => setWorkoutMode(checked ? "stretch-only" : "all")}
                aria-label="Toggle stretch-only workout"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Exercises: {exerciseCount}
              </label>
              <Slider
                value={[exerciseCount]}
                onValueChange={([v]) => setExerciseCount(v)}
                min={4}
                max={maxExercises}
                step={1}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Rest between exercises: {restSeconds}s
              </label>
              <Slider
                value={[restSeconds]}
                onValueChange={([v]) => setRestSeconds(v)}
                min={5}
                max={60}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">Save this workout</label>
              <div className="flex gap-2">
                <Input
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  placeholder={makeDefaultWorkoutName(difficulty, exercises.length || exerciseCount)}
                  maxLength={80}
                />
                <Button variant="secondary" onClick={saveCurrentWorkout} disabled={exercises.length === 0}>
                  Save
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Leave blank to use a default name based on difficulty and date.
              </p>
            </div>

            {savedWorkouts.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium block">Saved workouts</label>
                <div className="space-y-2 max-h-56 overflow-auto pr-1">
                  {savedWorkouts.map((savedWorkout) => (
                    <div key={savedWorkout.id} className="flex items-center gap-1 p-1 rounded-lg border bg-card">
                      <button
                        onClick={() => loadSavedWorkout(savedWorkout)}
                        className="flex-1 text-left p-2 rounded-md hover:bg-muted/60 transition-colors"
                      >
                        <p className="text-sm font-medium truncate">{savedWorkout.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {difficultyLabels[savedWorkout.difficulty]} · {savedWorkout.exerciseCount} exercises · {savedWorkout.restSeconds}s rest
                          {savedWorkout.workoutMode === "stretch-only" ? " · Stretch only" : ""}
                        </p>
                      </button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteSavedWorkout(savedWorkout.id)}
                        aria-label={`Delete ${savedWorkout.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          {exercises.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">
                  ~{Math.ceil(totalTime / 60)} min workout
                </span>
                <Button variant="ghost" size="sm" onClick={regenerate}>
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Shuffle
                </Button>
              </div>
              <div className="space-y-2">
                {exercises.map((ex, i) => (
                  <div key={ex.id} className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                    <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                    <img src={ex.images[0]} alt={ex.name} className="w-10 h-10 rounded object-cover" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{ex.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {ex.muscleGroup} · {difficultyLabels[ex.difficulty]} · {ex.duration}s
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={() => setScreen("workout")} className="w-full mt-4" size="lg">
                <Play className="h-4 w-4 mr-2" />
                Start Workout
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Equipment selection screen
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-4">
            <Dumbbell className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-1">FitGear Workout</h1>
          <p className="text-muted-foreground text-sm">
            Select your equipment to get a personalized routine
          </p>
        </div>

        <EquipmentSelector selected={selectedEquipment} onToggle={toggleEquipment} />

        {/* Bottom Action */}
        <div className="sticky bottom-0 py-4 bg-background/90 backdrop-blur-sm mt-6 border-t">
          <Button
            onClick={() => setScreen("config")}
            className="w-full"
            size="lg"
          >
            Continue · {availableCount} exercises available
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Bodyweight exercises are always included
          </p>
        </div>
      </div>
    </div>
  );
};


export default Index;
