import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { CONTACT_US_URL, NAV_LINKS, type NavLink } from "@/lib/site";

const NAV_ITEM_BASE = cn(
  "flex h-full items-center font-mono uppercase text-black",
  "px-4 text-base transition-colors duration-200 hover:bg-[#e0cdc6dd]",
  "xl:px-6 xl:text-lg 2xl:px-[30px] 2xl:text-[20px]",
);
const NAV_ITEM_ACTIVE = "bg-[#e0cdc6dd] font-medium";

function DesktopNavItem({ link }: { link: NavLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className={NAV_ITEM_BASE}
      >
        {link.name}
      </a>
    );
  }
  return (
    <Link
      to={link.href}
      className={NAV_ITEM_BASE}
      activeOptions={{ exact: true }}
      activeProps={{ className: NAV_ITEM_ACTIVE }}
    >
      {link.name}
    </Link>
  );
}

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-stretch justify-between",
        "h-16 border-b border-concrete bg-gray backdrop-blur-[20px] lg:h-[70px] 2xl:h-[96px]",
      )}
    >
      <Link
        to="/"
        aria-label="RedDuck blog — home"
        className="flex shrink-0 items-center px-5 md:px-[30px]"
      >
        <img
          src="/images/logo.svg"
          alt="RedDuck"
          width={217}
          height={28}
          className="h-[22px] w-auto select-none 2xl:h-[28px]"
        />
      </Link>

      <nav className="hidden items-stretch lg:flex">
        {NAV_LINKS.map((link) => (
          <DesktopNavItem key={link.name} link={link} />
        ))}
        <a
          href={CONTACT_US_URL}
          className={cn(
            "ml-4 flex items-center justify-center self-center bg-red font-mono uppercase text-black",
            "h-[44px] px-6 text-base transition-opacity hover:opacity-90",
            "2xl:mr-6 2xl:h-[60px] 2xl:w-[260px] 2xl:text-[20px]",
          )}
        >
          Contact Us
        </a>
      </nav>

      <MobileNav />
    </header>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="flex items-center lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-full items-center px-5 text-black"
      >
        {open ? <X /> : <Menu />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto border-t border-concrete bg-gray">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex h-[66px] items-center border-b border-concrete px-[30px] font-mono text-xl uppercase text-black hover:bg-[#e0cdc6dd]"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-[#e0cdc6dd] font-medium" }}
                className="flex h-[66px] items-center border-b border-concrete px-[30px] font-mono text-xl uppercase text-black hover:bg-[#e0cdc6dd]"
              >
                {link.name}
              </Link>
            ),
          )}
          <div className="p-5">
            <a
              href={CONTACT_US_URL}
              onClick={() => setOpen(false)}
              className="flex h-[56px] w-full items-center justify-center bg-red font-mono text-lg uppercase text-black transition-opacity hover:opacity-90"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
