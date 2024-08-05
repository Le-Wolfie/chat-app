import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

// since our backend is what creates the user (as in via a webhook, not human), we use internalMutation
// otherwise we would use externalMutation
export const create = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", args);
  },
});

export const get = internalQuery({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique(); // we know there is only one user with this clerkId
  },
});
