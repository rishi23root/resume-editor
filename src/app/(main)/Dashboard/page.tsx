import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { dashboardAction } from "@/utils/serverActions/pageLoad";
import Seperator from "@/components/pageSpecific/Seperator";
import Image from "next/image";
import Link from "next/link";
import useParamParser from "@/utils/paramHandeler";
import { PageProps } from "@/types/utils";

export default async function DashboardPage(props: PageProps) {
  const { stringifiedData, privateData } = await useParamParser(
    "/Dashboard",
    props.searchParams
  );
  console.log("from dashboard: ", stringifiedData, privateData);
  // get userid from clerk
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  // const  user = await currentUser();
  // console.log(user?.id);

  // const data = await dashboardAction()
  // console.log(data);

  // check if user is signed in if not then redirect to login pages else redirect to dashboard
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <div className="w-full gap-4 md:h-[42rem] md:fr fc">
      <div className="w-full md:w-4/12 lg:w-3/12 fc glass md:h-full h-2/6 gap-2 ">
        <Link href="/New">
          <Button
            className={cn(
              "gap-2 w-full",
              "p-4 py-6 shadow-lg rounded-xl leading-tight hover:text-black hover:shadow-zinc-500",
              "text-white text-xl md:text-sm lg:text-xl",
              "group bg-blue-600"
            )}
          >
            <Image
              src={"/svgs/addNew.svg"}
              height={30}
              width={30}
              alt="this is add"
              className="group-hover:invert"
            />
            <div className="">New Resume</div>
          </Button>
        </Link>

        <Seperator className="my-4 mb-8 " />

        <div className="fc fcc gap-4">
          <Button
            className={cn(
              "p-6 bg-transparent text-white text-xl md:text-sm lg:text-xl w-full hover:text-black",
              "border-b-2 border-zinc-700 shadow-lg hover:shadow-zinc-500 ",
              "hover:rounded-xl",
              "transition-all duration-150"
            )}
          >
            Templates
          </Button>
          <Button
            className={cn(
              "p-6 bg-transparent text-white text-xl md:text-sm lg:text-xl w-full hover:text-black",
              "border-b-2 border-zinc-700 shadow-lg hover:shadow-zinc-500 ",
              "hover:rounded-xl",
              "transition-all duration-150"
            )}
          >
            Templates
          </Button>
          <Button
            className={cn(
              "p-6 bg-transparent text-white text-xl md:text-sm lg:text-xl w-full hover:text-black",
              "border-b-2 border-zinc-700 shadow-lg hover:shadow-zinc-500 ",
              "hover:rounded-xl",
              "transition-all duration-150"
            )}
          >
            Templates
          </Button>
        </div>
      </div>
      <div className="w-full gap-4 md:h-[42rem] md:fr fc glass h-full">
        <h1>this is Dashboard</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, sequi
        est? Doloribus omnis, corporis, quibusdam quidem id minus aliquid
        repellat animi, dolor exercitationem sunt consequuntur veniam? Eius
        magnam neque eum enim delectus, assumenda reiciendis debitis commodi,
        quam deleniti, placeat tempore!
      </div>
    </div>
  );
}
