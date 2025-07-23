import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import slugify from "slugify";

import type { Metadata, ResolvingMetadata } from "next";
import next from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const temp = params?.slug?.split(".html") ?? [];
  const temp1 = (temp[0]?.split("-") ?? []) as string[];
  const id = temp1[temp1.length - 1];

  // const res = await sendRequest<IBackendRes<ITrackTop>>({
  //   url:`http://localhost:8000/api/v1/tracks/${id}`,
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

export async function generateStaticParams() {
  return [{ slug: "song-1-1.html" }, { slug: "song-2-2.html" }];
}

const DetailTrackPage = async (props: any) => {
  const { params } = props;

  const temp = params?.slug?.split(".html") ?? [];
  const temp1 = (temp[0]?.split("-") ?? []) as string[];
  const id = temp1[temp1.length - 1];

  //call api
  // const res = await sendRequest<IBackendRes<ITrackTop>>({
  //   url: `http://localhost:8000/api/v1/tracks/${id}`,
  //   method: "GET",
  //   nextOption: {
  //     // cache: "no-store",
  //     next: { tags: ["track-by-id"] },
  //   },
  // });

  // const res = await sendRequest<IBackendRes<ITrackTop>>({
  //   url: `http://localhost:8000/api/v1/tracks/comments`,
  //   method: "POST",
  //   queryParams:{
  //     current:1,
  //     pageSize:100,
  //     trackId:id,
  //     sort:"-createAt"
  //   }
  // });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <Container>
      <WaveTrack />
    </Container>
  );
};

export default DetailTrackPage;
