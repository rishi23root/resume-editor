import { appRouter } from "@/serverTRPC/routes";
import { createContext } from "./context";

export const serverAPI = appRouter.createCaller({
  id: "1",
  dbId: "1",
});