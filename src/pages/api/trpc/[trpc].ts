import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z.object({
      text: z.string().nullish(),
    }),
    resolve({ input }) {
      return `Hello ${input.text ?? 'World'}`;
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});

