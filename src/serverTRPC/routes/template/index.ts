// pathname: api/trpc/jobDis/{functionNameHere}
import { procedure, router } from "@/serverTRPC/trpc";

export const templateRouter = router({
  all: procedure.query(async () => {
    // get all templates as array of templates from backend

    const res = await fetch(process.env.BACKEND as string + '/templates')

    if (res.status == 200) {
      const templates = await res.json()
      return templates as string[]
    } else {
      throw new Error("request failed, 500")
    }
  })
});