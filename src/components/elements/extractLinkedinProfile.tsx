"use client";
import { getLinkedinAuth } from "@/utils/linkedinUtil";
import Image from "next/image";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";
import useRedirectHandler from "@/hooks/redirectionHandlers";

const ExtractLinkedinProfile = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { urlWithAddedParams } = useRedirectHandler();

  function handleLinkedInProfileExtraction() {
    console.log("element clicked");
    // show toast that extracting linkeding profile please wait
    toast({
      type: "background",
      title: "Accessing Linkeding Profile :)",
      description: "Extracting linkeding profile please wait...",
    });
    getLinkedinAuth().then((res) => {
      if (res.hasOwnProperty("error")) {
        toast({
          variant: "destructive",
          title: "Error extracting linkedin data",
          description: res.error,
          action: (
            <ToastAction
              altText="Try other methods till"
              onClick={() => {
                const redirectUrl = urlWithAddedParams(
                  {},
                  {},
                  "/New/jsonResume"
                );
                console.log(redirectUrl);

                router.push(redirectUrl);
              }}
            >
              other Methods {"->"}
            </ToastAction>
          ),
        });
      }
    });
  }
  return (
    <div
      className="min-w-[24.5rem] h-64 overflow-hidden duration-75 shadow-2xl cursor-pointer rounded-xl glass hover:scale-105 bg-linkedin"
      onClick={handleLinkedInProfileExtraction}
    >
      <div className="w-full gap-3 fcc fc ">
        <Image
          src={"/svgs/linkedin.svg"}
          width={30}
          height={30}
          alt="linkedin.svg"
          className="w-32 h-32 left-7 top-7 drop-shadow-lg"
        />
        <div className="text-center">
          <div className="text-xl font-bold">
            Import data From your Profile{" "}
          </div>
          <div className="text-xs text-center text-white text-opacity-70">
            Our Ai will take the lead from here, you will be
            <br />
            able to update data in later phases
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractLinkedinProfile;
