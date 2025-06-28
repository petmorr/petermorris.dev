import { Code } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter, // “X” (formerly Twitter)
  FaEnvelope,
  FaDownload,
} from "react-icons/fa6";

const FeatureCard = ({ title, children }) => (
  <div className="card-hover gradient-border flex gap-4 rounded-xl p-6">
    <div className="shrink-0 rounded-full bg-primary/10 p-3">
      <Code className="h-6 w-6 text-primary" />
    </div>

    <div className="flex flex-col gap-2">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  </div>
);

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-28 px-4 md:px-0">
      <div className="container mx-auto max-w-5xl space-y-16">
        {/* Heading */}
        <header className="space-y-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            About <span className="text-primary">Me</span>
          </h2>
        </header>

        {/* Intro + Feature cards */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {/* Intro */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Web Developer, AI Enthusiast & Hobby Data Analyst
            </h3>

            <p className="leading-relaxed text-muted-foreground">
              I build interactive web apps and love experimenting with new tech.
              Starting at university with HTML, CSS and JavaScript, I now work
              chiefly with React and Next.js.
            </p>

            <p className="leading-relaxed text-muted-foreground">
              My current passion is actively exploring and learning about AI.
            </p>

            <p className="leading-relaxed text-muted-foreground">
              I publish data‑driven insights on Celtic FC and the Scottish
              Premiership via X and my blog, hoping to fuel discussion on player
              performance and tactics.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FeatureCard title="Web Development">
                PLACEHOLDER
            </FeatureCard>
            <FeatureCard title="AI & ML">
                PLACEHOLDER
            </FeatureCard>
            <FeatureCard title="Data Analysis">
                PLACEHOLDER
            </FeatureCard>
            <FeatureCard title="Software Engineering">
                PLACEHOLDER
            </FeatureCard>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" className="cosmic-button inline-flex items-center gap-2">
            <FaEnvelope className="h-4 w-4" />
            Get in Touch
          </a>

          <a
            href="@/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2 text-primary transition-colors duration-300 hover:bg-primary hover:text-background"
          >
            <FaDownload className="h-4 w-4" />
            Download CV
          </a>

          <a
            href="https://github.com/petmorr"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button inline-flex items-center gap-2"
          >
            <FaGithub className="h-5 w-5" />
            My GitHub Profile
          </a>

          <a
            href="https://www.linkedin.com/in/peter-morris-sco/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2 text-primary transition-colors duration-300 hover:bg-primary hover:text-background"
          >
            <FaLinkedin className="h-5 w-5" />
            My LinkedIn Profile
          </a>

          <a
            href="https://x.com/CelticAnalytico"
            aria-label="X"
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button inline-flex items-center gap-2"
          >
            <FaXTwitter className="h-5 w-5" />
            My Data Analyst X Profile
          </a>
        </div>
      </div>
    </section>
  );
};