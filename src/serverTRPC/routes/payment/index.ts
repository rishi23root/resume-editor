// pathname: api/trpc/jobDis/{functionNameHere}
import { priceData } from "@/JSONapiData/paymentData";
import { procedure, router } from "@/serverTRPC/trpc";
import { priceDataType } from "@/types/payment";
import { z } from "zod";
import Razorpay from "razorpay";
import shortid from "shortid";
import { currentUser } from "@clerk/nextjs";

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
    }),
  getRazorpayOrderId: procedure
    .input(z.object({ payId: z.number() }))
    .query(async (opts) => {
      const user = await currentUser();

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY as string,
        key_secret: process.env.RAZORPAY_SECRET as string,
      });
      const payId = opts.input.payId;
      const price = priceData.find((price) => price.id === payId);
      if (!price) {
        throw new Error("price not found");
      }

      // Create an order -> generate the OrderID -> Send it to the Front-end
      // Also, check the amount and currency on the backend (Security measure)
      // "Rs. "
      const amount = parseInt(price.price.split('Rs.')[1]);

      const options = {
        amount: (amount * 100).toString(),
        currency: "INR",
        receipt: shortid.generate(),
        payment_capture: 1
      };

      try {
        const response = await razorpay.orders.create(options);
        const user = await currentUser();
        let primaryAddress = user?.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress
        // console.log(response);

        return {
          id: response.id,
          currency: response.currency,
          amount: response.amount,
          name: user?.firstName + (user?.firstName ? (user?.lastName ? (' ' + user?.lastName) : "") : ''),
          email: primaryAddress ? primaryAddress as string : "",
          discription: price.description,
          imageUrl: user?.imageUrl
        }
      } catch (err) {
        //console.log(err);
        throw new Error("error in creating razorpay order");
      }
    }),
  varifyRazorpayPayment: procedure.input(z.object({
    paymentID: z.string(),
    orderID: z.string(),
    signature: z.string(),
  })).query(async (opts) => {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY as string,
      key_secret: process.env.RAZORPAY_SECRET as string,
    });
    const paymentID = opts.input.paymentID;
    const orderID = opts.input.orderID;
    const signature = opts.input.signature;
    // const expectedSignature = razorpay.utils.generateHmac(
    //   orderID + "|" + paymentID,
    //   process.env.RAZORPAY_SECRET as string
    // );
    // if (expectedSignature !== signature) {
    //   throw new Error("Invalid Payment");
    // }
    return true;
  })
});