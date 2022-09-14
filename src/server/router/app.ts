import { createRouter } from '../router';

export const appRouter = createRouter()
    .merge('users.')

export type AppRouter = typeof appRouter;