"use client";

import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    if (!wavesurfer) return;
    setIsPlaying(false);

    const subscription = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
    ];

    return () => {
      if (wavesurfer) {
        subscription.forEach((unsub) => unsub());
      }
    };
  }, [wavesurfer]);

  const onPlayclick = useCallback(() => {
    wavesurfer?.isPlaying() ? wavesurfer?.pause() : wavesurfer?.play();
  }, [wavesurfer]);

  return (
    <div>
      <div ref={containerRef}></div>
      <button onClick={() => onPlayclick()}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default WaveTrack;
