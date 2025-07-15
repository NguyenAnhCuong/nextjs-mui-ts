"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const TrackContext = createContext<ITrackContext | null>(null);

export const TrackContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const init: IShareTrack = {
    _id: "",
    title: "",
    description: "",
    imgUrl: "",
    category: "",
    trackUrl: "",
    trackName: "",
    countlike: 0,
    countplay: 0,
    uploader: {
      _id: 0,
      name: "",
      email: "",
      role: "",
      type: "",
    },
    isDeleted: false,
    createdAt: "",
    updatedAt: "",
    isPlaying: false,
  };

  // ✅ Lấy từ localStorage nếu có
  const [currentTrack, setCurrentTrack] = useState<IShareTrack>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("currentTrack");
      if (saved) return JSON.parse(saved);
    }
    return init;
  });

  // ✅ Lưu lại mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("currentTrack", JSON.stringify(currentTrack));
  }, [currentTrack]);

  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => useContext(TrackContext);
