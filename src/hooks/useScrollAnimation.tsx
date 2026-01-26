import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: "fade-in" | "fade-in-left" | "fade-in-right" | "slide-up" | "fade-in-scale" | "bounce-in";
  delay?: number;
  className?: string;
  threshold?: number;
}

export const ScrollAnimation = ({
  children,
  animation = "fade-in",
  delay = 0,
  className = "",
  threshold = 0.1,
}: ScrollAnimationProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const animationClass = {
    "fade-in": "animate-fade-in",
    "fade-in-left": "animate-fade-in-left",
    "fade-in-right": "animate-fade-in-right",
    "slide-up": "animate-slide-up",
    "fade-in-scale": "animate-fade-in-scale",
    "bounce-in": "animate-bounce-in",
  }[animation];

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClass : "opacity-0"}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default useScrollAnimation;
