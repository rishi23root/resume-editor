"use client";
import PDFviewer from "@/components/elements/PDFviewer";
import RenderCompleted from "@/hooks/RenderCompleted";
import { trpc } from "@/serverTRPC/client";
import { Inputs, pdfAndFromStatus } from "@/types/builder";
import { searchParamType } from "@/types/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import debounce from "lodash.debounce";
import {
  Suspense,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormManager from "./FormElementManager";
import { compareJsonObjects } from "./customFormFields/sections/utils";
import { schema } from "./schema";
// import { DevTool } from "@hookform/devtools";

// cahe the data and check for changes if change then continue
const ActionWithMemoRized = (() => {
  console.log("memorized called");

  let cache: Inputs = {} as any;

  return (data: Inputs) => {
    // console.log("cache :", Object.keys(cache).length);
    return new Promise((resolve, reject) => {
      if (_.isEmpty(cache)) {
        console.log("no cache");
        cache = _.cloneDeep(data);
        reject("cache initiated");
      } else if (compareJsonObjects(data, cache)) {
        reject("same");
      } else {
        console.log("updating object");
        cache = _.cloneDeep(data);
        resolve(data);
      }
    });
  };
})();

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
    const debounceTime = 1200; // 800 is low 1500 is high

    const isrendered = RenderCompleted();
    const [pdfState, setPdfState] = useState<pdfAndFromStatus>("idle");

    const updateDatabase = trpc.builder.updateDataByResumeId.useMutation({
      onSuccess: () => {
        setPdfState("Form updated");
        // console.log("first mutation success");
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
      onError: (err) => {
        setPdfState("error with image");
        console.log(err);
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

    // for first render only
    useEffect(() => {
      submitAction(defaultData);
    }, []);

    // handle form submit with debounce of 1 seconds
    const submitAction = useCallback(
      debounce(async (dataObject: Inputs) => {
        console.log("object submitted, checking for actual changes");
        const saveData = (
          value: Inputs | unknown
        ): void | PromiseLike<void> => {
          console.log("update data");
          setPdfState("updating form");
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
          updateDatabase.mutate({
            resumeId: activeResumeInstance.id,
            data: JSON.stringify(dataForServer),
          });
        };
        ActionWithMemoRized(dataObject).then(saveData).catch(console.log);
      }, debounceTime),
      []
    );

    const onSubmit: SubmitHandler<Inputs> | ((data: Inputs) => void) = (
      data: any
    ) => {
      if (activeResumeInstance.paymentStatus === "pending") {
        console.log("update requested, canceled, payment pending");
        return;
      } else {
        console.log("update requested");
        submitAction(data);
      }
    };

    const FormManagerSubmitFnc = useCallback(
      formHandeler.handleSubmit(onSubmit),
      [activeResumeInstance.paymentStatus]
    );

    if (!isrendered) return null;

    // /setup the form and pdf viewer size and model togel button
    return (
      <div className="h-full w-full xl:max-h-[75vh] flex gap-4 flex-col-reverse xl:flex-row">
        <FormProvider {...formHandeler}>
          <div className="flex-1 max-h-[75vh] relative">
            <FormManager onSubmit={FormManagerSubmitFnc} />
          </div>
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
      </div>
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
