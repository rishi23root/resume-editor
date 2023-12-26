// pathname: api/trpc/jobDis/{functionNameHere}
import { priceData } from "@/JSONapiData/paymentData";
import { procedure, router } from "@/serverTRPC/trpc";
import { priceDataType } from "@/types/payment";
import { z } from "zod";

export const priceRouter = router({
  all: procedure.query(() => {
    // all prices
    if (!priceData) {
      return [] as priceDataType[];
    }
    return priceData as priceDataType[];
  }),
  // get payment portal id from payId
  byId: procedure
    .input(z.object({
        payId: z.number(),
      }))
  .query((opts) => {
    // console.log('request for job title by id');
    const payId = opts.input.payId;
    const price = priceData.find((price) => price.id === payId);
    if (!price) {
      throw new Error("price not found");
    }
    return price.link;
  })
});