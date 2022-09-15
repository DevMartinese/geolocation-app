import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { createUserSchema } from '../../schema/userSchema';
import { createRouter } from '../router';
import * as trpc from '@trpc/server';
import { resolve } from 'path';

export const userRouter = createRouter()
  .mutation('createUser', {
    input: createUserSchema,
    async resolve({ ctx, input }) {
      const { username, email, password } = input;

      try {
        const user = await ctx.prisma.user.create({
          data: {
            username,
            email,
            password
          },
        });

        return user;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'User already exists',
            })
          }
        }

        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        })
      }
    }
  });