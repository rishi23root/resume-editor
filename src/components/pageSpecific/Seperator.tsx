import { cn } from "@/lib/utils";

type ptype = {
  className?: string;
};

function Seperator(props: ptype) {
  return (
    <div className={cn("my-2", props.className)}>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
    </div>
  );
}

export default Seperator;
