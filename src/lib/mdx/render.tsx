import Prism from "@/lib/mdx/prism-global";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import type { CSSProperties, ReactNode } from "react";
import type {
  AlignType,
  Code,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  MdxJsxFlowElement,
  MdxJsxTextElement,
  Nodes,
  Table,
} from "@/lib/mdx/mdast-types";
import { parseMarkdown, type TocItem } from "@/lib/mdx/parse";

export interface RenderResult {
  node: ReactNode;
  toc: TocItem[];
  fallback: boolean;
}

export function renderMarkdown(content: string): RenderResult {
  const { tree, toc, fallback } = parseMarkdown(content);
  return { node: <>{renderNodes(tree.children, "n")}</>, toc, fallback };
}

function renderNodes(nodes: ReadonlyArray<Nodes>, keyPrefix: string): ReactNode[] {
  return nodes.map((node, index) => renderNode(node, `${keyPrefix}-${index}`));
}

function renderNode(node: Nodes, key: string): ReactNode {
  switch (node.type) {
    case "text":
      return node.value;
    case "paragraph":
      return (
        <p key={key} className="my-5 font-body text-lg leading-relaxed text-gray">
          {renderNodes(node.children, key)}
        </p>
      );
    case "heading":
      return renderHeading(node, key);
    case "strong":
      return (
        <strong key={key} className="font-semibold text-red">
          {renderNodes(node.children, key)}
        </strong>
      );
    case "emphasis":
      return (
        <em key={key} className="italic">
          {renderNodes(node.children, key)}
        </em>
      );
    case "delete":
      return (
        <del key={key} className="text-dark-gray line-through">
          {renderNodes(node.children, key)}
        </del>
      );
    case "break":
      return <br key={key} />;
    case "inlineCode":
      return (
        <code
          key={key}
          className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-gray"
        >
          {node.value}
        </code>
      );
    case "link":
      return renderLink(node, key);
    case "image":
      return renderImage(node, key);
    case "list":
      return renderList(node, key);
    case "listItem":
      return renderListItem(node, key);
    case "blockquote":
      return (
        <blockquote key={key} className="my-6 border-l-4 border-red pl-5 italic text-gray">
          {renderNodes(node.children, key)}
        </blockquote>
      );
    case "thematicBreak":
      return <hr key={key} className="my-10 border-t border-concrete" />;
    case "code":
      return renderCode(node, key);
    case "table":
      return renderTable(node, key);
    case "mdxJsxFlowElement":
    case "mdxJsxTextElement":
      return renderMdxJsx(node, key);
    default:
      return null;
  }
}

function renderHeading(node: Heading, key: string): ReactNode {
  const id = (node.data as { id?: string } | undefined)?.id;
  const children = renderNodes(node.children, key);
  switch (node.depth) {
    case 1:
      return (
        <h1 key={key} id={id} className="mt-12 mb-6 font-mono text-4xl font-bold uppercase tracking-tight text-white">
          {children}
        </h1>
      );
    case 2:
      return (
        <h2
          key={key}
          id={id}
          className="mt-12 mb-5 scroll-mt-24 font-mono text-3xl font-bold uppercase tracking-tight text-white"
        >
          {children}
        </h2>
      );
    case 3:
      return (
        <h3
          key={key}
          id={id}
          className="mt-10 mb-4 scroll-mt-24 font-mono text-2xl font-bold uppercase tracking-tight text-white"
        >
          {children}
        </h3>
      );
    default:
      return (
        <h4 key={key} className="mt-8 mb-3 font-mono text-lg font-semibold uppercase text-white">
          {children}
        </h4>
      );
  }
}

