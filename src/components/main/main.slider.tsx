"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";

interface IProps {
  data: ITrackTop[];
  title: string;
}

const MainSlider = (props: IProps) => {
  const { data, title } = props;
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
              <img
                src={
                  callApi
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`
                    : track.imgUrl
                }
              />
              <h4>{track.title}</h4>
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
