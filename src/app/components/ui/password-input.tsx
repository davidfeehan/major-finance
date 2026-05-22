import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "./input"
import { cn } from "./utils"

/**
 * PasswordInput Component
 * 
 * A secure password input field with show/hide functionality following best practices:
 * - Hidden by default for security
 * - Eye icon toggle for visibility
 * - Keyboard accessible with proper ARIA labels
 * - Prevents form submission when toggling visibility (tabIndex: -1)
 * - Focus ring for accessibility
 * - Smooth transitions for better UX
 * 
 * Usage:
 * <PasswordInput 
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   hasLeftIcon // if using a left icon like Lock
 *   minLength={6}
 *   required
 * />
 */

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Whether to show an icon on the left (like Lock icon)
   * If true, adds padding to accommodate the icon
   */
  hasLeftIcon?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, hasLeftIcon = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev)
    }

    return (
      <>
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            hasLeftIcon ? "pl-10" : "",
            "pr-10", // Always add right padding for the eye icon
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm z-10"
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }