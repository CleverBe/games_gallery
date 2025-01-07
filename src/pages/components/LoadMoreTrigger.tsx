import { useEffect, useRef } from "react";

export const LoadMoreTrigger = ({
  fetchNextPage,
}: {
  fetchNextPage: () => void;
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (triggerRef.current) observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage]);

  return <div ref={triggerRef} style={{ height: "20px" }} />;
};
