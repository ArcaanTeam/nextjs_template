import { ThemeToggle } from "@/components/features/theme/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-4 rounded-2xl bg-emerald-200 dark:bg-emerald-950 flex items-center flex-col gap-4">
        <ThemeToggle />
        <Button variant="outline">I'm here for observing the results</Button>
      </div>
    </div>
  );
}
