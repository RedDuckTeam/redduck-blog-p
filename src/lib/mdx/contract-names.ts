export const CONTRACT_COMPONENT_NAMES = [
  "Callout",
  "Embed",
  "ProsCons",
  "Pros",
  "Cons",
  "Cta",
  "FeatureCards",
  "FeatureCard",
] as const;

export type ContractComponentName = (typeof CONTRACT_COMPONENT_NAMES)[number];
