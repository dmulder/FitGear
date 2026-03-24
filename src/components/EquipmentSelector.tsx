import { equipmentList, type EquipmentId } from "@/data/exercises";
import { Checkbox } from "@/components/ui/checkbox";
import { Dumbbell, Cog, User, Wrench, Armchair, Heart, Shield } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Free Weights": <Dumbbell className="h-4 w-4" />,
  "Machines & Cables": <Cog className="h-4 w-4" />,
  "Machines": <Cog className="h-4 w-4" />,
  "Bodyweight Stations": <User className="h-4 w-4" />,
  "Accessories": <Wrench className="h-4 w-4" />,
  "Benches & Racks": <Armchair className="h-4 w-4" />,
  "Cardio Machines": <Heart className="h-4 w-4" />,
  Strongman: <Shield className="h-4 w-4" />,
};

interface EquipmentSelectorProps {
  selected: EquipmentId[];
  onToggle: (id: EquipmentId) => void;
}

export function EquipmentSelector({ selected, onToggle }: EquipmentSelectorProps) {
  const categories = [...new Set(equipmentList.map((e) => e.category))];

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const items = equipmentList.filter((e) => e.category === category);
        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary">{categoryIcons[category]}</span>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                {category}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {items.map((item) => {
                const isSelected = selected.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => onToggle(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all text-sm ${
                      isSelected
                        ? "bg-accent border-primary/30 text-accent-foreground"
                        : "bg-card border-border text-card-foreground hover:border-primary/20"
                    }`}
                  >
                    <Checkbox checked={isSelected} className="pointer-events-none" />
                    <span className="leading-tight">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
