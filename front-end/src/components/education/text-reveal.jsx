import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LineRevealText({ selector }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = document.querySelectorAll(selector);
    const tweens = [];

    elements.forEach((el) => {
      const text = el.textContent;
      el.textContent = ""; // clear original text

      // Create a temporary container to measure line wrapping
      const temp = document.createElement("div");
      temp.style.position = "absolute";
      temp.style.visibility = "hidden";
      temp.style.width = `${el.offsetWidth}px`;
      temp.style.font = getComputedStyle(el).font;
      temp.style.lineHeight = getComputedStyle(el).lineHeight;
      temp.style.whiteSpace = "normal";
      document.body.appendChild(temp);

      // Split text into words and append to temp container
      const words = text.split(" ").map((w, i) => {
        const span = document.createElement("span");
        span.textContent = w + " "; // preserve spaces
        temp.appendChild(span);
        return span;
      });

      // Detect lines by measuring `top` positions
      const lines = [];
      let currentLine = [];
      let lastTop = null;

      words.forEach((word) => {
        const top = word.getBoundingClientRect().top;
        if (lastTop === null || Math.abs(top - lastTop) < 1) {
          currentLine.push(word.textContent);
        } else {
          lines.push(currentLine);
          currentLine = [word.textContent];
        }
        lastTop = top;
      });
      if (currentLine.length) lines.push(currentLine);

      document.body.removeChild(temp);

      // Wrap each line in a mask
      lines.forEach((lineWords) => {
        const wrapper = document.createElement("div");
        wrapper.className = "line-mask";

        const span = document.createElement("span");
        span.className = "line";
        span.textContent = lineWords.join("");
        wrapper.appendChild(span);

        el.appendChild(wrapper);
      });

      const tween = gsap.fromTo(
        el.querySelectorAll(".line"),
        { y: "100%" },
        {
          y: "0%",
          opacity: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top 80%", // when element top hits 80% of viewport
            toggleActions: "play none none none", // play once
          },
        }
      );

      tweens.push(tween);
    });

    return () => {
      // clean up created tweens and their ScrollTriggers
      tweens.forEach((t) => {
        if (t && t.scrollTrigger) t.scrollTrigger.kill();
        if (t) t.kill();
      });
      // also ensure any leftovers are removed
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [selector]);

  return null;
}
