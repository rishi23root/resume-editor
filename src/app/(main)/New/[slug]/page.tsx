import { type PageProps } from "@/types/utils";

export default async function NewSlugPage(props: PageProps) {
  console.log(props);

  return (
    <div className="w-full gap-8 fc fcc md:glass">
      new slugpage {props.params.slug}
    </div>
  );
}
