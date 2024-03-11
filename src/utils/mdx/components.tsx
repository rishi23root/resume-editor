import Image from "next/image";

export const customImage = (props: any) => {
  return (
    <Image
      {...props}
      className="w-full rounded-xl shadow-lg animate-fadeEntry"
      width={800}
      height={800}
    />
  );
};
