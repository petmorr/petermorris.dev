import { ThemeToggle } from '@/components/ThemeToggle';
import { StarBackground } from '@/components/StarBackground';
import { Navbar } from '@/components/Navbar';
import { HomeSection } from '@/components/HomeSection';
import { AboutSection } from '@/components/AboutSection';

export const Home = () => (
  <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <ThemeToggle />
    <StarBackground />
    <Navbar />

    <main>
      <HomeSection />
      <AboutSection />
    </main>
  </div>
);