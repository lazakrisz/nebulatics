import { getURLFromRedirectError } from "next/dist/client/components/redirect";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { connection } from "next/server";

interface Authentication {
  (): Promise<void>;
}

interface DashboardPageProps {
  /**
   * The authentication function to call to check if the user is authenticated.
   *
   * @default undefined
   */
  authentication?: Authentication;
  /**
   * The base path of the dashboard page.
   *
   * @default "/backstage"
   */
  basePath?: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface DashboardPageComponentProps {
  params: Promise<object>;
  searchParams: Promise<SearchParams>;
}

/**
 * Nebulatics' Dashboard component.
 *
 * @param props - Configuration for the dashboard page. Including an optional
 *   authentication function, which will be called to check if the user is
 *   authenticated.
 * @returns A React Server Component that will render the dashboard page.
 */
export function DashboardPage({
  authentication,
  basePath = "/backstage",
}: DashboardPageProps) {
  // A curried function that will return the actual dashboard page.
  return async function DashboardPageComponent({
    params,
    searchParams,
  }: DashboardPageComponentProps) {
    await connection();

    // Check if the client has provided an authentication function.
    if (authentication) {
      try {
        await authentication();
      } catch (error) {
        if (isRedirectError(error)) {
          const url = getURLFromRedirectError(error);
          redirect(url);
        }

        throw error;
      }
    }

    const pageParams = (await params) || {};
    const pageSearchParams = (await searchParams) || {};
    const normalizedBasePath = basePath.replace(/^\//, "");
    const pathname =
      normalizedBasePath in pageParams
        ? (pageParams as any)?.[normalizedBasePath]?.join("/") || "/"
        : "/";

    // todo: we need some kind of routing system here to handle the pathname and the search params

    switch (pathname) {
      case "/":
        return <div>Dashboard</div>;
      default:
        return <div>Dashboard {pathname}</div>;
    }
  };
}
