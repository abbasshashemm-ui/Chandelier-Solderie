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
        sizes="(max-width: 640px) 36px, 40px"
        className="site-logo-mark h-9 w-auto shrink-0 sm:h-10"
      />
      <span className="site-logo-text font-castellar">CHANDELIER SOLDERIE</span>
    </Link>
  );
}
