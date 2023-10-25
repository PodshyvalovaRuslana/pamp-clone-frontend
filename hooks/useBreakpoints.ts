import { useState, useEffect } from "react";
import useResize from "./useResize";
import { EBreakpoint } from "../constants";

const useBreakpoints = () => {
  const [breakpoint, setBreakpoint] = useState("desktop");
  const { width } = useResize();

  useEffect(() => {
    switch (true) {
      case width < 800 && width > 600:
        setBreakpoint(EBreakpoint.TABLET);
        break;
      case width < 600:
        setBreakpoint(EBreakpoint.MOBILE);
        break;
      default:
        setBreakpoint(EBreakpoint.DESKTOP);
    }
  }, [width]);

  return { breakpoint };
};

export default useBreakpoints;
