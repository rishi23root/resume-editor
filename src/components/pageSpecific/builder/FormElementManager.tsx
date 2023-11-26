"use client";

import { trpc } from "@/serverTRPC/client";

function FormManager() {
  const { data } = trpc.hello.useQuery();
  // console.log(data);

  return <div className="border glass">{data}</div>;
}

export default FormManager;
