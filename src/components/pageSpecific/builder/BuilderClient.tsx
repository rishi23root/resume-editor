"use client";
import PDFviewer from "@/components/elements/PDFviewer";
import { Inputs } from "@/types/builder";
import { DevTool } from "@hookform/devtools";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormManager from "./FormElementManager";

import { zodResolver } from "@hookform/resolvers/zod";

import RenderCompleted from "@/hooks/RenderCompleted";
import { searchParamType } from "@/types/utils";
import { Suspense, useCallback, useEffect, useState } from "react";
import { schema } from "./schema";
import debounce from "lodash.debounce";
import { compareJsonObjects } from "./customFormFields/sections/utils";

export default function BuilderClient({
  searchParams,
  defaultData,
}: {
  searchParams: searchParamType;
  defaultData: Inputs;
}) {
  const isrendered = RenderCompleted();
  const [pdfState, setPdfState] = useState<string>("");

  // add validation to the form and error messages to the inputs
  const formHandeler = useForm<Inputs>({
    defaultValues: defaultData,
    shouldUnregister: false,
    resolver: zodResolver(schema),
  });

  // watch for any changes in the form
  useEffect(() => {
    var subscription: any;
    const timeout = setTimeout(() => {
      // listening to new changes
      console.log("change listener");
      subscription = formHandeler.watch((value, { name, type }) => {
        // console.log(name, type);
        onSubmit(value as any);
      });
    }, 3000);
    return () => {
      clearTimeout(timeout);
      subscription?.unsubscribe();
    };
  }, [formHandeler.watch]);

  // handle form submit
  const submitAction = useCallback(
    debounce(async (data: Inputs) => {
      // all the main work with form data and server here

      // validate the dict using zod
      // update the data in the db
      // make a request for the pdf image and update the pdf image

      // to work on
      // - fix form submit error
      // 0. implement the redundancy for on submit function
      // 1. save the updated data in the db
      // 2. make a request to the pdf image and update the pdf image

      console.log(data);
      setPdfState("success...");
      setTimeout(() => setPdfState(""), 1000);
    }, 5000),
    []
  );

  const onSubmit: SubmitHandler<Inputs> | ((data: Inputs) => void) = (
    data: any
  ) => {
    console.log("objct submitted");
    setPdfState("updating..");
    submitAction(data);
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
          enriched={parseInt(searchParams.payId as string) == 2}
          state={pdfState}
        />
      </Suspense>
    </Suspense>
  );
}
