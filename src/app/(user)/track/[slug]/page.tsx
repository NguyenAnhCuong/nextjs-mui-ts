import WaveTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";

const DetailTrackPage = async (props: any) => {
  const { params } = props;
  //call api

  return (
    <Container>
      <WaveTrack />
    </Container>
  );
};

export default DetailTrackPage;
