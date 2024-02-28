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

const ListEditor = React.forwardRef<HTMLInputElement, TextareaProps>(
  ({ id, className, value, onChange, ...props }, ref) => {
    const [content, setContent] = useState<string>((value || "") as string);
    const [undoContent, setUndoContent] = useState<string>("");
    const [isHover, setIsHover] = useState(false);

    const { setValue } = useFormContext<Inputs>();
    const editorRef = useRef(null);
    const controls = useAnimation();

    useEffect(() => {
      // parset the value and get the innerHTML of the ul element
      if (value) {
        const parsedValue = new DOMParser().parseFromString(
          value as string,
          "text/html"
        );
        // const ulElementInnerHtml = parsedValue.querySelector("ul")?.innerHTML;
        // console.log("no ul element found, means only text is present or li");
        // if no ul element found, means only text is present
        const AllLiElement = parsedValue.querySelectorAll("li");
        let liElementInnerHtml = "";
        AllLiElement.forEach((liElement, index) => {
          liElementInnerHtml += `<li>${liElement.innerHTML}</li>`;
        });
        // console.log(liElementInnerHtml);
        // remove any html tags other than li and store in clean value variable
        if (liElementInnerHtml == "") {
          setContent("<li>" + value + "</li>");
        } else {
          setContent(liElementInnerHtml);
        }
      }
    }, [value]);

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

    const handleChange = (e: ContentEditableEvent) => {
      let updatedValue = "<ul>" + e.target.value + "</ul>";
      setContent(e.target.value);
      setValue(props.name as any, updatedValue);
    };

    const { isLoading, mutate } = trpc.openai.getCompletion.useMutation({
      onSuccess: (data) => {
        setUndoContent(content);
        // split the data on '-' and make them li elements
        let recomendation = data.split("\n").map((li) => {
          return `<li>${li.replace("-","")}</li>`;
        }).join(" ")
        // console.log(recomendation);
        
        setContent(recomendation);
        setValue(props.name as any, recomendation);

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
        const parsedValue = new DOMParser().parseFromString(
          content,
          "text/html"
        );
        const AllLiElement = parsedValue.querySelectorAll("li");
        let extractedText :string[] = [];
        AllLiElement.forEach((liElement) => {
          extractedText.push(liElement?.innerHTML);
        });
        
        extractedText = extractedText.map((content)=>{
          return '- ' + content
          .replace(/<[^>]*>?/gm, "")
          .replace(/\s+/g, " ")
          .replace(/&nbsp;/g, " ")
          .trim(); 
        })

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
