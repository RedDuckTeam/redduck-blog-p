DELETE FROM post_views WHERE post_id BETWEEN 1 AND 32;
DELETE FROM post_tags WHERE post_id BETWEEN 1 AND 32;
DELETE FROM posts WHERE id BETWEEN 1 AND 32;
DELETE FROM tags WHERE id BETWEEN 1 AND 6;

INSERT INTO tags (id, name, slug) VALUES
  (1, 'News', 'news'),
  (2, 'Blockchain', 'blockchain'),
  (3, 'DeFi', 'defi'),
  (4, 'Security', 'security'),
  (5, 'Wallets', 'wallets'),
  (6, 'Web3', 'web3');

INSERT INTO posts (id, slug, title, excerpt, content, cover_image, status, author, meta_title, meta_description, og_image, published_at, created_at, updated_at, created_by, updated_by) VALUES
  (1, 'crypto-wallet-development-company-and-services', 'Crypto Wallet Development Company & Services', 'How to develop your own crypto wallet: wallet types, the features modern wallets contain, and how those features are built.', 'Many companies think of building their own crypto wallet at some point, as it is the main entry point into Web3. This guide walks through wallet types, the features modern wallets ship, and how they are built.

## Crypto Wallet Types

Let''s start by defining the two primary types of crypto wallets — custodial and self-custodial.

### Custodial Wallets

Custodial wallets take your private keys into their custody. Your money is stored on somebody else''s infrastructure and you use it like a bank account.

- Web2-like experience
- Custodial support can help when users lose credentials
- A third party controls the keys

### Self-Custodial Wallets

Self-custodial wallets generate and store the keys on the user''s device, ensuring no third party can touch them.

1. Full autonomy over funds
2. Full anonymity when used carefully
3. The user carries all the responsibility

> If your product depends on someone else''s infrastructure — you''re not in control.

## Feature Comparison

| Feature | Self-Custodial | Custodial |
| --- | --- | --- |
| Security | Dependent on the user | Dependent on the custodian |
| Ease of use | Moderate to difficult | Easy, beginner-friendly |
| Recovery | User is responsible | Custodian can help with recovery |
| Privacy | High (no KYC) | Low (usually entails KYC) |

![Crypto wallet architecture diagram](/media/00000000-0000-4000-8000-000000000001.png)

## Security Notes

<Callout type="info">
  Wallets are the main entry point into Web3 — treat their security as a first-class concern.
</Callout>

<Callout type="warning">
  Never share your seed phrase with anyone, ever.
</Callout>

<Callout type="success">
  Clear signing dramatically reduces the risk of blind-signing attacks.
</Callout>

<Callout type="danger">
  Blind signing an unknown transaction can drain your entire balance.
</Callout>

## Code Samples

A plain fenced block (no language):

```
witch collapse practice feed shame open despair creek road again ice least
```

JavaScript:

```js
const wallet = ethers.Wallet.createRandom();
console.log(wallet.address);
```

TypeScript:

```ts
const balance: bigint = await provider.getBalance(address);
```

TSX:

```tsx
export function Balance({ value }: { value: string }) {
  return <span className="mono">{value} ETH</span>;
}
```

Bash:

```bash
npm install ethers
node scripts/generate-wallet.js
```

JSON:

```json
{ "chainId": 1, "name": "mainnet", "nativeCurrency": "ETH" }
```

HTML:

```html
<button class="connect">Connect Wallet</button>
```

CSS:

```css
.connect { background: #ed4a38; color: #fff; }
```

## Trade-offs

<ProsCons>
  <Pros>
    * Fast setup
    * Great developer experience
  </Pros>

  <Cons>
    * Steeper learning curve
    * More responsibility on the user
  </Cons>
</ProsCons>

## Embedded Demo

<Embed url="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Wallet demo walkthrough" />

## Feature Highlights

<FeatureCards>
  <FeatureCard title="Fast">
    Blazing fast transaction signing on every supported chain.
  </FeatureCard>

  <FeatureCard title="Secure">
    Clear signing and passphrase protection out of the box.
  </FeatureCard>
</FeatureCards>

## Summary

Building a modern wallet requires real expertise. Read our [wallet development guide](https://redduck.io/services/wallet-development) or head back to the [blog](/).

## Summary

This second identical heading exists on purpose: it verifies that duplicate heading slugs stay unique (the anchor here becomes `summary-1`).

<Cta title="Have an idea?" buttonText="START DISCUSSION" buttonUrl="https://redduck.io/#getInTouch" />
', '/media/00000000-0000-4000-8000-0000000000c1.png', 'published', 'Mark Virchenko', 'Crypto Wallet Development Company & Services | RedDuck', 'A full-cycle guide to crypto wallet development — custodial vs self-custodial, key features, and how RedDuck builds them.', '/media/00000000-0000-4000-8000-0000000000f1.png', 1739232000000, 1739145600000, 1741996800000, 'seed', 'seed'),
  (2, 'understanding-account-abstraction-in-2025', 'Understanding Account Abstraction in 2025', 'Understanding Account Abstraction in 2025: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at understanding account abstraction in 2025 and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000002.png', 'published', 'Mark Virchenko', NULL, NULL, NULL, 1752105600000, 1752105600000, 1752105600000, 'seed', 'seed'),
  (3, 'a-practical-guide-to-defi-security-audits', 'A Practical Guide to DeFi Security Audits', 'A Practical Guide to DeFi Security Audits: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at a practical guide to defi security audits and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Anna Petrenko', NULL, NULL, NULL, 1751587200000, 1751587200000, 1751587200000, 'seed', 'seed'),
  (4, 'zero-knowledge-proofs-explained-for-builders', 'Zero-Knowledge Proofs Explained for Builders', 'Zero-Knowledge Proofs Explained for Builders: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at zero-knowledge proofs explained for builders and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000004.png', 'published', 'Dmytro Koval', NULL, NULL, NULL, 1751068800000, 1751068800000, 1751068800000, 'seed', 'seed'),
  (5, 'how-rwa-tokenization-is-reshaping-finance', 'How RWA Tokenization Is Reshaping Finance', 'How RWA Tokenization Is Reshaping Finance: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at how rwa tokenization is reshaping finance and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Olena Shevchenko', NULL, NULL, NULL, 1750550400000, 1750550400000, 1750809600000, 'seed', 'seed'),
  (6, 'choosing-the-right-l2-for-your-dapp', 'Choosing the Right L2 for Your dApp', 'Choosing the Right L2 for Your dApp: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at choosing the right l2 for your dapp and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000006.png', 'published', 'RedDuck Team', NULL, NULL, NULL, 1750032000000, 1750032000000, 1750032000000, 'seed', 'seed'),
  (7, 'smart-contract-upgrade-patterns-compared', 'Smart Contract Upgrade Patterns Compared', 'Smart Contract Upgrade Patterns Compared: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at smart contract upgrade patterns compared and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Mark Virchenko', NULL, NULL, NULL, 1749513600000, 1749513600000, 1749513600000, 'seed', 'seed'),
  (8, 'onchain-analytics-reading-wallet-behaviour', 'Onchain Analytics: Reading Wallet Behaviour', 'Onchain Analytics: Reading Wallet Behaviour: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at onchain analytics: reading wallet behaviour and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000008.png', 'published', 'Anna Petrenko', NULL, NULL, NULL, 1748995200000, 1748995200000, 1748995200000, 'seed', 'seed'),
  (9, 'building-a-cross-chain-swap-interface', 'Building a Cross-Chain Swap Interface', 'Building a Cross-Chain Swap Interface: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at building a cross-chain swap interface and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Dmytro Koval', NULL, NULL, NULL, 1748476800000, 1748476800000, 1748476800000, 'seed', 'seed'),
  (10, 'the-state-of-dao-governance-tooling', 'The State of DAO Governance Tooling', 'The State of DAO Governance Tooling: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at the state of dao governance tooling and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000010.png', 'published', 'Olena Shevchenko', NULL, NULL, NULL, 1747958400000, 1747958400000, 1747958400000, 'seed', 'seed'),
  (11, 'gas-optimization-techniques-for-solidity', 'Gas Optimization Techniques for Solidity', 'Gas Optimization Techniques for Solidity: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at gas optimization techniques for solidity and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'RedDuck Team', NULL, NULL, NULL, 1747440000000, 1747440000000, 1747440000000, 'seed', 'seed'),
  (12, 'mev-and-how-wallets-can-protect-users', 'MEV and How Wallets Can Protect Users', 'MEV and How Wallets Can Protect Users: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at mev and how wallets can protect users and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000012.png', 'published', 'Mark Virchenko', NULL, NULL, NULL, 1746921600000, 1746921600000, 1747180800000, 'seed', 'seed'),
  (13, 'designing-a-non-custodial-onramp-flow', 'Designing a Non-Custodial Onramp Flow', 'Designing a Non-Custodial Onramp Flow: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at designing a non-custodial onramp flow and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Anna Petrenko', NULL, NULL, NULL, 1746403200000, 1746403200000, 1746403200000, 'seed', 'seed'),
  (14, 'gamefi-economies-that-actually-work', 'GameFi Economies That Actually Work', 'GameFi Economies That Actually Work: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at gamefi economies that actually work and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000014.png', 'published', 'Dmytro Koval', NULL, NULL, NULL, 1745884800000, 1745884800000, 1745884800000, 'seed', 'seed'),
  (15, 'a-deep-dive-into-passkeys-and-webauthn-wallets', 'A Deep Dive into Passkeys and WebAuthn Wallets', 'A Deep Dive into Passkeys and WebAuthn Wallets: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at a deep dive into passkeys and webauthn wallets and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Olena Shevchenko', NULL, NULL, NULL, 1745366400000, 1745366400000, 1745366400000, 'seed', 'seed'),
  (16, 'stablecoins-mechanisms-and-risks', 'Stablecoins: Mechanisms and Risks', 'Stablecoins: Mechanisms and Risks: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at stablecoins: mechanisms and risks and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000016.png', 'published', 'RedDuck Team', NULL, NULL, NULL, 1744848000000, 1744848000000, 1744848000000, 'seed', 'seed'),
  (17, 'integrating-prism-highlighting-server-side', 'Integrating Prism Highlighting Server-Side', 'Integrating Prism Highlighting Server-Side: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at integrating prism highlighting server-side and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Mark Virchenko', NULL, NULL, NULL, 1744329600000, 1744329600000, 1744329600000, 'seed', 'seed'),
  (18, 'lightning-network-support-in-mobile-wallets', 'Lightning Network Support in Mobile Wallets', 'Lightning Network Support in Mobile Wallets: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at lightning network support in mobile wallets and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000018.png', 'published', 'Anna Petrenko', NULL, NULL, NULL, 1743811200000, 1743811200000, 1743811200000, 'seed', 'seed'),
  (19, 'auditing-an-erc-4626-vault', 'Auditing an ERC-4626 Vault', 'Auditing an ERC-4626 Vault: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at auditing an erc-4626 vault and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Dmytro Koval', NULL, NULL, NULL, 1743292800000, 1743292800000, 1743552000000, 'seed', 'seed'),
  (20, 'from-seed-phrase-to-social-recovery', 'From Seed Phrase to Social Recovery', 'From Seed Phrase to Social Recovery: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at from seed phrase to social recovery and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000020.png', 'published', 'Olena Shevchenko', NULL, NULL, NULL, 1742774400000, 1742774400000, 1742774400000, 'seed', 'seed'),
  (21, 'bridging-assets-without-losing-your-mind', 'Bridging Assets Without Losing Your Mind', 'Bridging Assets Without Losing Your Mind: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at bridging assets without losing your mind and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'RedDuck Team', NULL, NULL, NULL, 1742256000000, 1742256000000, 1742256000000, 'seed', 'seed'),
  (22, 'launchpad-architecture-for-token-sales', 'Launchpad Architecture for Token Sales', 'Launchpad Architecture for Token Sales: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at launchpad architecture for token sales and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000022.png', 'published', 'Mark Virchenko', NULL, NULL, NULL, 1741737600000, 1741737600000, 1741737600000, 'seed', 'seed'),
  (23, 'realtime-balance-tracking-at-scale', 'Realtime Balance Tracking at Scale', 'Realtime Balance Tracking at Scale: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at realtime balance tracking at scale and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Anna Petrenko', NULL, NULL, NULL, 1741219200000, 1741219200000, 1741219200000, 'seed', 'seed'),
  (24, 'the-case-for-clear-signing-everywhere', 'The Case for Clear Signing Everywhere', 'The Case for Clear Signing Everywhere: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at the case for clear signing everywhere and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000024.png', 'published', 'Dmytro Koval', NULL, NULL, NULL, 1740700800000, 1740700800000, 1740700800000, 'seed', 'seed'),
  (25, 'depin-decentralized-physical-infrastructure', 'DePIN: Decentralized Physical Infrastructure', 'DePIN: Decentralized Physical Infrastructure: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at depin: decentralized physical infrastructure and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Olena Shevchenko', NULL, NULL, NULL, 1740182400000, 1740182400000, 1740182400000, 'seed', 'seed'),
  (26, 'building-a-portfolio-dashboard-with-charts', 'Building a Portfolio Dashboard with Charts', 'Building a Portfolio Dashboard with Charts: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at building a portfolio dashboard with charts and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000026.png', 'published', 'RedDuck Team', NULL, NULL, NULL, 1739664000000, 1739664000000, 1739923200000, 'seed', 'seed'),
  (27, 'nft-rental-protocols-and-their-mechanics', 'NFT Rental Protocols and Their Mechanics', 'NFT Rental Protocols and Their Mechanics: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at nft rental protocols and their mechanics and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Mark Virchenko', NULL, NULL, NULL, 1739145600000, 1739145600000, 1739145600000, 'seed', 'seed'),
  (28, 'solana-vs-evm-a-developer-s-perspective', 'Solana vs EVM: A Developer''s Perspective', 'Solana vs EVM: A Developer''s Perspective: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at solana vs evm: a developer''s perspective and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000028.png', 'published', 'Anna Petrenko', NULL, NULL, NULL, 1738627200000, 1738627200000, 1738627200000, 'seed', 'seed'),
  (29, 'prediction-markets-after-the-2024-cycle', 'Prediction Markets After the 2024 Cycle', 'Prediction Markets After the 2024 Cycle: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at prediction markets after the 2024 cycle and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', NULL, 'published', 'Dmytro Koval', NULL, NULL, NULL, 1738108800000, 1738108800000, 1738108800000, 'seed', 'seed'),
  (30, 'shipping-a-wallet-a-full-cycle-retrospective', 'Shipping a Wallet: A Full-Cycle Retrospective', 'Shipping a Wallet: A Full-Cycle Retrospective: a concise, practical breakdown from the RedDuck engineering team.', 'In this article we take a closer look at shipping a wallet: a full-cycle retrospective and what it means for teams shipping Web3 products today.

## Introduction

The Web3 landscape moves quickly. RedDuck has shipped production systems across DeFi, wallets, and infrastructure, and the patterns below come straight from that work.

## Key Takeaways

- The fundamentals matter more than the hype cycle
- Security and UX are not a trade-off when designed together
- Shipping early and iterating beats waiting for perfection

## Conclusion

If you are building something in this space and want a reliable development partner, [get in touch](https://redduck.io/#getInTouch).
', '/media/00000000-0000-4000-8000-000000000030.png', 'published', 'Olena Shevchenko', NULL, NULL, NULL, 1737590400000, 1737590400000, 1737590400000, 'seed', 'seed'),
  (31, 'draft-upcoming-defi-report', 'Draft: Upcoming DeFi Report', 'This draft must never appear on the public blog.', '## Work in progress

This is a draft and should be filtered out.', NULL, 'draft', 'RedDuck Team', NULL, NULL, NULL, NULL, 1752278400000, 1752278400000, 'seed', 'seed'),
  (32, 'draft-wallet-benchmark', 'Draft: Wallet Benchmark', 'Second draft for filter verification.', '## Draft

Still measuring.', NULL, 'draft', 'RedDuck Team', NULL, NULL, NULL, NULL, 1752364800000, 1752364800000, 'seed', 'seed');

INSERT INTO post_tags (post_id, tag_id) VALUES
  (1, 1),
  (1, 2),
  (1, 5),
  (2, 3),
  (2, 4),
  (2, 5),
  (3, 4),
  (4, 5),
  (4, 6),
  (5, 6),
  (5, 1),
  (5, 2),
  (6, 1),
  (7, 2),
  (7, 3),
  (8, 3),
  (8, 4),
  (8, 5),
  (9, 4),
  (10, 5),
  (10, 6),
  (11, 6),
  (11, 1),
  (11, 2),
  (12, 1),
  (13, 2),
  (13, 3),
  (14, 3),
  (14, 4),
  (14, 5),
  (15, 4),
  (16, 5),
  (16, 6),
  (17, 6),
  (17, 1),
  (17, 2),
  (18, 1),
  (19, 2),
  (19, 3),
  (20, 3),
  (20, 4),
  (20, 5),
  (21, 4),
  (22, 5),
  (22, 6),
  (23, 6),
  (23, 1),
  (23, 2),
  (24, 1),
  (25, 2),
  (25, 3),
  (26, 3),
  (26, 4),
  (26, 5),
  (27, 4),
  (28, 5),
  (28, 6),
  (29, 6),
  (29, 1),
  (29, 2),
  (30, 1);

INSERT INTO post_views (post_id, count) VALUES
  (1, 4440),
  (2, 1287),
  (3, 342);
