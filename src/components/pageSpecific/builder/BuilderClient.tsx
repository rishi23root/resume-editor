"use client";
import PDFviewer from "@/components/elements/PDFviewer";
import { Inputs } from "@/types/builder";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormManager from "./FormElementManager";
import { DevTool } from "@hookform/devtools";

import { searchParamType } from "@/types/utils";
import { trpc } from "@/serverTRPC/client";
import { Suspense, useEffect, useState } from "react";
import RenderCompleted from "@/hooks/RenderCompleted";

export default function BuilderClient({
  searchParams,
  defaultData,
}: {
  searchParams: searchParamType;
  defaultData: Inputs;
}) {
  const isrendered = RenderCompleted();
  // console.log(defaultData.mask);

  const formHandeler = useForm<Inputs>({
    defaultValues: defaultData,
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    // update the data in the db
    // make a request for the pdf image and update the pdf image
  };

  if (!isrendered) {
    return null;
  }

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
