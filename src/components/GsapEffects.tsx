"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function GsapEffects({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const setupDelay = window.setTimeout(() => {
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, scrollTriggerModule]) => {
        if (cancelled || !rootRef.current) return;

        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);

        const root = rootRef.current;
        const context = gsap.context(() => {
          const targets = gsap.utils.toArray<HTMLElement>("section, [data-gsap-reveal]");
          targets.forEach((target, index) => {
            gsap.fromTo(
              target,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.75,
                delay: index === 0 ? 0 : 0.04,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: target,
                  start: "top 82%",
                  toggleActions: "play none none reverse",
                  invalidateOnRefresh: true,
                },
              }
            );
          });

          const parallaxImages = gsap.utils.toArray<HTMLElement>("[data-gsap-parallax]");
          parallaxImages.forEach((image) => {
            gsap.to(image, {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          });
        }, root);

        ScrollTrigger.refresh();

        cleanup = () => context.revert();
      });
    }, 520);

    return () => {
      cancelled = true;
      window.clearTimeout(setupDelay);
      cleanup?.();
    };
  }, [pathname]);

  return <div ref={rootRef} className="contents">{children}</div>;
}
