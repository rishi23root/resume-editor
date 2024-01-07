"use client";
import PDFviewer from "@/components/elements/PDFviewer";
import { Inputs } from "@/types/builder";
import { DevTool } from "@hookform/devtools";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormManager from "./FormElementManager";

import { zodResolver } from "@hookform/resolvers/zod";

import RenderCompleted from "@/hooks/RenderCompleted";
import { searchParamType } from "@/types/utils";
import { Suspense } from "react";
import { schema } from "./schema";

export default function BuilderClient({
  searchParams,
  defaultData,
}: {
  searchParams: searchParamType;
  defaultData: Inputs;
}) {
  const isrendered = RenderCompleted();

  // add validation to the form and error messages to the inputs
  const formHandeler = useForm<Inputs>({
    defaultValues: defaultData,
    shouldUnregister: false,
    resolver: zodResolver(schema),
  });
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // update the data in the db
    console.log(data);

    // make a request for the pdf image and update the pdf image
  };

  if (!isrendered) return null;
  return (
    <Suspense>
      <FormProvider {...formHandeler}>
        <FormManager onSubmit={formHandeler.handleSubmit(onSubmit)} />
        <DevTool control={formHandeler.control} /> {/* set up the dev tool */}
      </FormProvider>
      <PDFviewer />
    </Suspense>
  );
}
