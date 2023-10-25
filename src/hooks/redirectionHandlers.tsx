"use client";

import { searchParamType } from "@/types/utils";
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
    pathName: string | undefined = undefined
  ) => {
    return (
      (pathName ? pathName : pathname) + addToCurrentQuery(newSearchParams)
    );
  };

  return { urlWithAddedParams };
}

export default useRedirectHandler;
