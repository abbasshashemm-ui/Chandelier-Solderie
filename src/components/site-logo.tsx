import Image from "next/image";
import Link from "next/link";

export function SiteLogo() {
  return (
    <Link
      href="/"
      className="site-header__logo relative z-20 flex shrink-0 items-center gap-2 justify-self-start sm:gap-2.5 md:gap-3"
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={468}
        height={476}
        priority
        aria-hidden
        className="site-logo-mark h-8 w-auto shrink-0 sm:h-9"
      />
      <span className="site-logo-text">CHANDELIER SOLDERIE</span>
    </Link>
  );
}
