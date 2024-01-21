import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from './context';

const t = initTRPC.context<Context>().create();
// export const { createCallerFactory } = t;
export const router = t.router;
export const procedure = t.procedure;
export const privateProcedure = procedure.use(async (opts) => {
    const { ctx } = opts;

    // if any one of these is missing, throw an error
    if (!ctx.id || !ctx.dbId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    // console.log("protected ctx.id", ctx.id, ctx.dbId)
    return opts.next({
        ctx
    });
});