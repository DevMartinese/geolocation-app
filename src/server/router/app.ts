import { createRouter } from '../router';
import { userRouter } from './userRouter';

export const appRouter = createRouter()
  .merge('users.', userRouter);

export type AppRouter = typeof appRouter;