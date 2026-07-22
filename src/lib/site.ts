export const SITE_URL = "https://blog.redduck.io";
export const LANDING_URL = "https://redduck.io";

export const PAGE_SIZE = 15;
export const STRIP_SIZE = 4;

export const CONTACT_US_URL = `${LANDING_URL}/#getInTouch`;
export const PRIVACY_POLICY_URL = `${LANDING_URL}/privacy-policy`;

export interface NavLink {
  name: string;
  href: string;
  external: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { name: "Services", href: `${LANDING_URL}/services/defi-development`, external: true },
  { name: "Cases", href: `${LANDING_URL}/#cases`, external: true },
  { name: "Blog", href: "/", external: false },
  { name: "About Us", href: `${LANDING_URL}/about`, external: true },
];

export interface FooterLink {
  name: string;
  href: string;
}

export const FOOTER_SERVICES: FooterLink[] = [
  { name: "DeFi Development", href: `${LANDING_URL}/services/defi-development` },
  { name: "RWA Tokenization", href: `${LANDING_URL}/services/rwa` },
  { name: "Wallet Development", href: `${LANDING_URL}/services/wallet-development` },
  {
    name: "Smart Contract Development",
    href: `${LANDING_URL}/services/smart-contract-development`,
  },
  {
    name: "DeFi Security & Audit Readiness",
    href: `${LANDING_URL}/services/defi-security-audit`,
  },
  { name: "DAO Development", href: `${LANDING_URL}/services/dao-development` },
  { name: "ZK Development", href: `${LANDING_URL}/services/zk-development` },
  { name: "GameFi Development", href: `${LANDING_URL}/services/gamefi-development` },
];

export const FOOTER_ABOUT: FooterLink[] = [
  { name: "Cases", href: `${LANDING_URL}/#cases` },
  { name: "About Us", href: `${LANDING_URL}/about` },
  { name: "Academy", href: `${LANDING_URL}/#blockchainAcademy` },
  { name: "Memo", href: "https://public.redduck.io/RedDuck_MEMO.pdf" },
];

export const SOCIAL_LINKS: FooterLink[] = [
  { name: "Medium", href: "https://redduck.medium.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/redduckio" },
  { name: "Upwork", href: "https://www.upwork.com/agencies/redduck/" },
  { name: "Telegram", href: "https://telegram.me/RedDuckUA" },
  { name: "GitHub", href: "https://github.com/RedDuck-Software" },
  { name: "DOU", href: "https://jobs.dou.ua/companies/red-duck/" },
];

export const CLUTCH_URL = "https://clutch.co/profile/redduck";
export const UPWORK_URL = "https://www.upwork.com/agencies/redduck/";

export const CONTACTS = {
  email: "contact@redduck.io",
  cyprus: {
    company: "Redduck Limited",
    phone: "+357 96 333 210",
    phoneHref: "tel:+35796333210",
    address: "2 Grigori Afxentiou, Akamia Center, office 15 Larnaca 6023",
  },
  ukraine: {
    phone: "+380 50 214 72 63",
    phoneHref: "tel:+380502147263",
    address: "Saperne pole 12, Kyiv 01042",
  },
} as const;
