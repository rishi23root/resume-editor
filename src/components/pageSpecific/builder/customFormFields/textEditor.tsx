"use client";
import { TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import { Shell, Undo, Wand2, XOctagon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useFormContext } from "react-hook-form";
import { motion, stagger, useAnimation } from "framer-motion";
import { trpc } from "@/serverTRPC/client";
import { toast } from "sonner";

// higher order function to wrap element in a tag
function AddTag(tag: string) {
  return function (text: string) {
    return `<${tag}>${text}</${tag}>`;
  };
}

// a helper function which will return array of li elements and text to store in form
const parseListPara = (value: string): [string, string[]] => {
  // parseListPara will take the value which can be simple string or html string of ul and li elements
  // if simple string then convert it to li element
  // if html string then extract the li elements and store them in array
  // return the array of li elements
  const liWrapper = AddTag("li");

  value = value
    .replace(/<ul[^>]*>/g, "") // remove ul tag and its attributes
    .replace(/<\/ul>/g, "")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();
  // remove all the null spaces and other things from here

  // const parsedValue = parseFromString(value, "text/html");
  const parsedValue = new DOMParser().parseFromString(value, "text/html");

  const AllLiElement = [...parsedValue.getElementsByTagName("li")];
  if (AllLiElement.length === 0) {
    // if no li elements found then wrap the value in li element
    const addLiTag = AddTag("li");
    return [addLiTag(value), [value]];
  }
  let liElesInStr = "";
  AllLiElement.forEach((liElement) => {
    liElesInStr += liWrapper(liElement.textContent as string);
  });
  return [
    liElesInStr,
    AllLiElement.map((liEle) => liEle.textContent?.trim() as string),
  ];
};

// this code is implemented in node test env

const ListEditor = React.forwardRef<HTMLInputElement, TextareaProps>(
  ({ id, className, value, onChange, ...props }, ref) => {
    const [content, setContent] = useState<string>((value || "") as string);
    const [undoContent, setUndoContent] = useState<string>("");
    const [isHover, setIsHover] = useState(false);
    const ulWraper = AddTag("ul");
    const liWraper = AddTag("li");

    const { setValue } = useFormContext<Inputs>();
    const editorRef = useRef(null);
    const controls = useAnimation();

    useEffect(() => {
      if (isHover) {
        controls.start(
          { opacity: 1, y: 0 },
          {
            type: "spring",
            damping: 20,
            stiffness: 100,
          }
        );
      } else {
        controls.start({ opacity: 0, y: 10 });
      }
    }, [controls, isHover]);

    // first render show content
    useEffect(() => {
      if (value) {
        // console.log("[value] ", value);
        const [formLiText, formLiTextArr] = parseListPara(value as string);
        setContent(formLiText);
      }
    }, [value]);

    const handleChange = (e: ContentEditableEvent) => {
      let updatedValue = e.target.value;
      const [formLiText, formLiTextArr] = parseListPara(updatedValue as string);
      setContent(formLiText);
      setValue(props.name as any, ulWraper(formLiText));
    };

    const { isLoading, mutate } = trpc.openai.getCompletion.useMutation({
      onSuccess: (data) => {
        setUndoContent(content);
        // split the data on '-' and make them li elements
        let recomendation = data
          .split("\n")
          .map((li) => liWraper(li.replace("-", "").trim()))
          .join("");

        setContent(recomendation);
        setValue(props.name as any, ulWraper(recomendation));

        toast("data updated");
      },
      onError: (err) => {
        // console.log(err);
        toast("unable to update data here", {
          description: err.message + " | please try again later",
        });
      },
    });

    const makePredictionRequest = async () => {
      // on the basis of key and current value make request to get the predictions

      if (!content) {
        toast("No text to analyse", {
          description: "please enter some text to complete the action",
        });
        return;
      } else {
        setUndoContent(content);
        // from the existing content extract all the li text as array
        const [formLiText, formLiTextArr] = parseListPara(content as string);
        // console.log("value", formLiTextArr);
        // console.log("value", ulWraper(formLiText));
        setContent(formLiText);
        const extractedText = formLiTextArr
          .map((content) =>
            content
              .replace(/<[^>]*>?/gm, "")
              .replace(/\s+/g, " ")
              .replace(/&nbsp;/g, " ")
              .trim()
          )
          .filter((content) => content !== "")
          .map((content) => "- " + content);

        mutate({
          currentText: extractedText.join("\n"),
          keyName: props.name as string,
        });
      }
    };

    return (
      <div
        ref={ref}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={cn(
          "fc h-48 overflow-y-auto w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative",
          className
        )}
      >
        <input type="text" id={id} className="hidden" />
        {/* make button to predict and undo absolute at left bottom corner */}
        <motion.div
          animate={controls}
          className="fixed bottom-2 right-2 fr gap-2 transform translate-x-1/2 translate-y-1/2"
        >
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className={cn(
              "border rounded-md bg-blue-500/70 px-2 py-1 cursor-pointer text-md",
              "transition-transform duration-300 ease-in-out",
              "fcc gap-1"
            )}
            onClick={async () => {
              await makePredictionRequest();
              setValue(props.name as any, content);
            }}
          >
            <Wand2 size={20} />{" "}
            {isLoading ? <Shell className="animate-spin" /> : "Ai magic"}
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className={cn(
              "border rounded-md bg-blue-500/20 px-2 py-1 cursor-pointer text-md",
              "transition-transform duration-300 ease-in-out",
              "fcc gap-1"
            )}
            onClick={() => {
              // console.log('[clear]',content);

              setUndoContent(content);
              setContent("");
              setValue(props.name as any, "");
            }}
          >
            <XOctagon size={20} /> Clear
          </motion.div>
          {undoContent && (
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className={cn(
                "border rounded-md bg-blue-500/20 px-2 py-1 cursor-pointer text-md",
                "transition-transform duration-300 ease-in-out",
                "fcc gap-1"
              )}
              onClick={() => {
                // console.log('[form undo]',content, undoContent);
                setContent(undoContent);
                setUndoContent("");
                setValue(props.name as any, undoContent);
              }}
            >
              <Undo size={20} /> Undo
            </motion.div>
          )}
        </motion.div>
        <ContentEditable
          disabled={props.disabled}
          innerRef={editorRef}
          html={content} // Set the HTML content
          onChange={handleChange} // Handle content changes
          tagName="ul" // Allow only ul HTML element
          className={cn("list-disc h-full mx-2")}
          // {...props}
        />
      </div>
    );
  }
);

export default ListEditor;
