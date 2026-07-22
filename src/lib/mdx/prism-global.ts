import Prism from "prismjs";

// MUST be imported before any `prismjs/components/prism-*` — assigns the global `Prism` the grammars need (dedicated module guarantees ordering despite ES import hoisting).
(globalThis as typeof globalThis & { Prism?: unknown }).Prism = Prism;

export default Prism;
