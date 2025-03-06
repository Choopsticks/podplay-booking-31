
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only showing the toggle after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    toggleTheme();
    
    // Show toast confirmation
    toast({
      title: `${theme === "dark" ? "Light" : "Dark"} mode activated`,
      description: `Theme switched to ${theme === "dark" ? "light" : "dark"} mode.`,
      duration: 2000,
    });
  };

  if (!mounted) {
    return <Button 
      variant="outline" 
      size="icon" 
      className="rounded-full opacity-0 transition-opacity"
      aria-label="Toggle theme"
    />;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full transition-colors duration-300"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-slate-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </Button>
  );
}
