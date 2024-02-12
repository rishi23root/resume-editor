"use client";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/serverTRPC/client";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

export const MakePaymentComponent = async ({
  resumeId,
  payId,
}: {
  resumeId: string;
  payId: number;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [paymentModelVisible, setPaymentModelVisible] =
    useState<Boolean>(false);

  const { data } = trpc.price.getRazorpayOrderId.useQuery({ payId });
  const { mutate: verifyPayment } =
    trpc.price.varifyRazorpayPayment.useMutation({
      onSuccess: (data) => {
        // refresh the page
        toast({
          variant: "default",
          title: "Payment Verified ✅",
        });
        router.refresh();
      },
      onError: (err) => {
        // redirect to dashboard page
        toast({
          variant: "destructive",
          title: "payment failed",
        });
        router.push("/dashboard");
      },
      onMutate: () => {
        // show toast for updating the payment in db
        toast({
          variant: "default",
          title: "payment varification in progress",
        });
      },
    });

  const makePayment = async () => {
    if (data) {
      // console.log(data);
      var options = {
        key: data.key, // Enter the Key ID generated from the Dashboard
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
          verifyPayment({
            resumeId,
            paymentID: response.razorpay_payment_id,
            orderID: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: data.name,
          email: data.email,
        },
        // set theme color
        theme: {
          color: "#3399cc", // 12141D
        },
      };

      if (typeof window === "undefined") {
        console.log("window is not defined");
        return;
      }

      const paymentObject = new (window as any).Razorpay(options);
      setPaymentModelVisible(true);
      paymentObject.open();
    }
  };

  useEffect(() => {
    if (data && !paymentModelVisible) {
      toast({
        variant: "default",
        title: "Payment is pending",
        description: "please complete the payment to start edit the resume",
        action: (
          <ToastAction
            altText="Payment is pending"
            onClick={() => {
              makePayment();
            }}
          >
            Pay now
          </ToastAction>
        ),
      });
    }
  }, [data]);

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div
        className="absolute w-full h-full opacity-30 top-0 left-0 z-50"
        onClick={() => {
          makePayment();
        }}
      ></div>
    </>
  );
};
