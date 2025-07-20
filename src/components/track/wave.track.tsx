"use client";

import { useHasMounted, useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import "./wave.scss";
import { PauseCircle, PlayArrow } from "@mui/icons-material";
import { Divider, Tooltip } from "@mui/material";
import { useTrackContext } from "@/lib/context/track.wrapper";
import CommentTrack from "@/components/track/comment.track";
import { faker } from "@faker-js/faker";
import LikeTrack from "@/components/track/like.track";
import Image from "next/image";

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [durationEl, setDurationEl] = useState<string>("0:00");
  const [timeEl, setTimeEl] = useState<string>("0:00");
  const hoverRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  const options = useMemo((): Omit<WaveSurferOptions, "container"> => {
    let gradient, progressGradient;

    if (typeof window !== "undefined") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
      gradient.addColorStop(0, "#fff"); // Top color
      gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#fff"); // Top color
      gradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#B1B1B1"
      ); // Bottom color
      gradient.addColorStop(1, "#B1B1B1"); // Bottom color

      // Define the progress gradient
      progressGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 1.35
      );
      progressGradient.addColorStop(0, "#EE772F"); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7) / canvas.height,
        "#EB4926"
      ); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#F6B094"
      ); // Bottom color
      progressGradient.addColorStop(1, "#F6B094"); // Bottom color
    }

    return {
      waveColor: gradient,
      progressColor: progressGradient,
      barWidth: 3,
      height: 100,
      url: `/api?audio=${fileName}`,
    };
  }, [fileName]);

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

    const hover = hoverRef.current!;
    const waveform = containerRef.current!;
    waveform.addEventListener(
      "pointermove",
      (e) => (hover.style.width = `${e.offsetX}px`)
    );

    const subscription = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("decode", (duration) => {
        setDurationEl(formatTime(duration));
      }),
      wavesurfer.on("timeupdate", (currentTime) =>
        setTimeEl(formatTime(currentTime))
      ),
      wavesurfer.on("click", () => {
        wavesurfer.play();
      }),
    ];

    return () => {
      if (wavesurfer) {
        subscription.forEach((unsub) => unsub());
      }
    };
  }, [wavesurfer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  const onPlayclick = useCallback(() => {
    wavesurfer?.isPlaying() ? wavesurfer?.pause() : wavesurfer?.play();
  }, [wavesurfer]);

  const [comments, setComments] = useState<ITrackComment[]>([]);
  const hasMounted = useHasMounted(); // custom hook kiểm tra đã mount chưa

  useEffect(() => {
    if (hasMounted) {
      setComments(
        Array.from({ length: 4 }, (_, index) => ({
          id: index + 1,
          avatar: faker.image.avatar(),
          moment: (index + 1) * 10,
          content: `This is a comment ${index + 1}`,
          user: faker.person.fullName(),
          createAt: "07/15/2025",
        }))
      );
    }
  }, [hasMounted]);

  const calLeft = (moment: number) => {
    const hardCodeDuration = 199;
    const percentage = (moment / hardCodeDuration) * 100;

    return `${percentage}%`;
  };

  const track = currentTrack;

  useEffect(() => {
    if (currentTrack.isPlaying && wavesurfer) {
      wavesurfer.pause();
    }
  }, [currentTrack]);

  useEffect(() => {
    if (track?._id && !currentTrack?._id) {
      setCurrentTrack({ ...track, isPlaying: false });
    }
  }, [track]);

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: 15,
          padding: 20,
          height: 400,
          background: "linear-gradient(135deg,rgb(88, 92, 66) 0%)",
        }}
      >
        <div
          className="left"
          style={{
            width: "75%",
            height: "calc(100% - 10px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            className="info"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div>
              <div
                style={{
                  borderRadius: "50%",
                  background: "#f50",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  onPlayclick();
                  if (wavesurfer && track) {
                    setCurrentTrack({
                      ...track,
                      isPlaying: false,
                    });
                  }
                }}
              >
                {isPlaying ? (
                  <PauseCircle sx={{ fontSize: 30, color: "white" }} />
                ) : (
                  <PlayArrow sx={{ fontSize: 30, color: "white" }} />
                )}
              </div>
            </div>
            <div style={{ marginLeft: 20 }}>
              <div
                style={{
                  fontSize: 30,
                  background: "#333",
                  padding: "0px 5px",
                  fontWeight: "bold",
                  color: "white",
                  width: "fit-content",
                }}
              >
                {fileName}
              </div>
              <div
                style={{
                  fontSize: 20,
                  background: "#333",
                  padding: "0px 5px",
                  marginTop: 5,
                  fontWeight: "bold",
                  color: "white",
                  width: "fit-content",
                }}
              >
                Eric
              </div>
            </div>
          </div>
          <div ref={containerRef} className="waveform-container">
            <div className="time">{timeEl}</div>
            <div className="duration">{durationEl}</div>
            <div className="hover-wave" ref={hoverRef}></div>
            <div
              className="overlay"
              style={{
                position: "absolute",
                bottom: 0,
                height: "30px",
                width: "100%",
                backdropFilter: "brightness(5px)",
              }}
            ></div>
            <div className="comments" style={{ position: "relative" }}>
              {comments.map((comment) => {
                return (
                  <Tooltip title={comment.content} arrow key={comment.id}>
                    <img
                      alt="wave"
                      onPointerMove={(e) => {
                        hoverRef.current!.style.width = calLeft(
                          comment.moment + 3
                        );
                      }}
                      key={comment.id}
                      style={{
                        height: 20,
                        width: 20,
                        top: 72,
                        position: "absolute",
                        zIndex: 20,
                        left: calLeft(comment.moment),
                      }}
                      src={comment.avatar}
                    />
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>
        {hasMounted && track.imgUrl ? (
          <div
            className="right"
            style={{
              width: "25%",
              alignItems: "center",
              display: "flex",
              padding: 15,
            }}
          >
            <Image
              src={`/${track.imgUrl}`}
              alt="image song"
              width={250}
              height={250}
            />
          </div>
        ) : (
          <div
            className="right"
            style={{
              width: "25%",
              height: "100%",
              background: "#ccc",
            }}
          ></div>
        )}
      </div>
      <div>
        <LikeTrack track={track} />
      </div>
      <div>
        <CommentTrack
          comments={comments}
          setComments={setComments}
          track={track}
          wavesurfer={wavesurfer!}
        />
      </div>
    </div>
  );
};

export default WaveTrack;
