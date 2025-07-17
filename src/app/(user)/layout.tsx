import Footer from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Page",
  description: "This is des",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {<AppHeader />}
      {children}
      {<Footer />}
    </>
  );
}
