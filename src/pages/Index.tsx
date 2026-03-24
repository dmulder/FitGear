import { useState, useCallback, useEffect, useMemo } from "react";
import { EquipmentSelector } from "@/components/EquipmentSelector";
import { WorkoutTimer } from "@/components/WorkoutTimer";
import {
  buildWorkoutFromAvailable,
  filterAvailableExercises,
  loadExerciseLibrary,
  type EquipmentId,
  type Exercise,
} from "@/data/exercises";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Dumbbell, Zap, RefreshCw, Play } from "lucide-react";

type Screen = "equipment" | "config" | "workout";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("equipment");
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentId[]>([]);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseCount, setExerciseCount] = useState(6);
  const [restSeconds, setRestSeconds] = useState(15);
  const [loadingLibrary, setLoadingLibrary] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    loadExerciseLibrary()
      .then((library) => {
        if (!isActive) return;
        setAllExercises(library);
      })
      .catch((error) => {
        if (!isActive) return;
        setLoadError(error instanceof Error ? error.message : "Failed to load exercise library.");
      })
      .finally(() => {
        if (!isActive) return;
        setLoadingLibrary(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const toggleEquipment = useCallback((id: EquipmentId) => {
    setSelectedEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }, []);

  const availableExercises = useMemo(
    () => filterAvailableExercises(allExercises, selectedEquipment),
    [allExercises, selectedEquipment]
  );

  const availableCount = availableExercises.length;
  const sliderMax = Math.max(4, Math.min(12, availableCount));

  const generateWorkout = () => {
    const workout = buildWorkoutFromAvailable(availableExercises, exerciseCount);
    setExercises(workout);
    setScreen("workout");
  };

  const regenerate = () => {
    const workout = buildWorkoutFromAvailable(availableExercises, exerciseCount);
    setExercises(workout);
  };

  if (screen === "workout" && exercises.length > 0) {
    return (
      <WorkoutTimer
        exercises={exercises}
        restDuration={restSeconds}
        onComplete={() => {}}
        onBack={() => setScreen("config")}
      />
    );
  }

  if (screen === "config") {
    const totalTime = Math.max(0, exercises.reduce((s, e) => s + e.duration, 0) + restSeconds * (exercises.length - 1));
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
              {loadingLibrary
                ? "Loading free-exercise-db library..."
                : `${availableCount} exercises available with your equipment`}
            </p>

          {loadError && (
            <p className="text-sm text-destructive mb-4">{loadError}</p>
          )}

          {/* Settings */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Exercises: {exerciseCount}
              </label>
              <Slider
                value={[exerciseCount]}
                onValueChange={([v]) => setExerciseCount(v)}
                min={4}
                max={sliderMax}
                step={1}
                disabled={loadingLibrary || !!loadError || availableCount === 0}
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
          </div>

          {/* Generate */}
          <Button
            onClick={generateWorkout}
            className="w-full mb-4"
            size="lg"
            disabled={loadingLibrary || !!loadError || availableCount === 0}
          >
            <Zap className="h-4 w-4 mr-2" />
            Generate Workout
          </Button>

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
                      <p className="text-xs text-muted-foreground">{ex.muscleGroup} · {ex.duration}s</p>
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
            onClick={() => {
              const workout = buildWorkoutFromAvailable(availableExercises, exerciseCount);
              setExercises(workout);
              setScreen("config");
            }}
            className="w-full"
            size="lg"
            disabled={loadingLibrary || !!loadError || availableCount === 0}
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
