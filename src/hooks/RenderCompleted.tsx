import { useEffect, useState } from "react";

function RenderCompleted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return mounted;
}

export default RenderCompleted;
