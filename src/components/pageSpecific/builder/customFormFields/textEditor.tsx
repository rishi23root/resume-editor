"use client";
import { TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import React, { useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useFormContext } from "react-hook-form";

const ListEditor = React.forwardRef<HTMLInputElement, TextareaProps>(
  ({ className, value, onChange, ...props }, ref) => {
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
        const ulElement = parsedValue.querySelector("ul")?.innerHTML;
        if (ulElement) {
          setContent(ulElement);
        } else {
          setContent(value as string);
        }
      }
    }, [value]);

    const handleChange = (e: ContentEditableEvent) => {
      let updatedValue = "<ul>" + e.target.value + "</ul>";
      setContent(e.target.value);
      setValue(props.name as any, updatedValue);
    };

    return (
      <div ref={ref} className="h-48 overflow-y-auto">
        <ContentEditable
          disabled={props.disabled}
          innerRef={editorRef}
          html={content} // Set the HTML content
          onChange={handleChange} // Handle content changes
          tagName="ul" // Allow only ul HTML element
          className={cn(
            "flex flex-col min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "list-disc list-inside h-fit",
            className
          )}
          // {...props}
        />
      </div>
    );
  }
);

export default ListEditor;
