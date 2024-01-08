import { ZoomerImage } from "@/components/custom/ImageMagnify";

export default function test() {
  return (
    <div className="flex border p-2 m-auto w-1/3 h-[50em]">
      <ZoomerImage
        src={"/exampleR/twoColumn.jpg"}
        alt="testing image"
        width={500}
        height={500}
      />
    </div>
  );
}
