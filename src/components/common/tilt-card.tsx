"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type TiltCardProps = PropsWithChildren<{
  className?: string;
}>;

export function TiltCard({ className, children }: TiltCardProps) {
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg)");

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const rotateY = ((x / rect.width) * 2 - 1) * 4;
    const rotateX = (1 - (y / rect.height) * 2) * 4;
    setTransform(`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  return (
    <div
      className={cn("transition-transform duration-200 will-change-transform", className)}
      onMouseMove={handleMove}
      onMouseLeave={() =>
        setTransform("perspective(900px) rotateX(0deg) rotateY(0deg)")
      }
      style={{ transform }}
    >
      {children}
    </div>
  );
}
