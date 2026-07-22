declare module "prismjs" {
  export interface Grammar {
    [token: string]: unknown;
  }

  export interface PrismStatic {
    languages: Record<string, Grammar | undefined>;
    highlight(text: string, grammar: Grammar, language: string): string;
  }

  const Prism: PrismStatic;
  export default Prism;
}

declare module "prismjs/components/*" {}
