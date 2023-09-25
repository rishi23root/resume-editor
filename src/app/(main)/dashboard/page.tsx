import { Button } from "@/components/ui/button";
// import { dashboardAction } from "@/utils/serverActions/pageLoad";
import { currentUser } from "@clerk/nextjs";

import Image from "next/image";

export default async function Dashboard() {
  // get userid from clerk
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  // const  user = await currentUser();
  // console.log(user?.id);
  
  // const data = await dashboardAction()
  // console.log(data);
  

  // check if user is signed in if not then redirect to login pages else redirect to dashboard
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <>
      <div className="w-3/6 glass fc">
        <Button className="gap-4 p-6 m-4 text-2xl bg-blue-600 rounded-xl fr">
          <Image
            src={"/svgs/addNew.svg"}
            height={30}
            width={30}
            alt="this is add"
          />
          New Resume
        </Button>
        <h1>this is Dashboard1</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, sequi
        est? Doloribus omnis, corporis, quibusdam quidem id minus aliquid
        repellat animi, dolor exercitationem sunt consequuntur veniam? Eius
        magnam neque eum enim delectus, assumenda reiciendis debitis commodi,
        quam deleniti, placeat tempore!
      </div>
      <div className="glass">
        <h1>this is Dashboard</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, sequi
        est? Doloribus omnis, corporis, quibusdam quidem id minus aliquid
        repellat animi, dolor exercitationem sunt consequuntur veniam? Eius
        magnam neque eum enim delectus, assumenda reiciendis debitis commodi,
        quam deleniti, placeat tempore!
      </div>
    </>
  );
}
