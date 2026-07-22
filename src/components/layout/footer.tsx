import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import {
  CLUTCH_URL,
  CONTACTS,
  FOOTER_ABOUT,
  FOOTER_SERVICES,
  PRIVACY_POLICY_URL,
  SOCIAL_LINKS,
  UPWORK_URL,
} from "@/lib/site";
import { cn } from "@/lib/utils";
import type { TagWithCount } from "@/server/posts";

import {
  ClutchLogo,
  DouIcon,
  GithubIcon,
  LinkedInIcon,
  MediumIcon,
  TelegramIcon,
  UpWorkIcon,
  UpworkLogo,
} from "./icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const SOCIAL_ICONS: Record<string, IconComponent> = {
  Medium: MediumIcon,
  LinkedIn: LinkedInIcon,
  Upwork: UpWorkIcon,
  Telegram: TelegramIcon,
  GitHub: GithubIcon,
  DOU: DouIcon,
};

const COLUMN = "flex flex-col border-b border-r border-concrete";
const COLUMN_TITLE =
  "border-b border-concrete px-6 py-8 font-mono text-xl uppercase text-white 2xl:px-10 2xl:py-10 2xl:text-[24px]";
const NAV_ROW =
  "flex items-center justify-between gap-4 border-b border-concrete px-6 py-4 font-mono text-base uppercase text-gray transition-colors last:border-b-0 hover:bg-white/5 2xl:px-10 2xl:py-5 2xl:text-[20px]";
const NAV_ARROW = "size-5 shrink-0 text-dark-gray 2xl:size-[30px]";

function ExternalRow({ name, href }: { name: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={NAV_ROW}>
      <span className="truncate">{name}</span>
      <ArrowUpRight className={NAV_ARROW} />
    </a>
  );
}

export interface FooterProps {
  topTags?: TagWithCount[];
}

export function Footer({ topTags = [] }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="text-gray bg-black">
      <div className="border-concrete mx-auto w-full max-w-[1920px] border-t border-l">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4">
          <div className={COLUMN}>
            <h2 className={COLUMN_TITLE}>Contact Us</h2>
            <address className="font-body text-gray flex flex-col gap-5 px-6 py-8 text-base not-italic 2xl:px-10 2xl:py-10 2xl:text-[18px]">
              <a
                href={`mailto:${CONTACTS.email}`}
                className="w-fit hover:text-white hover:underline"
              >
                {CONTACTS.email}
              </a>
              <div className="flex flex-col gap-1">
                <p className="font-medium text-white">
                  {CONTACTS.cyprus.company}
                </p>
                <a
                  href={CONTACTS.cyprus.phoneHref}
                  className="w-fit hover:text-white"
                >
                  {CONTACTS.cyprus.phone}
                </a>
                <p className="text-dark-gray">{CONTACTS.cyprus.address}</p>
              </div>
              <div className="flex flex-col gap-1">
                <a
                  href={CONTACTS.ukraine.phoneHref}
                  className="w-fit hover:text-white"
                >
                  {CONTACTS.ukraine.phone}
                </a>
                <p className="text-dark-gray">{CONTACTS.ukraine.address}</p>
              </div>
            </address>
          </div>

          <div className={COLUMN}>
            <h2 className={COLUMN_TITLE}>About Us</h2>
            <nav className="flex flex-col">
              {FOOTER_ABOUT.map((link) => (
                <ExternalRow
                  key={link.name}
                  name={link.name}
                  href={link.href}
                />
              ))}
            </nav>
          </div>

          <div className={COLUMN}>
            <h2 className={COLUMN_TITLE}>Our Services</h2>
            <nav className="flex flex-col">
              {FOOTER_SERVICES.map((link) => (
                <ExternalRow
                  key={link.name}
                  name={link.name}
                  href={link.href}
                />
              ))}
            </nav>
          </div>

          <div className={COLUMN}>
            <h2 className={COLUMN_TITLE}>Popular Topics</h2>
            <nav className="flex flex-col">
              {topTags.length > 0 ? (
                topTags.map((tag) => (
                  <Link
                    key={tag.slug}
                    to="/"
                    search={{ tag: tag.slug }}
                    className={NAV_ROW}
                  >
                    <span className="truncate">{tag.name}</span>
                    <span className="text-dark-gray shrink-0">{tag.count}</span>
                  </Link>
                ))
              ) : (
                <Link to="/" className={NAV_ROW}>
                  <span className="truncate">All posts</span>
                  <ArrowUpRight className={NAV_ARROW} />
                </Link>
              )}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4">
          <div className="border-concrete flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-r border-b px-6 py-10 md:col-span-2 2xl:gap-x-[60px]">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.name];
              if (!Icon) return null;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`RedDuck on ${link.name}`}
                  className="text-white transition-opacity hover:opacity-70"
                >
                  <Icon className="size-[35px] 2xl:size-[42px]" />
                </a>
              );
            })}
          </div>

          <RatingCard
            href={CLUTCH_URL}
            label="Clutch"
            starClassName="text-red"
            logo={
              <ClutchLogo className="h-[36px] w-auto text-white 2xl:h-[40px]" />
            }
          />
          <RatingCard
            href={UPWORK_URL}
            label="Upwork"
            starClassName="text-green"
            logo={
              <UpworkLogo className="h-[30px] w-auto text-white 2xl:h-[34px]" />
            }
          />
        </div>

        <div className="border-concrete h-[80px] border-r border-b lg:h-[120px] 2xl:h-[180px]" />

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <p className="border-concrete font-body text-gray flex items-center justify-center border-r border-b px-6 py-5 text-center text-base 2xl:text-[20px]">
            © {year} Copyright. All rights reserved
          </p>
          <a
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noreferrer"
            className="border-concrete font-body text-gray flex items-center justify-center border-r border-b px-6 py-5 text-center text-base transition-colors hover:bg-white/5 2xl:text-[20px]"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

function RatingCard({
  href,
  label,
  starClassName,
  logo,
}: {
  href: string;
  label: string;
  starClassName: string;
  logo: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`RedDuck 5.0 rating on ${label}`}
      className="border-concrete flex items-center justify-between gap-4 border-r border-b px-6 py-8 transition-colors hover:bg-white/5 2xl:px-10 2xl:py-10"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-gray font-mono text-xl 2xl:text-[24px]">
            5.0
          </span>
          <span className={cn("flex gap-1", starClassName)}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-[22px] fill-current 2xl:size-[26px]"
                strokeWidth={0}
              />
            ))}
          </span>
        </div>
        <span className="text-dark-gray font-mono text-sm uppercase 2xl:text-base">
          Reviewed on
        </span>
        {logo}
      </div>
      <span className="border-concrete flex size-[48px] shrink-0 items-center justify-center rounded-full border 2xl:size-[56px]">
        <ArrowUpRight className="size-6 text-white" />
      </span>
    </a>
  );
}

export default Footer;
