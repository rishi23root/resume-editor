"use client";
import PDFviewer from "@/components/elements/PDFviewer";
import { Inputs, pdfAndFromStatus } from "@/types/builder";
import { DevTool } from "@hookform/devtools";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormManager from "./FormElementManager";

import { zodResolver } from "@hookform/resolvers/zod";

import RenderCompleted from "@/hooks/RenderCompleted";
import { trpc } from "@/serverTRPC/client";
import { searchParamType } from "@/types/utils";
import { useQueryClient } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { Suspense, useCallback, useEffect, useState } from "react";
import { schema } from "./schema";

export default function BuilderClient({
  userId,
  searchParams,
  defaultData,
  activeResumeInstance,
}: {
  userId: string;
  searchParams: searchParamType;
  defaultData: Inputs;
  activeResumeInstance: {
    id: string;
    payId: number;
    jobId: number;
    paymentId: string;
    paymentStatus: string;
    createdAt?: string;
  };
}) {
  const debounceTime = 1500;
  const isrendered = RenderCompleted();
  const [pdfState, setPdfState] = useState<pdfAndFromStatus>("idle");

  const updateDatabase = trpc.builder.updateDataByResumeId.useMutation({
    onSuccess: () => {
      setPdfState("Form updated");
      // console.log("first mutation success");
      // queryClient.invalidateQueries("builder.generatePDF" as any);
      regeneratePdfImage({
        resumeId: activeResumeInstance.id,
        templateName: searchParams.templateName as string,
      });
    },
    onError: () => {
      setPdfState("error with form");
    },
    onMutate: () => {
      setPdfState("updating form");
    },
  });

  // genetate the pdf mutation
  const generatedPDf = trpc.builder.generatePDF.useMutation({
    onSuccess: () => {
      // console.log(data.images);
      setPdfState("Image updated");
      setTimeout(() => setPdfState("success"), 500);
      setTimeout(() => setPdfState("idle"), 1000);
    },
    onError: () => {
      setPdfState("error with image");
    },
    onMutate: () => {
      setPdfState("fetching image");
    },
  });

  const { mutate: regeneratePdfImage } = generatedPDf;

  // for first render of the pdf image rest is on request only
  useEffect(() => {
    regeneratePdfImage({
      resumeId: activeResumeInstance.id,
      templateName: searchParams.templateName as string,
    });
  }, []);

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
      console.log("change listener activated ");
      subscription = formHandeler.watch((value, { name, type }) => {
        // console.log(name, type);
        onSubmit(value as any);
      });
    }, 5000);
    return () => {
      clearTimeout(timeout);
      subscription?.unsubscribe();
    };
  }, [formHandeler.watch]);

  // handle form submit with debounce of 1 seconds
  const submitAction = useCallback(
    debounce(async (dataObject: Inputs) => {
      // all the main work with form data and server here
      // updating the data for backend

      const dataForServer = {
        ...dataObject,
        work: dataObject.work.map((work) => {
          return {
            ...work,
            endDate: work.isWorkingHere ? null : work.endDate,
          };
        }),
        education: dataObject.education.map((education) => {
          return {
            ...education,
            endDate: education.isStudyingHere ? null : education.endDate,
          };
        }),
      };

      // validate the dict using zod
      // try {
      //   await schema.parseAsync(dataObject);
      // } catch (error) {
      //   console.log(error);
      //   // return;
      // }

      // update the data in the db
      const updatedReturn = updateDatabase.mutate({
        resumeId: activeResumeInstance.id,
        data: JSON.stringify(dataForServer),
      });
    }, debounceTime),
    []
  );

  const onSubmit: SubmitHandler<Inputs> | ((data: Inputs) => void) = (
    data: any
  ) => {
    console.log("objct submitted");
    setPdfState("updating form");
    submitAction(data);
  };

  if (!isrendered) return null;
  return (
    <Suspense>
      {/* <Suspense>
        <FormProvider {...formHandeler}>
          <FormManager onSubmit={formHandeler.handleSubmit(onSubmit)} />
          <DevTool control={formHandeler.control} />
        </FormProvider>
      </Suspense> */}
      <Suspense>
        <PDFviewer
          templateName={searchParams.templateName as string}
          enriched={activeResumeInstance.payId == 2}
          resumeId={activeResumeInstance.id}
          state={pdfState}
          generatedPDf={generatedPDf}
        />
      </Suspense>
    </Suspense>
  );
}
