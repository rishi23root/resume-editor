"use client";
import React, { useEffect, useRef, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export function CongoBomb({ fire }: { fire: boolean }) {
  const controller = useRef();
  const [fireworksStarted, setFireworksStarted] = useState(false);

  const onInitHandler = ({ conductor }) => {
    controller.current = conductor as any;
  };

  const onShoot = () => {
    (controller.current as any)?.shoot();
  };

  useEffect(() => {
    if (fire && !fireworksStarted) {
      onShoot();
      setTimeout(() => {
        onShoot();
        onShoot();
      }, 300);
      setFireworksStarted(true);
    }
  }, [fire]);

  return <Fireworks onInit={onInitHandler} />;
}
