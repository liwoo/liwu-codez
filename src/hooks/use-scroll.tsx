import { useEffect, useState } from "react";

export default function useScroll() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", _e => {
      setScroll(window.scrollY);
    });
  }, []);

  return scroll;
}
