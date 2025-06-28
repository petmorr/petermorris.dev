import { ArrowDown } from 'lucide-react';

export const HomeSection = () => (
  <section
    id="home"
    className="relative flex min-h-screen flex-col items-center justify-center px-4"
  >
    <div className="container z-10 mx-auto max-w-4xl text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
        <span className="animate-fade-in opacity-0">Hi, my name is </span>
        <span className="animate-fade-in-1 text-primary opacity-0">Peter</span>
        <span className="ml-2 animate-fade-in-2 text-gradient opacity-0">Morris</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-in-3 opacity-0">
        I’m a Digital Transformation Graduate at NatWest with a first-class BSc (Hons) in
        Software Development for Business from Glasgow Caledonian University.<br />
        When off the clock you’ll find me building web apps, experimenting with machine-learning
        projects, and crunching player data for Celtic FC.
      </p>

      <div className="mt-6 animate-fade-in-4 opacity-0">
        <a href="#projects" className="cosmic-button">
          View My Work
        </a>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
      <span className="mb-2 text-sm text-muted-foreground">Scroll</span>
      <ArrowDown className="h-5 w-5 text-primary" />
    </div>
  </section>
);