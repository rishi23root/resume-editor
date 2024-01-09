"use client";
import PDFviewer from "@/components/elements/PDFviewer";
import { Inputs } from "@/types/builder";
import { DevTool } from "@hookform/devtools";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormManager from "./FormElementManager";

import { zodResolver } from "@hookform/resolvers/zod";

import RenderCompleted from "@/hooks/RenderCompleted";
import { searchParamType } from "@/types/utils";
import debounce from "lodash.debounce";
import { Suspense, useCallback, useEffect, useState } from "react";
import { schema } from "./schema";

export default function BuilderClient({
  searchParams,
  defaultData,
  enrichPdf,
}: {
  searchParams: searchParamType;
  defaultData: Inputs;
  enrichPdf: boolean;
}) {
  const isrendered = RenderCompleted();
  const [pdfState, setPdfState] = useState<"idle" | "success" | "updating">(
    "idle"
  );

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

      console.log(data);
      // validate the dict using zod
      // update the data in the db
      // make a request for the pdf image and update the pdf image

      // to work on
      // 1. save the updated data in the db
      // 2. make a request to the pdf image and update the pdf image

      // id data updated succesfully

      // usesignal to update pfd query
      setPdfState("success");
      setTimeout(() => setPdfState("idle"), 1000);
    }, 5000),
    []
  );

  const onSubmit: SubmitHandler<Inputs> | ((data: Inputs) => void) = (
    data: any
  ) => {
    console.log("objct submitted");
    setPdfState("updating");
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
        <PDFviewer enriched={enrichPdf} state={pdfState} />
      </Suspense>
    </Suspense>
  );
}
