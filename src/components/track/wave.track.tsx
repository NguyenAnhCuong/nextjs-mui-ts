"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const useWavesurfer = (containerRef: any, options: any) => {
  const [waveSurfer, setWaveSurfer] = useState<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ws = WaveSurfer.create({
        container: containerRef.current,
        ...options,
      });

      setWaveSurfer(ws);

      return () => {
        ws.destroy();
      };
    }
  }, [containerRef, options]);

  return waveSurfer;
};

const WaveTrack = (props: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");

  const options = useMemo(
    () => ({
      waveColor: "#ddd",
      progressColor: "#f00",
      url: `/api?audio=${fileName}`,
    }),
    [fileName]
  );

  const wavesurfer = useWavesurfer(containerRef, options);

  // useEffect(() => {
  //   if (containerRef.current) {
  //     WaveSurfer.create({
  //       container: containerRef.current,
  //       waveColor: "#ddd",
  //       progressColor: "#f00",
  //       url: `/api?audio=${fileName}`,
  //     });
  //   }
  // }, []);

  return (
    <div ref={containerRef}>
      <h4>Wave Track</h4>
    </div>
  );
};

export default WaveTrack;
