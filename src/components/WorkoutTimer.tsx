import { useState, useEffect, useCallback, useRef } from "react";
import type { Exercise } from "@/data/exercises";

function useImageCycler(images: string[], intervalMs: number = 1000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    setIndex(0);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images, intervalMs]);
  return images[index] || images[0];
}
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, RotateCcw, ChevronLeft } from "lucide-react";

function ExerciseImage({ exercise }: { exercise: Exercise }) {
  const currentSrc = useImageCycler(exercise.images);
  return (
    <div className="w-full max-w-xs mb-4">
      <img
        src={currentSrc}
        alt={exercise.name}
        className="w-full h-40 object-contain rounded-lg bg-card"
      />
      <p className="text-sm text-muted-foreground text-center mt-3 leading-relaxed px-2">
        {exercise.description}
      </p>
    </div>
  );
}

interface WorkoutTimerProps {
  exercises: Exercise[];
  restDuration: number;
  onComplete: () => void;
  onBack: () => void;
}

type Phase = "exercise" | "rest" | "complete";
type WindowWithWebkitAudio = Window & { webkitAudioContext?: typeof AudioContext };

export function WorkoutTimer({ exercises, restDuration, onComplete, onBack }: WorkoutTimerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("exercise");
  const [timeLeft, setTimeLeft] = useState(exercises[0]?.duration ?? 40);
  const [isRunning, setIsRunning] = useState(false);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const currentExercise = exercises[currentIndex];

  const totalDuration = exercises.reduce((sum, e) => sum + e.duration, 0) + restDuration * (exercises.length - 1);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;

    const existing = audioContextRef.current;
    if (existing && existing.state !== "closed") {
      return existing;
    }

    const AudioContextCtor = window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext;
    if (!AudioContextCtor) return null;

    const ctx = new AudioContextCtor();
    audioContextRef.current = ctx;
    return ctx;
  }, []);

  const ensureAudioReady = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== "suspended") return;
    void ctx.resume();
  }, [getAudioContext]);

  const playTone = useCallback(
    (frequency: number, durationSeconds: number, volume: number, delaySeconds: number = 0, type: OscillatorType = "sine") => {
      const ctx = getAudioContext();
      if (!ctx) return;

      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      const now = ctx.currentTime + delaySeconds;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(now);
      oscillator.stop(now + durationSeconds + 0.02);
    },
    [getAudioContext]
  );

  const playCountdownNumber = useCallback(
    (secondsLeft: number) => {
      const frequencyBySecond: Record<number, number> = { 3: 740, 2: 680, 1: 620 };
      const frequency = frequencyBySecond[secondsLeft];
      if (!frequency) return;
      playTone(frequency, 0.12, 0.08, 0, "square");
    },
    [playTone]
  );

  const playDing = useCallback(() => {
    playTone(1046.5, 0.18, 0.18, 0.22, "triangle");
    playTone(1568, 0.22, 0.12, 0.29, "sine");
  }, [playTone]);

  useEffect(() => {
    return () => {
      const ctx = audioContextRef.current;
      if (ctx && ctx.state !== "closed") {
        void ctx.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 3 && prev > 0) {
          playCountdownNumber(prev);
        }

        if (prev <= 1) {
          playDing();
          // Time's up for this phase
          if (phase === "exercise") {
            if (currentIndex < exercises.length - 1) {
              setPhase("rest");
              return restDuration;
            } else {
              setPhase("complete");
              setIsRunning(false);
              onComplete();
              return 0;
            }
          } else if (phase === "rest") {
            setPhase("exercise");
            setCurrentIndex((i) => i + 1);
            return exercises[currentIndex + 1]?.duration ?? 40;
          }
        }
        return prev - 1;
      });
      setTotalElapsed((t) => t + 1);
    }, 1000);

    return clearTimer;
  }, [
    isRunning,
    phase,
    currentIndex,
    exercises,
    restDuration,
    onComplete,
    clearTimer,
    playCountdownNumber,
    playDing,
  ]);

  const skip = () => {
    clearTimer();
    if (phase === "exercise") {
      if (currentIndex < exercises.length - 1) {
        setPhase("rest");
        setTimeLeft(restDuration);
      } else {
        setPhase("complete");
        setIsRunning(false);
        onComplete();
      }
    } else if (phase === "rest") {
      setPhase("exercise");
      setCurrentIndex((i) => i + 1);
      setTimeLeft(exercises[currentIndex + 1]?.duration ?? 40);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const maxTime = phase === "exercise" ? (currentExercise?.duration ?? 40) : restDuration;
  const progress = maxTime > 0 ? ((maxTime - timeLeft) / maxTime) * 100 : 0;
  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference - (progress / 100) * circumference;

  if (phase === "complete") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Workout Complete!</h2>
        <p className="text-muted-foreground mb-2">
          {exercises.length} exercises in {formatTime(totalElapsed)}
        </p>
        <Button onClick={onBack} className="mt-6">
          <RotateCcw className="h-4 w-4 mr-2" />
          New Workout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {exercises.length}
        </span>
        <span className="text-sm text-muted-foreground">{formatTime(totalElapsed)}</span>
      </div>

      {/* Phase Label */}
      <div className="text-center px-4">
        {phase === "rest" ? (
          <div className="mb-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Rest</span>
            <p className="text-sm text-muted-foreground mt-1">
              Next: {exercises[currentIndex + 1]?.name}
            </p>
          </div>
        ) : (
          <div className="mb-2">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">
              {currentExercise.muscleGroup}
            </span>
            <h2 className="text-xl font-bold mt-1">{currentExercise.name}</h2>
          </div>
        )}
      </div>

      {/* Timer Circle */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="relative w-52 h-52 mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" strokeWidth="6" className="stroke-muted" />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className={phase === "rest" ? "stroke-muted-foreground" : "stroke-primary"}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: dashOffset,
                transition: "stroke-dashoffset 1s linear",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold tabular-nums">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Exercise Image (during exercise phase) */}
        {phase === "exercise" && (
          <ExerciseImage exercise={currentExercise} />
        )}

        {/* Next exercise preview during rest */}
        {phase === "rest" && exercises[currentIndex + 1] && (
          <div className="w-full max-w-xs">
            <img
              src={exercises[currentIndex + 1].images[0]}
              alt={exercises[currentIndex + 1].name}
              className="w-full h-40 object-contain rounded-lg bg-card opacity-60"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 p-6 pb-8">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={skip}
        >
          <SkipForward className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          className="h-16 w-16 rounded-full"
          onClick={() => {
            if (!isRunning) {
              ensureAudioReady();
            }
            setIsRunning(!isRunning);
          }}
        >
          {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
        </Button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${(totalElapsed / totalDuration) * 100}%` }}
        />
      </div>
    </div>
  );
}
