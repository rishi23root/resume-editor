"use client";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

// take the child element of image and wrap it in a div with overflow hidden
// take the parent element and add a mouseover event
// only on while hovering over the parent element, show the zoomed child element
// on mouseout, hide the zoomed child element
// calculate the percentage position of the cursor on the parent element x and y

export const ZoomerImage = (ImageProps: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  zoomType?: "click" | "hover" | undefined;
}) => {
  return (
    <InnerImageZoom
      className={ImageProps.className}
      src={ImageProps.src}
      zoomType={ImageProps.zoomType ? ImageProps.zoomType : "hover"}
    />
  );
};
