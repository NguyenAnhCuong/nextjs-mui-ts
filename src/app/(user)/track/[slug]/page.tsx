import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // const res = await sendRequest<IBackendRes<ITrackTop>>({
  //   url:`http://localhost:8000/api/v1/tracks/${slug}`,
  //   method:"GET",
  // })

  return {
    // title:res.data?.title,
    title: "this is detail page",
    openGraph: {
      title: "HOi dna it",
      description: "webasasdsa",
      type: "website",
      images: [
        "https://github.com/NguyenAnhCuong/sharing-host-files/blob/main/image/bg4.jpg?raw=true",
      ],
    },
  };
}

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
