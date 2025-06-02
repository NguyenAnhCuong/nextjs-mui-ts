"use client";

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      WaveSurfer.create({
        container: containerRef.current,
        waveColor: "#ddd",
        progressColor: "#f00",
        url: "/assets/audio/sample-3s.mp3",
      });
    }
  }, []);

  return (
    <div ref={containerRef}>
      <h4>Wave Track</h4>
    </div>
  );
};

export default WaveTrack;
