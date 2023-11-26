"use client";

import { trpc } from "@/app/_trpc/client";

function TrpcTEST() {
  const { data } = trpc.hello.useQuery();
  // console.log(data);

  return <div className="border glass">{data}</div>;
}

export default TrpcTEST;
