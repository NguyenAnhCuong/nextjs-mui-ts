import MainSlider from "@/components/main/main.slider";
import { Category } from "@mui/icons-material";
import { Container } from "@mui/material";
import { sendRequestJS } from "@/utils/old.api";
import { sendRequest } from "@/utils/api";

export default async function HomePage() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     Category: "CHILL",
  //     limit: 10,
  //   }),
  // });

  // const res = await sendRequestJS({
  //   url: "http://localhost:8000/api/songs",
  //   method: "POST",
  //   body: {
  //     Category: "CHILL",
  //     limit: 10,
  //   },
  // });
  // console.log("CHECK", res);

  // const res = await sendRequest<IBackendRes<ITrackTop[]>>({
  //   url: "http://localhost:8000/api/songs",
  //   method: "POST",
  //   body: {
  //     Category: "CHILL",
  //     limit: 10,
  //   },
  // });
  // console.log("CHECK", res.data);

  return (
    <>
      <Container>
        <MainSlider />
        <MainSlider />
        <MainSlider />
      </Container>
    </>
  );
}
