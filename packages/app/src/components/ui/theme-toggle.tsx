"use client";

import { useTheme } from "@skills-eval/design-system";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface AppThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button" | "switch";
  showLabel?: boolean;
}

/**
 * App-specific theme toggle component with enhanced styling and smooth transitions
 */
export function AppThemeToggle({
  className,
  size = "md",
  variant = "icon",
  showLabel = false,
}: AppThemeToggleProps) {
  const { isDark, isLight, isSystem, setMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (isLight || isSystem) {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const handleCycle = () => {
    if (isLight) {
      setMode("dark");
    } else if (isDark) {
      setMode("system");
    } else {
      setMode("light");
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`inline-flex items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm ${size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10"} ${className}`}>
        <div className="h-4 w-4 animate-pulse bg-muted-foreground/20 rounded" />
      </div>
    );
  }

  if (variant === "switch") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {showLabel && (
          <span className="text-sm font-medium text-foreground">
            {isDark ? "Dark" : "Light"} Mode
          </span>
        )}
        <button
          onClick={handleToggle}
          className={`
            relative inline-flex items-center rounded-full border-2 border-transparent 
            transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 
            focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
            ${isDark ? "bg-primary" : "bg-secondary-200"}
            ${size === "sm" ? "h-5 w-9" : size === "lg" ? "h-7 w-12" : "h-6 w-11"}
          `}
          role="switch"
          aria-checked={isDark}
          aria-label="Toggle theme"
        >
          <span
            className={`
              pointer-events-none inline-block transform rounded-full bg-white shadow 
              ring-0 transition-all duration-300 ease-in-out
              ${isDark ? "translate-x-5" : "translate-x-0"}
              ${size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"}
            `}
          />
        </button>
      </div>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={handleCycle}
        className={`
          inline-flex items-center justify-center rounded-md border border-input 
          bg-background text-foreground shadow-sm transition-all duration-200
          hover:bg-accent hover:text-accent-foreground focus:outline-none 
          focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
          disabled:pointer-events-none disabled:opacity-50
          ${size === "sm" ? "h-8 px-3 text-sm" : size === "lg" ? "h-12 px-6 text-lg" : "h-10 px-4"}
          ${className}
        `}
        title={`Current: ${isLight ? "Light" : isDark ? "Dark" : "System"}. Click to cycle`}
        aria-label={`Switch theme. Current: ${isLight ? "Light" : isDark ? "Dark" : "System"}`}
      >
        {isLight && <Sun className="h-4 w-4 transition-transform duration-200 hover:rotate-12" />}
        {isDark && <Moon className="h-4 w-4 transition-transform duration-200 hover:rotate-12" />}
        {isSystem && (
          <svg className="h-4 w-4 transition-transform duration-200 hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        )}
        {showLabel && (
          <span className="ml-2 text-sm font-medium capitalize">
            {isLight ? "Light" : isDark ? "Dark" : "System"}
          </span>
        )}
      </button>
    );
  }

  // Icon variant (default) - Enhanced with smooth transitions and hover effects
  return (
    <button
      onClick={handleCycle}
      className={`
        inline-flex items-center justify-center rounded-md border border-input 
        bg-background text-foreground shadow-sm transition-all duration-200
        hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:outline-none 
        focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
        disabled:pointer-events-none disabled:opacity-50
        ${size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10"}
        ${className}
      `}
      title={`Current: ${isLight ? "Light" : isDark ? "Dark" : "System"}. Click to cycle`}
      aria-label={`Switch theme. Current: ${isLight ? "Light" : isDark ? "Dark" : "System"}`}
    >
      {isLight && (
        <Sun className="h-4 w-4 transition-all duration-200 hover:rotate-12 hover:scale-110" />
      )}
      {isDark && (
        <Moon className="h-4 w-4 transition-all duration-200 hover:rotate-12 hover:scale-110" />
      )}
      {isSystem && (
        <svg className="h-4 w-4 transition-all duration-200 hover:rotate-12 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )}
    </button>
  );
}