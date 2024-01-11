"use client";

import RenderCompleted from "@/hooks/RenderCompleted";
import { trpc } from "@/serverTRPC/client";
import { currentUser } from "@clerk/nextjs";
import { useEffect } from "react";

const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

// const makePayment = async (payId: number) => {
// };

export const MakePaymentComponent = async ({ payId }: { payId: number }) => {
  const isrendered = RenderCompleted();
  const { data } = trpc.price.getRazorpayOrderId.useQuery({ payId });
  useEffect(() => {
    isrendered &&
      initializeRazorpay().then((res) => {
        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }
        if (data) {
          // console.log(data);
          var options = {
            key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            name: data.name,
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: data.discription,
            image: data.imageUrl,
            handler: (response: {
              razorpay_payment_id: any;
              razorpay_order_id: any;
              razorpay_signature: any;
            }) => {
              // Validate payment at server - using webhooks is a better idea.
              alert(response.razorpay_payment_id);
              alert(response.razorpay_order_id);
              alert(response.razorpay_signature);
            },
            prefill: {
              name: data.name,
              email: data.email,
            },
          };

          if (typeof window === "undefined") {
            return;
          }

          const paymentObject = new (window as any).Razorpay(options);
          paymentObject.open();
        }
      });
  }, [data]);
  return <></>;
};
