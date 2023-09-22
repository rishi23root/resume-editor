// "use client";
async function getData() {
  const res = await fetch(`${process.env.BACKEND}/templates`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default async function Template() {
  // get userid from clerk
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  // const { user } = useUser();
  // console.log(userId, user);

  const data: string[] = await getData()
  console.log(data)

  // check if user is signed in if not then redirect to login pages else redirect to dashboard
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <div className="w-full">
      <div className="showcase border w-1/6 fc gap-4 p-3 h-full items-center">
        <h1 className="text-2xl">Templates</h1>
        {
          data.map(ele => {
            return (
              <div className="templateCointainer w-[70%] border h-1/4">

                <div className="template w-[70%] border h-1/4 rounded-sm">
                  {/* 
                  // image of template
                */}
                  image
                </div>
                {ele}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
