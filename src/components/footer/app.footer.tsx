"use client";

import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";
import { Box, Container } from "@mui/material";
import { AppBar } from "@mui/material";
import { useHasMounted } from "@/utils/customHook";

const Footer = () => {
  const hasMounted = useHasMounted();
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
          style={{ boxShadow: "unset" }}
          autoPlay={false}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
          onPlay={(e) => console.log("onPlay")}
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
          <div style={{ color: "#f00" }}>Song name</div>
          <div style={{ color: "black" }}>Whom I am</div>
        </div>
      </Container>
    </AppBar>
  );
};

export default Footer;
