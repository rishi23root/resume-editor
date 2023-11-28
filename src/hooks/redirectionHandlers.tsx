"use client";

import { searchParamType } from "@/types/utils";
import { decodeBase64ToJSON, encodeJSONToBase64 } from "@/utils/paramHandeler";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function useRedirectHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const addToCurrentQuery = useCallback(
    (data: searchParamType) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(data).forEach(([key, value]) => params.set(key, value));
      return params.toString() ? "?" + params.toString() : "";
    },
    [searchParams]
  );

  const urlWithAddedParams = (
    newSearchParams: searchParamType,
    updatePrivate: searchParamType["_s"] = {},
    pathName: string | undefined = ""
  ) => {
    if (Object.keys(updatePrivate).length) {
      // decode the _s
      // add data and update it
      var privateData = {};
      if (searchParams.get("_s")) {
        privateData = decodeBase64ToJSON(searchParams.get("_s") as string);
        // console.log(searchParams.get("_s") || {}, privateData);
      }
      const encodedprivateData = encodeJSONToBase64({
        ...privateData,
        ...(updatePrivate as any),
      });
      newSearchParams = { ...newSearchParams, _s: encodedprivateData };
    }
    // console.log(pathName , pathname);
    return (
      (pathName?.length ? pathName : pathname) +
      addToCurrentQuery(newSearchParams)
    );
  };

  const urlWithOnlyTheseParams = (
    newSearchParams: searchParamType,
    updatePrivate: searchParamType["_s"] = {},
    pathName: string | undefined = ""
  ) => {
    if (Object.keys(updatePrivate).length) {
      const encodedprivateData = encodeJSONToBase64({
        ...(updatePrivate as any),
      });
      newSearchParams = { ...newSearchParams, _s: encodedprivateData };
    }
    return (
      (pathName?.length ? pathName : pathname) +
      addToCurrentQuery(newSearchParams)
    );
  };

  return { urlWithAddedParams, urlWithOnlyTheseParams };
}

export default useRedirectHandler;
