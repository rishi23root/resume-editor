"use client";

import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter, useSearchParams } from "next/navigation";

const ShowErrorIfany = () => {
  const { toast } = useToast();
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    // console.log(searchParams.get("error"));
    // console.log(new URLSearchParams(searchParams));

    if (searchParams.get("error")) {
      toast({
        variant: "destructive",
        title: "Error with Search parameters",
        description: searchParams.get("error"),
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              router.push("/Dashboard");
            }}
          >
            Dashboard {"->"}
          </ToastAction>
        ),
      });
    }
  }, [searchParams]);

  return null;
};

export default ShowErrorIfany;
