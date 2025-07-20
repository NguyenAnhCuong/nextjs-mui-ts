"use client";

import { Box, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ✅ thêm dòng này
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import WaveSurfer from "wavesurfer.js";
import { useHasMounted } from "@/utils/customHook";
import Image from "next/image";

dayjs.extend(relativeTime);

interface IComment {
  comments: ITrackComment[];
  setComments: React.Dispatch<React.SetStateAction<ITrackComment[]>>;
  track: ITrackTop | null;
  wavesurfer: WaveSurfer;
}

const CommentTrack = (props: IComment) => {
  const router = useRouter();

  const { comments, track, setComments, wavesurfer } = props;
  const [yourComment, setYourComment] = useState("");

  const { data: session } = useSession();

  const formatTime = (second: number) => {
    const min = Math.floor(second / 60);
    const secondsRemainder = Math.round(second) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${min}:${paddedSeconds}`;
  };
  const hasMounted = useHasMounted();

  const handleSubmit = () => {
    if (!yourComment.trim()) return;

    const newComment: ITrackComment = {
      id: faker.number.int(), // hoặc dùng uuid
      avatar: "/assets/images/defaultavata.png",
      user: session?.user?.email!,
      content: yourComment,
      moment: Math.floor(wavesurfer?.getCurrentTime() ?? 0), // hoặc wavesurfer.getCurrentTime()
      createAt: Date.now(),
    };

    props.setComments((prev) => [...prev, newComment]);
    setYourComment("");
  };

  const handleJumpTrack = (moment: number) => {
    if (wavesurfer) {
      const duration = wavesurfer.getDuration();
      wavesurfer.seekTo(moment / duration);
      wavesurfer.play();
    }
  };

  return (
    <div>
      <div style={{ marginTop: "50px", marginBottom: "25px" }}>
        <Box>
          {session?.user && (
            <TextField
              fullWidth
              value={yourComment}
              label="Comments"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              variant="standard"
              onChange={(e) => setYourComment(e.target.value)}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box
            sx={{
              width: "20%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            <Image
              alt="Avatar"
              src={"/assets/images/defaultavata.png"}
              height={150}
              width={150}
              style={{ borderRadius: "50%" }}
            />
            <div>{hasMounted && track?.uploader?.email}</div>
          </Box>
          <Box sx={{ width: "80%", p: 3 }}>
            {[...comments]
              .sort((a, b) => b.moment - a.moment)
              .map((comment) => {
                return (
                  <Box
                    key={comment.id}
                    sx={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "start",
                        marginBottom: "25px",
                      }}
                    >
                      <img
                        src={comment.avatar}
                        height={40}
                        width={40}
                        style={{ borderRadius: "50%" }}
                      />

                      {/* <Image
                        alt="Comment-avatar"
                        src={comment.avatar}
                        height={40}
                        width={40}
                        style={{ borderRadius: "50%" }}
                      /> */}
                      <div>
                        <Typography fontSize={13}>
                          {comment.user} at{" "}
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleJumpTrack(comment.moment)}
                          >
                            {formatTime(comment.moment)}
                          </span>
                        </Typography>
                        <div>{comment.content}</div>
                      </div>
                    </Box>
                    <Box sx={{ fontSize: "12px", color: "#999" }}>
                      {hasMounted && dayjs(comment.createAt).fromNow()}
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default CommentTrack;
