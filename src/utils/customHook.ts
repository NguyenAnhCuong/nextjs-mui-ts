import { useState, useEffect } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";

export const useWavesurfer = (
  containerRef: React.RefObject<HTMLDivElement>,
  options: Omit<WaveSurferOptions, "container">
) => {
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

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

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
