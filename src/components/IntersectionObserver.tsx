import React, { useRef, useCallback, useEffect, ReactElement } from "react";

type LoadMoreMarkerPropsType = {
  children?: React.ReactNode;
  onIntersect: () => void;
};

export function IntersectionObserverComponent({ children, onIntersect }: LoadMoreMarkerPropsType): ReactElement {
  const scrollRef = useRef(null);
  const scrollObserver = useCallback((node) => {
    new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0) {
          onIntersect();
        }
      });
    }).observe(node);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);

  return <div ref={scrollRef}>{children}</div>;
}
