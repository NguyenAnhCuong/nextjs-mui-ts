import { Box, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ✅ thêm dòng này
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

dayjs.extend(relativeTime);

interface IComment {
  comments: ITrackComment[];
  track: ITrackTop | null;
}

const CommentTrack = (props: IComment) => {
  const router = useRouter();

  const { comments, track } = props;
  const [yourComment, setYourComment] = useState("");

  const { data: session } = useSession();

  const formatTime = (second: number) => {
    const min = Math.floor(second / 60);
    const secondsRemainder = Math.round(second) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${min}:${paddedSeconds}`;
  };

  const handleSubmit = () => {
    console.log(yourComment);
  };
  return (
    <div>
      <div style={{ marginTop: "50px", marginBottom: "25px" }}>
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{
              width: "20%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            <img
              src={"/assets/images/defaultavata.png"}
              height={150}
              width={150}
              style={{ borderRadius: "50%" }}
            />
            <div>{track?.uploader?.email}</div>
          </Box>
          <Box sx={{ width: "80%", p: 3 }}>
            {comments?.map((comment) => {
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
                    <div>
                      <Typography fontSize={13}>{comment.user}</Typography>
                      <div>{comment.content}</div>
                    </div>
                  </Box>
                  <Box sx={{ fontSize: "12px", color: "#999" }}>
                    {dayjs(comment.moment).fromNow()}
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
