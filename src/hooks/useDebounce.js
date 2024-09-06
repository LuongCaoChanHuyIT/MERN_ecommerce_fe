import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [valueD, setValueD] = useState("");
  useEffect(() => {
    const handle = setTimeout(() => {
      setValueD(value);
    }, delay);
    return () => {
      clearTimeout(handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return valueD;
};
