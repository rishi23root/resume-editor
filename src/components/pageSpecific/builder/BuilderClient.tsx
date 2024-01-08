"use client";
import PDFviewer from "@/components/elements/PDFviewer";
import { Inputs } from "@/types/builder";
import { DevTool } from "@hookform/devtools";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormManager from "./FormElementManager";

import { zodResolver } from "@hookform/resolvers/zod";

import RenderCompleted from "@/hooks/RenderCompleted";
import { searchParamType } from "@/types/utils";
import { Suspense, useEffect, useState } from "react";
import { schema } from "./schema";

export default function BuilderClient({
  searchParams,
  defaultData,
}: {
  searchParams: searchParamType;
  defaultData: Inputs;
}) {
  const isrendered = RenderCompleted();
  var ToSubmit = false;
  // to work on
  // - fix form submit error
  // 0. implement the redundancy for on submit function
  // 1. save the updated data in the db
  // 2. make a request to the pdf image and update the pdf image

  // make update every 3 seconds it is possible to update the form
  useEffect(() => {
    // console.log("tosubmt set to ", !toSubmit);
    // console.log(toSubmit);
    const timer = setInterval(() => {
      ToSubmit = true;
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // add validation to the form and error messages to the inputs
  const formHandeler = useForm<Inputs>({
    defaultValues: defaultData,
    shouldUnregister: false,
    resolver: zodResolver(schema),
  });

  // watch for any changes in the form
  useEffect(() => {
    const subscription = formHandeler.watch((value, { name, type }) => {
      onSubmit(value as any);
    });
    return () => subscription.unsubscribe();
  }, [formHandeler.watch]);

  const onSubmit: SubmitHandler<Inputs> | ((data: Inputs) => void) = (
    data: any
  ) => {
    console.log("change detected");
    console.log("change:", ToSubmit);
    if (!ToSubmit) return;
    // update the data in the db
    // console.log(data);
    // make a request for the pdf image and update the pdf image
  };

  if (!isrendered) return null;
  return (
    <Suspense>
      <FormProvider {...formHandeler}>
        <FormManager onSubmit={formHandeler.handleSubmit(onSubmit)} />
        <DevTool control={formHandeler.control} /> {/* set up the dev tool */}
      </FormProvider>
      <Suspense>
        <PDFviewer
          // if payment is not basic
          enriched={parseInt(searchParams.payId as string) == 2}
        />
      </Suspense>
    </Suspense>
  );
}
