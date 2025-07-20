"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useTrackContext } from "@/lib/context/track.wrapper";
import { convertSlugUrl } from "@/utils/api";
import Image from "next/image";

interface IProps {
  data: ITrackTop[];
  title: string;
}

const MainSlider = (props: IProps) => {
  const { data, title } = props;
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  const callApi = false;

  const NextArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: 25,
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRightOutlined />
      </Button>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeftOutlined />
      </Button>
    );
  };

  const settings: Settings = {
    dots: false,
    infinite: data.length > 5,
    speed: 500,
    slidesToShow: Math.min(5, data.length),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const resolveImageUrl = (imgUrl: string, callApi: boolean) => {
    if (callApi) {
      return `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${imgUrl}`;
    }

    // Nếu imgUrl bắt đầu bằng / thì giữ nguyên
    if (imgUrl.startsWith("/")) return imgUrl;

    // Nếu imgUrl bị lỗi //assets/... thì loại bớt dấu /
    return "/" + imgUrl.replace(/^\/+/, "");
  };

  return (
    <Box
      sx={{
        margin: "0 50px",
        ".tracks": {
          padding: "0 10px",
          img: {
            height: "150px",
            width: "150px",
          },
        },
        h3: {
          border: "1px solid #ccc",
          padding: "20px",
          height: "200px",
        },
      }}
    >
      <h2> {title} </h2>

      <Slider {...settings}>
        {data.map((track) => {
          return (
            <div className="tracks" key={track._id}>
              {/* <img
                src={
                  callApi
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`
                    : track.imgUrl
                }
              /> */}

              <Box
                sx={{
                  position: "relative",
                  width: "150px",
                  height: "150px",
                }}
              >
                <Image
                  alt="SC Image"
                  src={resolveImageUrl(track.imgUrl, callApi)}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Link
                href={`/track/${convertSlugUrl(track.title)}-${
                  track._id
                }.html?audio=${track.trackName}`}
                onClick={() => setCurrentTrack({ ...track, isPlaying: false })}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h4>{track.title}</h4>
              </Link>

              <h5>{track.description}</h5>
            </div>
          );
        })}
      </Slider>
      <Divider />
    </Box>
  );
};
export default MainSlider;
