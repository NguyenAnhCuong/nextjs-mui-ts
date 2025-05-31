"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import {
  Category,
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from "@mui/icons-material";
import { title } from "process";

const songs: ITrackTop[] = [
  {
    _id: "1",
    title: "Song 1",
    description: "Song 1 description",
    imgUrl: "abc.png",
    category: "CHILL",
    trackUrl: "chill.mp3",
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
];

const MainSlider = () => {
  const NextArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
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
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Box
      sx={{
        margin: "0 50px",
        ".abc": {
          padding: "0 10px",
        },
        h3: {
          border: "1px solid #ccc",
          padding: "20px",
          height: "200px",
        },
      }}
    >
      <h2> Main Slider </h2>

      <Slider {...settings}>
        <div className="abc">
          <h3>1</h3>
        </div>
        <div className="abc">
          <h3>2</h3>
        </div>
        <div className="abc">
          <h3>3</h3>
        </div>
        <div className="abc">
          <h3>4</h3>
        </div>
        <div className="abc">
          <h3>5</h3>
        </div>
        <div className="abc">
          <h3>6</h3>
        </div>
      </Slider>
      <Divider />
    </Box>
  );
};
export default MainSlider;
