export function CatalogueWelcome() {
  return (
    <div className="catalogue-welcome">
      <div className="catalogue-welcome-suspension" aria-hidden="true">
        <span className="catalogue-welcome-rosette" />
        <span className="catalogue-welcome-cord" />
      </div>

      <div className="catalogue-welcome-pendant">
        <div className="catalogue-welcome-panel">
          <p className="catalogue-welcome-eyebrow font-sans text-[0.625rem] uppercase tracking-[0.22em] text-[#999] sm:text-[0.6875rem]">
            Welcome to
          </p>
          <h1 className="catalogue-welcome-brand font-serif text-[1.75rem] font-normal leading-none text-[#1a1a1a] sm:text-[2.25rem] md:text-[2.75rem]">
            Chandelier Solderie
          </h1>
        </div>
        <div className="catalogue-welcome-light" aria-hidden="true" />
      </div>
    </div>
  );
}
