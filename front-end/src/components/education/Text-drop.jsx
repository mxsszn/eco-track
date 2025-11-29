import { useRef, useLayoutEffect, useState } from "react";
import SplitType from "split-type";
import { useGSAP } from "./useGSAP";
import "./edu-styles.css";

export default function TextDrop({ children, className = "" }) {
  const wrapper = useRef(null);
  const [lines, setLines] = useState([]);

  useLayoutEffect(() => {
    if (!wrapper.current) return;

    const run = async () => {
      if (document.fonts?.ready) await document.fonts.ready;

      const split = new SplitType(wrapper.current, { types: "lines" });
      const inners = [];

      split.lines.forEach((line) => {
        line.style.display = "block";
        line.style.overflow = "hidden";

        const inner = document.createElement("span");
        inner.className = "line-inner";
        inner.style.display = "inline-block";
        inner.style.willChange = "transform";
        inner.innerHTML = line.innerHTML;

        line.innerHTML = "";
        line.appendChild(inner);

        inners.push(inner);
      });

      setLines(inners);

      return () => split.revert();
    };

    run();
  }, [children]);

  // Animate using useGSAP
  useGSAP(wrapper, {
    targets: lines,
    from: { yPercent: 100, opacity: 0 },
    to: {
      yPercent: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
    },
    scrollTrigger: { trigger: wrapper.current, start: "top 80%" },
  });

  return (
    <div className={`drop-wrapper ${className}`} ref={wrapper}>
      {children}
    </div>
  );
}
