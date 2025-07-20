"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NprogressWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#3b3b39ff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NprogressWrapper;
