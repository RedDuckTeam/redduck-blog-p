import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NotFound } from "@/components/not-found";
import { seo } from "@/lib/seo";

import appCss from "../styles.css?url";

const getFooterTags = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { listTags } = await import("@/server/posts");
    return (await listTags()).slice(0, 6);
  } catch {
    return [];
  }
});

export const Route = createRootRoute({
  loader: async () => ({ footerTags: await getFooterTags() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...seo({
        title: "Blog | RedDuck",
        description:
          "News, insights and press releases from RedDuck — a Web3 and blockchain development studio.",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootComponent() {
  const { footerTags } = Route.useLoaderData();
  return (
    <>
      <Header />
      <Outlet />
      <Footer topTags={footerTags} />
    </>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
