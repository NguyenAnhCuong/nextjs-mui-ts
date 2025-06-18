import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequestJS } from "@/utils/old.api";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const songs: ITrackTop[] = [
    // ==== CHILL ====
    {
      _id: "1",
      title: "Song 1",
      description: "Song 1 description",
      imgUrl: "assets/images/sou.jpg",
      category: "CHILL",
      trackUrl: `SoundHelix-Song-1.mp3`,
      countlike: 100,
      countplay: 1000,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2023-10-01T12:00:00Z",
      updatedAt: new Date(),
    },
    {
      _id: "2",
      title: "Song 2",
      description: "Song 2 description",
      imgUrl: "assets/images/sou.jpg",
      category: "CHILL",
      trackUrl: `SoundHelix-Song-2.mp3`,
      countlike: 120,
      countplay: 1232,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2025-06-12T12:00:00Z",
      updatedAt: new Date(),
    },
    {
      _id: "3",
      title: "Song 3",
      description: "Song 3 description",
      imgUrl: "assets/images/sou.jpg",
      category: "CHILL",
      trackUrl: "SoundHelix-Song-3.mp3",
      countlike: 76,
      countplay: 654,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2024-07-01T12:00:00Z",
      updatedAt: new Date(),
    },
    {
      _id: "6",
      title: "Song 6",
      description: "Song 6 description",
      imgUrl: "assets/images/sou.jpg",
      category: "CHILL",
      trackUrl: "SoundHelix-Song-6.mp3",
      countlike: 99,
      countplay: 888,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2024-01-01T12:00:00Z",
      updatedAt: new Date(),
    },
    {
      _id: "7",
      title: "Song 7",
      description: "Song 7 description",
      imgUrl: "assets/images/sou.jpg",
      category: "CHILL",
      trackUrl: "SoundHelix-Song-7.mp3",
      countlike: 70,
      countplay: 600,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2023-03-15T12:00:00Z",
      updatedAt: new Date(),
    },
    {
      _id: "12",
      title: "Song 12",
      description: "Song 12 description",
      imgUrl: "assets/images/sou.jpg",
      category: "CHILL",
      trackUrl: "SoundHelix-Song-12.mp3",
      countlike: 50,
      countplay: 753,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2023-05-23T12:00:00Z",
      updatedAt: new Date(),
    },

    // ==== WORKOUT ====
    {
      _id: "4",
      title: "Song 4",
      description: "Song 4 description",
      imgUrl: "assets/images/daoko.jpg",
      category: "WORKOUT",
      trackUrl: "SoundHelix-Song-4.mp3",
      countlike: 24,
      countplay: 423,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2024-08-16T12:00:00Z",
      updatedAt: new Date(),
    },
    {
      _id: "5",
      title: "Song 5",
      description: "Song 5 description",
      imgUrl: "assets/images/daoko.jpg",
      category: "WORKOUT",
      trackUrl: "SoundHelix-Song-5.mp3",
      countlike: 45,
      countplay: 765,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2024-11-23T12:00:00Z",
      updatedAt: new Date(),
    },
    {
      _id: "8",
      title: "Song 8",
      description: "Song 8 description",
      imgUrl: "assets/images/daoko.jpg",
      category: "WORKOUT",
      trackUrl: "SoundHelix-Song-8.mp3",
      countlike: 50,
      countplay: 530,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2023-12-11T12:00:00Z",
      updatedAt: new Date(),
    },
    {
      _id: "9",
      title: "Song 9",
      description: "Song 9 description",
      imgUrl: "assets/images/daoko.jpg",
      category: "WORKOUT",
      trackUrl: "SoundHelix-Song-9.mp3",
      countlike: 40,
      countplay: 600,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2024-05-21T12:00:00Z",
      updatedAt: new Date(),
    },
    {
      _id: "10",
      title: "Song 10",
      description: "Song 10 description",
      imgUrl: "assets/images/daoko.jpg",
      category: "WORKOUT",
      trackUrl: "SoundHelix-Song-10.mp3",
      countlike: 55,
      countplay: 820,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2024-10-10T12:00:00Z",
      updatedAt: new Date(),
    },
    {
      _id: "11",
      title: "Song 11",
      description: "Song 11 description",
      imgUrl: "assets/images/daoko.jpg",
      category: "WORKOUT",
      trackUrl: "SoundHelix-Song-11.mp3",
      countlike: 89,
      countplay: 242,
      uploader: {
        _id: 1,
        name: "IM ADMIN",
        email: "admin@gmail.com",
        role: "ADMIN",
        type: "SYSTEM",
      },
      isDeleted: false,
      createdAt: "2024-08-15T12:00:00Z",
      updatedAt: new Date(),
    },
  ];

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

  const chill = songs
    .filter((song) => song.category.toUpperCase() === "CHILL")
    .sort((a, b) => b.countplay - a.countplay);

  const workout = songs
    .filter((song) => song.category.toUpperCase() === "WORKOUT")
    .sort((a, b) => b.countplay - a.countplay);

  return (
    <>
      <Container sx={{ pb: 20 }}>
        <MainSlider title="Top Chill" data={chill ?? []} />
        <MainSlider title="Top Workout" data={workout ?? []} />
      </Container>
    </>
  );
}
