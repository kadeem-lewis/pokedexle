export default function Footer() {
  const START_YEAR = 2023;
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-1 w-full border-t-4 border-t-primary-accent bg-panel-accent-active text-center after:absolute after:inset-0 after:-mt-2 after:border-t-4 after:border-t-border">
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-1">
        <p className="text-2xl">
          &copy; {START_YEAR} - {year} pokedexle.com
        </p>
        <p className="text-xl">
          Nintendo does not endorse or sponsor this project.
        </p>
      </div>
    </footer>
  );
}
