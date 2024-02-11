import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const makeEmptyObject = (obj: any): any => {
  const data = Object.fromEntries(
    Object.entries({ ...obj })
      .map((arr) => {
        // console.log(typeof arr[1],Array.isArray(arr[1]),arr[1])

        if (Array.isArray(arr[1])) {
          // take first element and make it empty
          // check for type
          if (typeof arr[1][0] === "object") {
            return [arr[0], [makeEmptyObject(arr[1][0])]];
          }
          // may need to update these in future
          else if (typeof arr[1][0] === "number") {
            return [arr[0], []];
          } else if (typeof arr[1][0] === "boolean") {
            return [arr[0], []];
          } else if (typeof arr[1][0] === "string") {
            return [arr[0], []];
          }
          // leaving the posibility of nested array
          // } else if (typeof arr[1][0] === "") {
          //   return [arr[0], []];
          return [arr[0], [makeEmptyObject(arr[1][0])]];
        } else if (typeof arr[1] === "object") {
          return [arr[0], makeEmptyObject(arr[1])];
        } else if (typeof arr[1] === "number") {
          return [arr[0], 0];
        } else if (typeof arr[1] === "boolean") {
          return [arr[0], false];
        } else {
          // if (typeof arr[1] === "string") {
          return [arr[0], ""];
        }
        // return [arr[0], typeof arr[1] === "boolean" ? false : ""];
      })
    // .filter(([key, val]) => key !== "id")
  );
  return data;
};
