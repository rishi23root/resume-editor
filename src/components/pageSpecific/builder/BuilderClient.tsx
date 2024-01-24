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
import debounce from "lodash.debounce";
import {
  Suspense,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { schema } from "./schema";

const BuilderClient = memo(
  ({
    searchParams,
    defaultData,
    activeResumeInstance,
  }: {
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
  }) => {
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

    // add validation to the form and error messages to the inputs
    const formHandeler = useForm<Inputs>({
      defaultValues: defaultData,
      shouldUnregister: false,
      resolver: zodResolver(schema),
      // mode: "onSubmit",
    });

    // for first render of the pdf image rest is on request only
    useEffect(() => {
      regeneratePdfImage({
        resumeId: activeResumeInstance.id,
        templateName: searchParams.templateName as string,
      });
      // look for changes in the form
      // const timeout = setInterval(() => {
      //   // listening to new changes
      //   console.log("change listener activated ");
      //   // formHandeler.watch((value, { name, type }) => {
      //   //   // console.log(name, type);
      //   //   onSubmit(value as any);
      //   // });
      //   const current = formHandeler.getValues();
      //   // if current not equal to default then update the db
      //   console.log(compareJsonObjects(current, defaultData));
      //   // if (JSON.stringify(current) != JSON.stringify(defaultData)) {
      //   //   console.log("form updated");
      //   //   onSubmit(current);
      //   // }
      // }, 1000);
      // return () => {
      //   clearTimeout(timeout);
      // };
    }, []);

    // watch for any changes in the form
    useEffect(() => {
      let subscription: any;
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
        setPdfState("updating form");

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
        // setResumeData(dataObject);

        // validate the dict using zod
        // try {
        //   await schema.parseAsync(dataObject);
        // } catch (error) {
        //   console.log(error);
        //   // return;
        // }

        // update the data in the db
        updateDatabase.mutate({
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
      submitAction(data);
    };

    const FormManagerSubmitFnc = useCallback(
      formHandeler.handleSubmit(onSubmit),
      []
    );

    if (!isrendered) return null;
    return (
      <Suspense>
        <FormProvider {...formHandeler}>
          <FormManager onSubmit={FormManagerSubmitFnc} />
          {/* <DevTool control={formHandeler.control} /> */}
          <PDFviewer
            templateName={searchParams.templateName as string}
            enriched={activeResumeInstance.payId == 2}
            resumeId={activeResumeInstance.id}
            state={pdfState}
            generatedPDf={generatedPDf}
            searchParams={searchParams}
          />
        </FormProvider>
      </Suspense>
    );
  }
);

export default ({
  searchParams,
  defaultData,
  activeResumeInstance,
}: {
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
}) => {
  const params = useMemo(() => {
    return {
      searchParams,
      defaultData,
      activeResumeInstance,
    };
  }, [searchParams, defaultData, activeResumeInstance]);

  return <BuilderClient {...params} />;
};
