import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAP(ref, config = {}) {
  useEffect(() => {
    if (!ref.current) return;

    const { targets = ref.current, from = {}, to = {}, scrollTrigger } = config;

    if (Object.keys(from).length) gsap.set(targets, from);

    const anim = gsap.to(targets, {
      ...to,
      scrollTrigger: scrollTrigger
        ? {
            trigger: scrollTrigger.trigger || ref.current,
            start: scrollTrigger.start || "top 80%",
            ...scrollTrigger,
          }
        : undefined,
    });

    return () => {
      if (anim) anim.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [ref, config]);
}
