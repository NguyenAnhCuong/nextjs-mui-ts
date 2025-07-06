"use client";

import { createContext, useContext, useState } from "react";

export const TrackContext = createContext<ITrackContext | null>(null);

export const TrackContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const init = {
    _id: "",
    title: "",
    description: "",
    imgUrl: "",
    category: "",
    trackUrl: "",
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
  const [currentTrack, setCurrentTrack] = useState<IShareTrack>(init);

  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => useContext(TrackContext);
