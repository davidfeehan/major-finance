import * as React from "react"
import { cn } from "./utils"

export interface PasswordStrengthProps {
  password: string;
  className?: string;
}

const calculatePasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  if (!password) {
    return { score: 0, label: "", color: "" };
  }

  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;
  
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;
  
  // Contains numbers
  if (/\d/.test(password)) score += 1;
  
  // Contains special characters
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;

  // Map score to strength
  if (score <= 2) {
    return { score: 1, label: "Weak", color: "bg-destructive" };
  } else if (score <= 4) {
    return { score: 2, label: "Fair", color: "bg-orange-500" };
  } else if (score <= 5) {
    return { score: 3, label: "Good", color: "bg-primary" };
  } else {
    return { score: 4, label: "Strong", color: "bg-emerald-600" };
  }
};

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const strength = calculatePasswordStrength(password);

  if (!password) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              level <= strength.score ? strength.color : "bg-muted"
            )}
          />
        ))}
      </div>
      {strength.label && (
        <p className="text-xs text-muted-foreground">
          Password strength: <span className="font-medium">{strength.label}</span>
        </p>
      )}
    </div>
  );
}