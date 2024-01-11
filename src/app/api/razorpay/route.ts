import { NextRequest, NextResponse } from "next/server";

import Razorpay from "razorpay";
import shortid from "shortid";



// Path: src/app/api/trpc/razorpay/route.ts
export async function POST(request: NextRequest) {
    
    // const { taxAmt } = await request.json();
    //console.log('taxAmt',taxAmt*100)
    // Initialize razorpay object
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY as string,
        key_secret: process.env.RAZORPAY_SECRET as string,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = 10;
    const currency = "INR";
    const options = {
        amount: (amount * 100).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        console.log(response);

        return new NextResponse(JSON.stringify({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        }));
    } catch (err) {
        //console.log(err);
        return new NextResponse(JSON.stringify(err), { status: 400 });
    }
}

// export default async function handler(req, res) {
//     const { taxAmt } = req.body;
//     //console.log('taxAmt',taxAmt*100)
//     if (req.method === "POST") {
//         // Initialize razorpay object
//         const razorpay = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY,
//             key_secret: process.env.RAZORPAY_SECRET,
//         });

//         // Create an order -> generate the OrderID -> Send it to the Front-end
//         // Also, check the amount and currency on the backend (Security measure)
//         const payment_capture = 1;
//         const amount = taxAmt;
//         const currency = "INR";
//         const options = {
//             amount: (amount * 100).toString(),
//             currency,
//             receipt: shortid.generate(),
//             payment_capture,
//         };

//         try {
//             const response = await razorpay.orders.create(options);
//             res.status(200).json({
//                 id: response.id,
//                 currency: response.currency,
//                 amount: response.amount,
//             });
//         } catch (err) {
//             //console.log(err);
//             res.status(400).json(err);
//         }
//     } else {
//         // Handle any other HTTP method
//     }
// }