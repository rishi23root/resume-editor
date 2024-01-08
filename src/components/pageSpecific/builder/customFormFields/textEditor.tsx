"use client";
import { TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import React, { useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useFormContext } from "react-hook-form";

const ListEditor = React.forwardRef<HTMLInputElement, TextareaProps>(
  ({ id, className, value, onChange, ...props }, ref) => {
    const [content, setContent] = useState<string>((value || "") as string);
    const { setValue } = useFormContext<Inputs>();
    const editorRef = useRef(null);

    useEffect(() => {
      // parset the value and get the innerHTML of the ul element
      if (value) {
        const parsedValue = new DOMParser().parseFromString(
          value as string,
          "text/html"
        );
        const ulElementInnerHtml = parsedValue.querySelector("ul")?.innerHTML;
        if (ulElementInnerHtml) {
          // inner may not have any li element
          // check if li emelent is present inside the ul element and take only li element join them
          const AllLiElement = parsedValue.querySelectorAll("li");
          let liElementInnerHtml = "";
          AllLiElement.forEach((liElement, index) => {
            liElementInnerHtml += `<li>${liElement.innerHTML}</li>`;
          });
          setContent(liElementInnerHtml);
        } else {
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
      }
    }, [value]);

    const handleChange = (e: ContentEditableEvent) => {
      let updatedValue = "<ul>" + e.target.value + "</ul>";
      setContent(e.target.value);
      setValue(props.name as any, updatedValue);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "fc h-48 overflow-y-auto w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <input type="text" id={id} className="hidden" />
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
