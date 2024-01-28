// pathname: api/trpc/jobDis/{functionNameHere}
import { priceData } from "@/JSONapiData/paymentData";
import { procedure, router } from "@/serverTRPC/trpc";
import { priceDataType } from "@/types/payment";
import { z } from "zod";
import Razorpay from "razorpay";
import shortid from "shortid";
import { currentUser } from "@clerk/nextjs";
import crypto from "crypto"
import { prisma } from "@/lib/prisma";
const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET as string);


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

      const userId = user?.id as string;
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
        payment_capture: 1,
        notes: {
          userId: userId,
          paymentId: payId,
          paymentFor: price.title,
        }
      };

      try {
        const response = await razorpay.orders.create(options);
        let primaryAddress = user?.emailAddresses?.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress
        // console.log(response);

        return {
          id: response.id,
          currency: response.currency,
          amount: response.amount,
          name: user?.firstName + (user?.firstName ? (user?.lastName ? (' ' + user?.lastName) : "") : ''),
          email: primaryAddress ? primaryAddress as string : "",
          discription: price.description,
          imageUrl: user?.imageUrl,
          key: process.env.RAZORPAY_KEY
        }
      } catch (err) {
        //console.log(err);
        throw new Error("error in creating razorpay order");
      }
    }),

  varifyRazorpayPayment: procedure.input(z.object({
    resumeId: z.string(),
    paymentID: z.string(),
    orderID: z.string(),
    signature: z.string(),
  })).mutation(async (opts) => {
    const paymentID = opts.input.paymentID;
    const orderID = opts.input.orderID;
    const signature = opts.input.signature;

    hmac.update(orderID + "|" + paymentID);
    let expectedSignature = hmac.digest('hex');

    console.log(expectedSignature);

    if (expectedSignature !== signature) {
      throw new Error("Invalid Payment");
    }

    // update the database with the payment details
    const updated = await prisma.resumeData.update({
      where: {
        id: opts.input.resumeId
      },
      data: {
        paymentId: paymentID,
        paymentStatus: "paid"
      },
      select: {
        id: true,
        paymentId: true,
        paymentStatus: true
      }
    })
    console.log("payment added: ", updated);
    return true;
  })
});