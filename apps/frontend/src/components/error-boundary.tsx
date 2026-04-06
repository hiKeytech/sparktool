import type { ErrorComponentProps } from "@tanstack/react-router";

import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";

export function ErrorBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    select: ({ id }) => id === rootRouteId,
    strict: false,
  });

  return (
    <div className="flex flex-col items-center justify-center flex-1 min-w-0 gap-6 p-4">
      <ErrorComponent error={error} />
      <div className="flex flex-wrap items-center gap-2">
        <button
          className="px-2 py-1 font-extrabold text-white uppercase bg-gray-600 rounded-sm dark:bg-gray-700"
          onClick={() => {
            router.invalidate();
          }}
        >
          Try Again
        </button>

        {isRoot ? (
          <Link
            className="px-2 py-1 font-extrabold text-white uppercase bg-gray-600 rounded-sm dark:bg-gray-700"
            to="/"
          >
            Home
          </Link>
        ) : (
          <Link
            className="px-2 py-1 font-extrabold text-white uppercase bg-gray-600 rounded-sm dark:bg-gray-700"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            to="/"
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  );
}
