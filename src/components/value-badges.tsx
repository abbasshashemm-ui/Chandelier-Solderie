import { siteContact } from "@/lib/site-contact";
import {
  ChandelierIcon,
  ConsultIcon,
  InstallationIcon,
  RulerIcon,
} from "./service-icons";

const badges = [
  {
    icon: ChandelierIcon,
    title: "Curated Collection",
    copy: "Crystal, brass and modern pieces, selected one by one.",
  },
  {
    icon: RulerIcon,
    title: "Custom Sizing",
    copy: "Drops and diameters scaled to your ceiling.",
  },
  {
    icon: InstallationIcon,
    title: "Installation",
    copy: "Fitted and aligned by our own team.",
  },
  {
    icon: ConsultIcon,
    title: "Direct Consultation",
    copy: `Advice and quotes on WhatsApp · ${siteContact.location}`,
  },
] as const;

export function ValueBadges() {
  return (
    <dl className="grid w-full max-w-4xl grid-cols-2 gap-x-4 gap-y-6 border-y border-line py-6 sm:gap-x-6 sm:py-8 lg:grid-cols-4">
      {badges.map((badge) => {
        const Icon = badge.icon;

        return (
          <div
            key={badge.title}
            className="value-badge flex flex-col items-center px-1 text-center sm:px-2"
          >
            <span className="value-badge__icon flex size-10 items-center justify-center border border-line text-gold sm:size-11">
              <Icon className="size-4 sm:size-[1.125rem]" />
            </span>
            <dt className="mt-3 font-sans text-[0.5625rem] font-medium uppercase tracking-[0.22em] text-gold sm:text-[0.625rem]">
              {badge.title}
            </dt>
            <dd className="mt-1.5 font-serif text-sm leading-snug text-muted sm:mt-2 sm:text-base">
              {badge.copy}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
