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
import { Input } from "@/components/ui/input";
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

function UpcomingExercisePreview({ exercise }: { exercise: Exercise }) {
  const currentSrc = useImageCycler(exercise.images);
  return (
    <div className="w-full max-w-xs">
      <img
        src={currentSrc}
        alt={exercise.name}
        className="w-full h-40 object-contain rounded-lg bg-card opacity-60"
        loading="lazy"
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
  exerciseDurationOverride?: number | null;
  onComplete: () => void;
  onBack: () => void;
  onSaveCompletedWorkout?: (name: string) => void;
  defaultCompletedWorkoutName?: string;
}

type Phase = "exercise" | "rest" | "complete";
type WindowWithWebkitAudio = Window & { webkitAudioContext?: typeof AudioContext };

function pickPreferredVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;

  const preferredNamePatterns: Array<[string, number]> = [
    ["neural", 120],
    ["natural", 100],
    ["enhanced", 90],
    ["premium", 80],
    ["google", 70],
    ["microsoft", 65],
    ["samantha", 60],
    ["victoria", 55],
    ["daniel", 55],
    ["karen", 55],
    ["alex", 50],
  ];

  const avoidNamePatterns: Array<[string, number]> = [
    ["espeak", -200],
    ["festival", -200],
    ["compact", -80],
    ["robot", -80],
  ];

  const scoreVoice = (voice: SpeechSynthesisVoice): number => {
    const name = voice.name.toLowerCase();
    const lang = voice.lang.toLowerCase();
    let score = 0;

    if (voice.default) score += 20;
    if (lang.startsWith("en")) score += 40;
    if (lang.startsWith("en-us")) score += 25;

    for (const [pattern, points] of preferredNamePatterns) {
      if (name.includes(pattern)) score += points;
    }

    for (const [pattern, points] of avoidNamePatterns) {
      if (name.includes(pattern)) score += points;
    }

    return score;
  };

  return [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] ?? null;
}

function isSingleSentence(text: string): boolean {
  const sentences = text
    .trim()
    .split(/[.!?]+(?=\s|$)/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  return sentences.length <= 1;
}

export function WorkoutTimer({
  exercises,
  restDuration,
  exerciseDurationOverride,
  onComplete,
  onBack,
  onSaveCompletedWorkout,
  defaultCompletedWorkoutName = "My Workout",
}: WorkoutTimerProps) {
  const getExerciseDuration = useCallback(
    (exercise: Exercise) => exerciseDurationOverride ?? exercise.duration,
    [exerciseDurationOverride]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("exercise");
  const [timeLeft, setTimeLeft] = useState(getExerciseDuration(exercises[0]) ?? 40);
  const [isRunning, setIsRunning] = useState(false);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [completedWorkoutName, setCompletedWorkoutName] = useState("");
  const [hasSavedCompletedWorkout, setHasSavedCompletedWorkout] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const speechVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const speechTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastExerciseInstructionIndexRef = useRef(-1);
  const lastRestAnnouncementIndexRef = useRef(-1);

  const currentExercise = exercises[currentIndex];

  const totalDuration = exercises.reduce((sum, e) => sum + getExerciseDuration(e), 0) + restDuration * (exercises.length - 1);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const cancelScheduledSpeech = useCallback(() => {
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }
  }, []);

  const speak = useCallback(
    (text: string, delayMs: number = 0) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      cancelScheduledSpeech();

      speechTimeoutRef.current = setTimeout(() => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = speechVoiceRef.current;
        utterance.rate = 0.92;
        utterance.pitch = 1;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
      }, delayMs);
    },
    [cancelScheduledSpeech]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const assignVoice = () => {
      speechVoiceRef.current = pickPreferredVoice(window.speechSynthesis.getVoices());
    };

    assignVoice();
    window.speechSynthesis.addEventListener("voiceschanged", assignVoice);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", assignVoice);
    };
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
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      const numberWords: Record<number, string> = {
        3: "three",
        2: "two",
        1: "one",
      };

      const word = numberWords[secondsLeft];
      if (!word) return;

      cancelScheduledSpeech();
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(word);
      utterance.voice = speechVoiceRef.current;
      utterance.rate = 1.02;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    },
    [cancelScheduledSpeech]
  );

  const playDing = useCallback((delaySeconds: number = 0) => {
    playTone(1046.5, 0.18, 0.18, 0.22 + delaySeconds, "triangle");
    playTone(1568, 0.22, 0.12, 0.29 + delaySeconds, "sine");
  }, [playTone]);

  useEffect(() => {
    return () => {
      cancelScheduledSpeech();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      const ctx = audioContextRef.current;
      if (ctx && ctx.state !== "closed") {
        void ctx.close();
      }
    };
  }, [cancelScheduledSpeech]);

  useEffect(() => {
    if (phase !== "exercise") return;
    if (!currentExercise) return;

    if (lastExerciseInstructionIndexRef.current === currentIndex) return;
    lastExerciseInstructionIndexRef.current = currentIndex;

    const intro = currentIndex === 0 ? "First up" : "Now";
    const description = currentExercise.description?.trim() ?? "";
    const instruction =
      description.length > 0 && isSingleSentence(description)
        ? `${intro}, ${currentExercise.name}. ${description}`
        : `${intro}, ${currentExercise.name}.`;

    speak(instruction, 1000);
  }, [phase, currentIndex, currentExercise, speak]);

  useEffect(() => {
    if (phase !== "rest") return;

    const nextExercise = exercises[currentIndex + 1];
    if (!nextExercise) return;

    if (lastRestAnnouncementIndexRef.current === currentIndex) return;
    lastRestAnnouncementIndexRef.current = currentIndex;

    speak(`Next up, ${nextExercise.name}.`, 250);
  }, [phase, currentIndex, exercises, speak]);

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
          playDing(0.35);
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
            return getExerciseDuration(exercises[currentIndex + 1]) ?? 40;
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
      setTimeLeft(getExerciseDuration(exercises[currentIndex + 1]) ?? 40);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const maxTime = phase === "exercise" ? (currentExercise ? getExerciseDuration(currentExercise) : 40) : restDuration;
  const progress = maxTime > 0 ? ((maxTime - timeLeft) / maxTime) * 100 : 0;
  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference - (progress / 100) * circumference;

  if (phase === "complete") {
    const saveCompletedWorkout = () => {
      if (!onSaveCompletedWorkout || hasSavedCompletedWorkout) return;
      const name = completedWorkoutName.trim() || defaultCompletedWorkoutName;
      onSaveCompletedWorkout(name);
      setHasSavedCompletedWorkout(true);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Workout Complete!</h2>
        <p className="text-muted-foreground mb-2">
          {exercises.length} exercises in {formatTime(totalElapsed)}
        </p>
        {onSaveCompletedWorkout && (
          <div className="w-full max-w-sm mt-4 space-y-2">
            <div className="flex gap-2">
              <Input
                value={completedWorkoutName}
                onChange={(e) => setCompletedWorkoutName(e.target.value)}
                placeholder={defaultCompletedWorkoutName}
                maxLength={80}
              />
              <Button variant="secondary" onClick={saveCompletedWorkout} disabled={hasSavedCompletedWorkout}>
                {hasSavedCompletedWorkout ? "Saved" : "Save"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Save this completed workout for later.
            </p>
          </div>
        )}
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
          <UpcomingExercisePreview exercise={exercises[currentIndex + 1]} />
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
