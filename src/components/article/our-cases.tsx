import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { LANDING_URL } from "@/lib/site";

const CASES_URL = `${LANDING_URL}/services/wallet-development`;

interface CaseData {
  image: string;
  imageAlt: string;
  founded: string;
  tags: string[];
  title: string;
  paragraphs: string[];
  href: string;
  imageSide: "left" | "right";
}

const CASES: CaseData[] = [
  {
    image: "/images/case-1.png",
    imageAlt: "GOWallet product interface mockup",
    founded: "Founded 2024",
    tags: ["USA", "Non-custodial wallet"],
    title: "GOWallet: Bridging Custodial Ease with Non-Custodial Control",
    paragraphs: [
      "GOWallet approached us when they wanted to create a non-custodial wallet infrastructure alongside token creation. A standout feature GOWallet requested to implement was the multi-chain interoperability (Solana, Bitcoin, Lightning Network, EVM). Our suggestion to implement the passphrase feature made the wallet even more unique, as there was no wallet on the market with both passphrase and Lightning Network support at the same time.",
      "Delivered as a mobile app for iOS and Android, GOWallet supports multiple chains, connectivity to third-party dApps for broad interoperability, as well as integrated swaps.",
      "This project required a full-cycle approach – covering design, software development, and testing – resulting in a multi-functional wallet that bridges traditional crypto networks with modern DeFi use cases.",
    ],
    href: CASES_URL,
    imageSide: "left",
  },
  {
    image: "/images/case-2.png",
    imageAlt: "NFT rental wallet product interface mockup",
    founded: "Founded 2024",
    tags: ["USA", "Non-custodial wallet"],
    title: "Innovating for NFT Holders and Traders",
    paragraphs: [
      "This product was designed by our team. It is a self-custodial wallet with an embedded NFT rental protocol – an emerging standard at the time. We addressed the core issue of ensuring NFT returns post-rental through smart-contracts that were embedded into the wallet.",
      "Using the minimal proxy contract standard, we optimized transaction fees efficiency and enabled dApp interaction via smart contracts rather than EOAs (Externally Owned Accounts). Built with React, TypeScript, Chainlink Automation, Solidity, and Hardhat, emerged as a pioneering infrastructure for NFT-focused users.",
    ],
    href: CASES_URL,
    imageSide: "right",
  },
];

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-dark-gray px-4 py-2 font-body text-[16px] whitespace-nowrap text-gray md:px-6 md:text-[18px]">
      {children}
    </span>
  );
}

function CaseCard({ data }: { data: CaseData }) {
  const imageOnRight = data.imageSide === "right";

  return (
    <article className="grid border border-concrete lg:grid-cols-2">
      <div
        className={cn(
          "flex items-center justify-center bg-[#272727] p-6 md:p-10",
          imageOnRight ? "lg:order-2" : "lg:order-1",
        )}
      >
        <img
          src={data.image}
          alt={data.imageAlt}
          loading="lazy"
          className="h-auto w-full max-w-[840px] object-contain"
        />
      </div>

      <div
        className={cn(
          "flex flex-col gap-8 border-t border-concrete p-6 md:p-10 lg:border-t-0",
          imageOnRight
            ? "lg:order-1 lg:border-r"
            : "lg:order-2 lg:border-l",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <TagPill>{data.founded}</TagPill>
          <div className="flex flex-wrap items-center justify-end gap-3">
            {data.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="font-mono text-2xl leading-tight text-white md:text-[32px]">
            {data.title}
          </h3>
          {data.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="font-body text-[16px] leading-[1.4] text-gray md:text-[20px]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <a
          href={data.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-5"
        >
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-black transition-colors group-hover:bg-red group-hover:text-white">
            <ArrowUpRight className="size-7" aria-hidden />
          </span>
          <span className="font-mono text-lg uppercase text-white md:text-[24px]">
            Explore more
          </span>
        </a>
      </div>
    </article>
  );
}

export function OurCases() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-10 px-5 py-[60px] md:gap-[60px] md:px-[60px]">
        <div className="grid border border-concrete md:grid-cols-2">
          <div className="flex min-h-[120px] items-center border-b border-concrete px-6 py-8 md:min-h-[150px] md:border-b-0 md:border-r md:px-10">
            <h2 className="font-mono text-3xl font-medium uppercase text-white md:text-[45px]">
              _Our Cases
            </h2>
          </div>
          <div className="flex flex-col gap-5 px-6 py-8 md:px-10 md:py-10">
            <span className="size-[10px] bg-white" aria-hidden />
            <p className="font-body text-[16px] leading-[1.4] text-gray md:text-[20px]">
              Since 2020, RedDuck has focused on building Web3 products, with a
              particular emphasis on crypto wallets. Among our publicly available
              projects, we&rsquo;ve collaborated with ProxyWallet and GOWallet.
              Both of them are unique wallets, each representing a unique
              sub-niche. Below we will uncover them in more detail.
            </p>
          </div>
        </div>

        {CASES.map((data) => (
          <CaseCard key={data.title} data={data} />
        ))}
      </div>
    </section>
  );
}

export default OurCases;
