"use client";

import { Favorite } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useHasMounted } from "@/utils/customHook";

const LikeTrack = (props: any) => {
  const { track } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const hasMounted = useHasMounted();

  const [trackLikes, setTrackLikes] = useState<ITrackTop[]>([]);

  const fetchData = async () => {};

  const handleLikeTrack = () => {};

  return (
    <div
      style={{
        margin: "20px 10px 0 10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Chip
        onClick={() => {
          handleLikeTrack();
        }}
        sx={{ borderRadius: "5px" }}
        size="medium"
        variant="outlined"
        color={
          trackLikes?.some((t) => t._id === track?._id) ? "error" : "default"
        }
        clickable
        icon={<FavoriteIcon />}
        label="Like"
      />
      <div
        style={{
          display: "flex",
          width: "100px",
          gap: "20px",
          color: "#999",
          marginRight: "30px",
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <PlayArrowIcon sx={{ fontSize: "20px" }} />
          {hasMounted && track.countplay}
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <FavoriteIcon sx={{ fontSize: "20px" }} />
          {hasMounted && track.countlike}
        </span>
      </div>
    </div>
  );
};

export default LikeTrack;
