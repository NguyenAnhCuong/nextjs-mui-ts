import ProfileTracks from "@/components/profile/profile.track";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  // Fake data
  const data = {
    data: {
      result: [
        {
          _id: "1",
          title: "Lofi Chill Beat",
          description: "A relaxing lofi beat to study and chill.",
          imgUrl: "/assets/images/daoko.jpg",
          category: "Lofi",
          trackName: "SoundHelix-Song-1.mp3",
          trackUrl: `${process.env.NEXT_PUBLIC_AUDIO_URL}/SoundHelix-Song-1.mp3`,
          countlike: 120,
          countplay: 950,
          uploader: {
            _id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "user",
            type: "artist",
          },
          isDeleted: false,
          isPlaying: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: "2",
          title: "Trap Vibes",
          description: "Hard-hitting trap beat.",
          imgUrl: "/assets/images/sou.jpg",
          category: "Trap",
          trackName: "SoundHelix-Song-2.mp3",
          trackUrl: `${process.env.NEXT_PUBLIC_AUDIO_URL}/SoundHelix-Song-2.mp3`,
          countlike: 88,
          countplay: 670,
          uploader: {
            _id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "user",
            type: "artist",
          },
          isDeleted: false,
          isPlaying: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: "3",
          title: "Jazz Lounge",
          description: "Smooth jazz for relaxing evenings.",
          imgUrl: "/assets/images/sou.jpg",
          category: "Jazz",
          trackName: "SoundHelix-Song-3.mp3",
          trackUrl: `${process.env.NEXT_PUBLIC_AUDIO_URL}/SoundHelix-Song-3.mp3`,
          countlike: 210,
          countplay: 1023,
          uploader: {
            _id: 2,
            name: "Alice Smith",
            email: "alice@example.com",
            role: "user",
            type: "musician",
          },
          isDeleted: false,
          isPlaying: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: "4",
          title: "Hip Hop Flow",
          description: "Underground hip hop instrumental.",
          imgUrl: "/assets/images/daoko.jpg",
          category: "Hip Hop",
          trackName: "SoundHelix-Song-4.mp3",
          trackUrl: `${process.env.NEXT_PUBLIC_AUDIO_URL}/SoundHelix-Song-4.mp3`,
          countlike: 310,
          countplay: 2201,
          uploader: {
            _id: 3,
            name: "Mike Rapper",
            email: "mike@example.com",
            role: "user",
            type: "rapper",
          },
          isDeleted: false,
          isPlaying: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: "5",
          title: "Ambient Dreams",
          description: "Dreamy ambient soundscape.",
          imgUrl: "/assets/images/sou.jpg",
          category: "Ambient",
          trackName: "SoundHelix-Song-6.mp3",
          trackUrl: `${process.env.NEXT_PUBLIC_AUDIO_URL}/SoundHelix-Song-6.mp3`,
          countlike: 134,
          countplay: 815,
          uploader: {
            _id: 4,
            name: "Dream Maker",
            email: "dream@example.com",
            role: "user",
            type: "composer",
          },
          isDeleted: false,
          isPlaying: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  };

  //@ts-ignore
  const d = data?.data?.result ?? [];

  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={5}>
        {d.map((item: any, index: number) => {
          return (
            <Grid item xs={12} md={6} key={index}>
              <ProfileTracks data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
