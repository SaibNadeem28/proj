import { z } from 'zod';
import { Db } from 'mongodb';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createUserMutation, updateNameMutation, getLatestPostQuery } from "~/server/api/functions/post";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), email: z.string().email() })) 
    .mutation(async ({ input, ctx }) => {
      // Simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const db: Db = ctx.db;

      const newUser = await createUserMutation(db, input);
      return newUser;
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const db: Db = ctx.db;

    const latestPost = await getLatestPostQuery(db);
    return latestPost;
  }),

  anotherTask: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `AOA ${input.text}`,
      };
    }),

  updateName: publicProcedure
    .input(z.object({ newName: z.string().min(1) })) 
    .mutation(async ({ input, ctx }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const db: Db = ctx.db;
      
      const postId = ;

      await updateNameMutation(db, postId, input.newName);
      
      const updatedPost = await getLatestPostQuery(db);
      return updatedPost;
    }),

  getLatestpost: publicProcedure.query(async ({ ctx }) => {
    const db: Db = ctx.db;

    const latestPost = await getLatestPostQuery(db);
    return latestPost;
  }),
});
