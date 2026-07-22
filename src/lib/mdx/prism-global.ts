import Prism from "prismjs";

(globalThis as typeof globalThis & { Prism?: unknown }).Prism = Prism;

await import("prismjs/components/prism-markup");
await import("prismjs/components/prism-javascript");
await import("prismjs/components/prism-typescript");
await import("prismjs/components/prism-jsx");
await import("prismjs/components/prism-tsx");
await import("prismjs/components/prism-bash");
await import("prismjs/components/prism-json");
await import("prismjs/components/prism-css");

export default Prism;
