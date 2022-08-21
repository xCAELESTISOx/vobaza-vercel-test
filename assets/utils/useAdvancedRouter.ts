import { useRouter } from 'next/router';

export function useAdvancedRouter() {
  const router = useRouter();

  const replaceRouterQuery = (
    updateQuery: { [key: string | number]: string | number },
    exclude: (number | string)[] = [],
    scroll = false
  ) => {
    const prevQuery = { ...router.query };

    if (exclude) {
      exclude.forEach((el) => prevQuery[el] && delete prevQuery[el]);
    }

    router.replace(
      {
        query: {
          ...prevQuery,
          ...updateQuery,
        },
      },
      undefined,
      { scroll }
    );
  };

  return { router, replaceRouterQuery };
}
