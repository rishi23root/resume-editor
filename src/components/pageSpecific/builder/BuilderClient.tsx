"use client";
import PDFviewer from "@/components/elements/PDFviewer";
import { Inputs } from "@/types/builder";
import { SubmitHandler, useForm } from "react-hook-form";
import FormManager from "./FormElementManager";
import { searchParamType } from "@/types/utils";
import { trpc } from "@/serverTRPC/client";
import { Suspense, useEffect, useState } from "react";

export default function BuilderClient({
  searchParams,
  defaultData,
}: {
  searchParams: searchParamType;
  defaultData: Inputs;
}) {
  // console.log(defaultData);

  const formHandeler = useForm<Inputs>({
    defaultValues: defaultData,
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    // update the data in the db
    // make a request for the pdf image and update the pdf image
  };

  return (
    <Suspense>
      <FormManager {...formHandeler} onSubmit={onSubmit} />
      <PDFviewer />
    </Suspense>
  );
}
