// Local mdast node types: @types/mdast is only transitive here, so a bare `import ... from "mdast"` doesn't resolve — derive from `fromMarkdown`'s return type instead.
import type { fromMarkdown } from "mdast-util-from-markdown";

export type {
  MdxJsxAttribute,
  MdxJsxFlowElement,
  MdxJsxTextElement,
} from "mdast-util-mdx-jsx";

export type Root = ReturnType<typeof fromMarkdown>;
export type RootContent = Root["children"][number];
export type Nodes = Root | RootContent;

type NodeByType<T extends string> = Extract<RootContent, { type: T }>;

export type Heading = NodeByType<"heading">;
export type Code = NodeByType<"code">;
export type List = NodeByType<"list">;
export type Table = NodeByType<"table">;

export type ListItem = List["children"][number];
export type TableRow = Table["children"][number];
export type TableCell = TableRow["children"][number];
export type AlignType = NonNullable<Table["align"]>[number];

type PhrasingContent = NodeByType<"paragraph">["children"][number];
export type Link = Extract<PhrasingContent, { type: "link" }>;
export type Image = Extract<PhrasingContent, { type: "image" }>;
