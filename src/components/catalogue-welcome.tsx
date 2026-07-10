function ChandelierChains() {
  return (
    <div className="catalogue-welcome-chains" aria-hidden="true">
      <span className="catalogue-welcome-chain" />
      <span className="catalogue-welcome-chain catalogue-welcome-chain--center" />
      <span className="catalogue-welcome-chain" />
    </div>
  );
}

function ChandelierSilhouette() {
  return (
    <svg
      className="catalogue-welcome-icon"
      viewBox="0 0 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 2v6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18 8h28c0 0 2 4 2 8 0 6-4 10-14 10S20 22 20 16c0-4 2-8 2-8z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="rgba(201, 169, 98, 0.08)"
      />
      <path
        d="M14 24c4 3 8 4 18 4s14-1 18-4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M12 24v3M20 26v4M32 27v5M44 26v4M52 24v3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="12" cy="28" r="1.2" fill="currentColor" />
      <circle cx="20" cy="31" r="1.2" fill="currentColor" />
      <circle cx="32" cy="33" r="1.4" fill="currentColor" />
      <circle cx="44" cy="31" r="1.2" fill="currentColor" />
      <circle cx="52" cy="28" r="1.2" fill="currentColor" />
    </svg>
  );
}

function CrystalDrops() {
  return (
    <div className="catalogue-welcome-drops" aria-hidden="true">
      {["0.55rem", "0.7rem", "0.85rem", "0.7rem", "0.55rem"].map(
        (size, index) => (
          <span
            key={index}
            className="catalogue-welcome-drop"
            style={{ height: size, width: size }}
          />
        ),
      )}
    </div>
  );
}

export function CatalogueWelcome() {
  return (
    <div className="catalogue-welcome-mount">
      <div className="catalogue-welcome-ceiling-cap" aria-hidden="true" />

      <div className="catalogue-welcome-hanger">
        <ChandelierChains />

        <div className="catalogue-welcome-pendant">
          <ChandelierSilhouette />

          <h1 className="catalogue-welcome catalogue-welcome-title font-serif text-[1.25rem] font-normal leading-tight text-[#1a1a1a] sm:text-[1.6rem] sm:leading-none md:text-[2rem]">
            Welcome to Chandelier Solderie
          </h1>

          <div className="catalogue-welcome-glow-line" aria-hidden="true" />
          <CrystalDrops />
        </div>
      </div>
    </div>
  );
}
