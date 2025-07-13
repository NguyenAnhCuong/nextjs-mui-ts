"use client";

import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";
import { Box, Container } from "@mui/material";
import { AppBar } from "@mui/material";
import { useHasMounted } from "@/utils/customHook";
import { useEffect, useRef } from "react";
import { useTrackContext } from "@/lib/context/track.wrapper";

const Footer = () => {
  const callApi = false;
  const hasMounted = useHasMounted();
  const playRef = useRef(null);

  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  useEffect(() => {
    // Kiểm tra trạng thái hiện tại để tránh gọi lại không cần thiết
    const handlePlayPause = async () => {
      if (currentTrack?.isPlaying) {
        //@ts-ignore
        playRef?.current?.audio?.current.play();
      } else {
        //@ts-ignore
        playRef?.current?.audio?.current.pause();
      }
    };

    handlePlayPause();
  }, [currentTrack._id, currentTrack.isPlaying]);

  if (!hasMounted) {
    return <></>; // Prevent rendering until the component has mounted
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <Container sx={{ display: "flex", gap: 10 }}>
        <AudioPlayer
          ref={playRef}
          layout="horizontal-reverse"
          style={{ boxShadow: "unset" }}
          autoPlay={false}
          volume={0.2}
          src={
            callApi
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/track/trackName.mp3`
              : `${currentTrack?.trackUrl}`
          }
          onPlay={(e) => setCurrentTrack({ ...currentTrack, isPlaying: true })}
          onPause={(e) =>
            setCurrentTrack({ ...currentTrack, isPlaying: false })
          }
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "start",
            justifyContent: "center",
            minWidth: 100,
          }}
        >
          <div style={{ color: "#f00" }}>{currentTrack?.title}</div>
          <div style={{ color: "black" }}>{currentTrack?.description}</div>
        </div>
      </Container>
    </AppBar>
  );
};

export default Footer;
