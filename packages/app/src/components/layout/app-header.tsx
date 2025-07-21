"use client";

import { AppThemeToggle } from "@/components/ui";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface AppHeaderProps {
  className?: string;
}

/**
 * App header component with navigation and theme toggle
 */
export function AppHeader({ className }: AppHeaderProps) {
  const { data: session, status } = useSession();

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SK</span>
              </div>
              <span className="text-xl font-semibold text-foreground">
                Skills Evaluation
              </span>
            </Link>
          </div>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              {session && (
                <Link 
                  href="/dashboard" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </nav>

            {/* Theme Toggle */}
            <AppThemeToggle 
              variant="icon" 
              size="sm" 
              className="ml-4"
            />

            {/* Auth Status */}
            <div className="flex items-center space-x-2">
              {status === "loading" ? (
                <div className="h-8 w-8 animate-pulse bg-muted rounded-md" />
              ) : session ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">
                      {session.user?.name?.[0] || "U"}
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-foreground">
                    {session.user?.name}
                  </span>
                </div>
              ) : (
                <Link 
                  href="/auth/signin"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}