import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
    <h1 className="text-5xl font-bold">404</h1>
    <p className="text-muted-foreground">
      The page you are looking for could not be found.
    </p>

    {/* Route back to the Home page and scroll to #home */}
    <Link
      to="/#home"
      replace
      className="cosmic-button mt-4 inline-block"
      aria-label="Go to home page"
    >
      Go Home
    </Link>
  </div>
);