function isSafeUrl(url: string): boolean {
  let cleaned = "";
  for (const ch of url) {
    if (ch.charCodeAt(0) > 0x20) cleaned += ch;
  }
  if (cleaned === "") return true;
  if (/^[/?#]/.test(cleaned) || /^\.\.?\//.test(cleaned)) return true;
  if (/^(?:https?|mailto|tel):/i.test(cleaned)) return true;
  return !/^[a-z][a-z0-9+.-]*:/i.test(cleaned);
}

function renderLink(node: Link, key: string): ReactNode {
  const safe = isSafeUrl(node.url);
  if (!safe) console.warn(`[mdx] blocked unsafe link href: ${node.url}`);
  const external = safe && /^https?:\/\//i.test(node.url);
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      key={key}
      href={safe ? node.url : undefined}
      title={node.title ?? undefined}
      {...externalProps}
      className="text-red underline underline-offset-2 hover:no-underline"
    >
      {renderNodes(node.children, key)}
    </a>
  );
}

function renderImage(node: Image, key: string): ReactNode {
  const image = (
    <img
      src={node.url}
      alt={node.alt ?? ""}
      loading="lazy"
      className="h-auto max-w-full rounded"
    />
  );
  if (node.title) {
    return (
      <figure key={key} className="my-6">
        {image}
        <figcaption className="mt-2 text-center font-mono text-xs text-dark-gray">
          {node.title}
        </figcaption>
      </figure>
    );
  }
  return (
    <img
      key={key}
      src={node.url}
      alt={node.alt ?? ""}
      loading="lazy"
      className="my-6 h-auto max-w-full rounded"
    />
  );
}

function renderList(node: List, key: string): ReactNode {
  const items = node.children.map((item, index) => renderListItem(item, `${key}-${index}`));
  if (node.ordered) {
    return (
      <ol
        key={key}
        start={node.start ?? undefined}
        className="my-5 list-decimal space-y-2 pl-6 font-body text-lg leading-relaxed text-gray marker:text-red"
      >
        {items}
      </ol>
    );
  }
  return (
    <ul
      key={key}
      className="my-5 list-disc space-y-2 pl-6 font-body text-lg leading-relaxed text-gray marker:text-red"
    >
      {items}
    </ul>
  );
}

function renderListItem(node: ListItem, key: string): ReactNode {
  const checkbox =
    typeof node.checked === "boolean" ? (
      <input
        type="checkbox"
        checked={node.checked}
        disabled
        aria-label={node.checked ? "Completed" : "Incomplete"}
        className="mr-2 align-middle"
      />
    ) : null;
  return (
    <li key={key} className="pl-1">
      {checkbox}
      {renderNodes(node.children, key)}
    </li>
  );
}

const PRISM_LANGUAGES: Record<string, string> = {
  js: "javascript",
  javascript: "javascript",
  ts: "typescript",
  typescript: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  bash: "bash",
  sh: "bash",
  shell: "bash",
  json: "json",
  css: "css",
  html: "markup",
  markup: "markup",
  xml: "markup",
};

function renderCode(node: Code, key: string): ReactNode {
  const rawLang = (node.lang ?? "").toLowerCase();
  const grammarName = PRISM_LANGUAGES[rawLang];
  const grammar = grammarName ? Prism.languages[grammarName] : undefined;

  let highlighted: string | null = null;
  if (grammar) {
    try {
      highlighted = Prism.highlight(node.value, grammar, grammarName);
    } catch {
      highlighted = null;
    }
  }

  const label = rawLang || "text";
  return (
    <div key={key} className="my-6 overflow-hidden rounded border border-concrete/60 bg-[#161616]">
      <div className="border-b border-concrete/60 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wide text-dark-gray">
        {label}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-gray">
        {highlighted === null ? (
          <code className="language-none">{node.value}</code>
        ) : (
          <code
            className={`language-${grammarName}`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        )}
      </pre>
    </div>
  );
}

function alignStyle(align: AlignType | undefined): CSSProperties | undefined {
  return align ? { textAlign: align } : undefined;
}

function renderTable(node: Table, key: string): ReactNode {
  const align = node.align ?? [];
  const [headerRow, ...bodyRows] = node.children;
  return (
    <div key={key} className="my-6 overflow-x-auto">
      <table className="w-full border-collapse font-body text-sm text-gray">
        {headerRow ? (
          <thead>
            <tr>
              {headerRow.children.map((cell, ci) => (
                <th
                  key={ci}
                  style={alignStyle(align[ci])}
                  className="border border-concrete bg-white/5 px-4 py-2 text-left font-mono text-xs uppercase tracking-wide text-white"
                >
                  {renderNodes(cell.children, `${key}-h-${ci}`)}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={ri}>
              {row.children.map((cell, ci) => (
                <td
                  key={ci}
                  style={alignStyle(align[ci])}
                  className="border border-concrete px-4 py-2 align-top"
                >
                  {renderNodes(cell.children, `${key}-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface MdxContext {
  attrs: Record<string, string>;
  children: ReactNode;
  key: string;
}

type MdxRenderer = (context: MdxContext) => ReactNode;

const CALLOUT_STYLES: Record<string, string> = {
  info: "border-[#2f6fed] bg-[#2f6fed]/12",
  warning: "border-[#d99a1c] bg-[#d99a1c]/12",
  success: "border-green bg-green/12",
  danger: "border-red bg-red/12",
};

function renderCta({ attrs, key }: MdxContext): ReactNode {
  const rawUrl = attrs.buttonUrl ?? "";
  const safe = rawUrl !== "" && isSafeUrl(rawUrl);
  if (rawUrl !== "" && !safe) console.warn(`[mdx] blocked unsafe Cta buttonUrl: ${rawUrl}`);
  const buttonUrl = safe ? rawUrl : "";
  const external = /^https?:\/\//i.test(buttonUrl);
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <div
      key={key}
      className="my-8 flex flex-col items-start gap-4 rounded border border-concrete bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="font-mono text-xl font-bold uppercase text-white">{attrs.title ?? ""}</div>
      {buttonUrl ? (
        <a
          href={buttonUrl}
          {...externalProps}
          className="inline-flex shrink-0 bg-red px-6 py-3 font-mono text-sm font-bold uppercase text-white hover:bg-red/90"
        >
          {attrs.buttonText || "Learn more"}
        </a>
      ) : null}
    </div>
  );
}

function renderEmbed({ attrs, key }: MdxContext): ReactNode {
  const url = attrs.url ?? "";
  if (!/^https?:\/\//i.test(url)) {
    if (url) console.warn(`[mdx] blocked non-http(s) Embed url: ${url}`);
    return <div key={key} />;
  }
  return (
    <div
      key={key}
      className="my-6 aspect-video w-full overflow-hidden rounded border border-concrete"
    >
      <iframe
        src={url}
        title={attrs.title || url}
        loading="lazy"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation"
        className="h-full w-full"
      />
    </div>
  );
}

function proConBadge(sign: "+" | "−"): ReactNode {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red text-sm font-bold text-white">
      {sign}
    </span>
  );
}

const MDX_RENDERERS: Record<string, MdxRenderer> = {
  Callout: ({ attrs, children, key }) => {
    const type = attrs.type && CALLOUT_STYLES[attrs.type] ? attrs.type : "info";
    return (
      <aside
        key={key}
        className={`my-6 rounded border-l-4 p-4 font-body text-sm leading-6 text-gray ${CALLOUT_STYLES[type]}`}
      >
        {children}
      </aside>
    );
  },
  Embed: renderEmbed,
  Cta: renderCta,
  ProsCons: ({ children, key }) => (
    <div key={key} className="my-6 grid gap-4 md:grid-cols-2">
      {children}
    </div>
  ),
  Pros: ({ children, key }) => (
    <div key={key} className="rounded border border-concrete/60 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center gap-2">
        {proConBadge("+")}
        <span className="font-mono text-sm font-bold uppercase text-white">Pros</span>
      </div>
      <div className="font-body text-gray">{children}</div>
    </div>
  ),
  Cons: ({ children, key }) => (
    <div key={key} className="rounded border border-concrete/60 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center gap-2">
        {proConBadge("−")}
        <span className="font-mono text-sm font-bold uppercase text-white">Cons</span>
      </div>
      <div className="font-body text-gray">{children}</div>
    </div>
  ),
  FeatureCards: ({ children, key }) => (
    <div key={key} className="my-6 grid gap-4 sm:grid-cols-2">
      {children}
    </div>
  ),
  FeatureCard: ({ attrs, children, key }) => (
    <div key={key} className="rounded border border-concrete/60 bg-white/5 p-5">
      <div className="mb-2 font-mono text-base font-bold uppercase text-white">
        {attrs.title ?? ""}
      </div>
      <div className="font-body text-sm text-gray">{children}</div>
    </div>
  ),
};

export const MDX_COMPONENT_NAMES = Object.keys(MDX_RENDERERS);

function renderMdxJsx(node: MdxJsxFlowElement | MdxJsxTextElement, key: string): ReactNode {
  const name = node.name ?? "";
  const attrs = extractStringAttributes(node);
  const children = renderNodes(node.children, key);

  const renderer = MDX_RENDERERS[name];
  if (renderer) return renderer({ attrs, children, key });

  if (name) {
    console.warn(`[mdx] unknown component <${name}> — rendering its children as-is`);
  }
  return <div key={key}>{children}</div>;
}

function extractStringAttributes(
  node: MdxJsxFlowElement | MdxJsxTextElement,
): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const attr of node.attributes) {
    if (attr.type !== "mdxJsxAttribute") continue;
    const { name, value } = attr;
    if (value === null || value === undefined) {
      attrs[name] = "";
    } else if (typeof value === "string") {
      attrs[name] = value;
    } else {
      console.warn(`[mdx] ignoring expression attribute "${name}" on <${node.name ?? ""}>`);
    }
  }
  return attrs;
}
