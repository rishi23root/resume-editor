"use client";
import PDFviewer from "@/components/elements/PDFviewer";
import { Inputs } from "@/types/builder";
import { SubmitHandler, useForm } from "react-hook-form";
import FormManager from "./FormElementManager";

export default function BuilderClient() {
  const formHandeler = useForm<Inputs>({
    defaultValues: {
      name: "John Doe",
      summary: "I am a software engineer, or am i",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    // update the data in the db
    // make a request for the pdf image and update the pdf image
  };

  return (
    <>
      <FormManager {...formHandeler} onSubmit={onSubmit} />
      <PDFviewer />
    </>
  );
}
