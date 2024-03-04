import Link from "next/link";

// test for payment page here once then del it for good
export default function BlogHome() {
  return (
    <div className="m-4 p-4  lg:mx-auto lg:w-[70%]">
      <h1 className="text-3xl font-extrabold mb-4">Blogs</h1>
      <Link href={"/blog/about"}>
        <div className="glass w-1/2">About the product</div>
      </Link>
    </div>
  );
}
