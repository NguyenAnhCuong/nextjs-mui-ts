import ThemeRegistry from "@/components/theme-registry/theme.registry";
import { TrackContextProvider } from "@/lib/context/track.wrapper";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import NprogressWrapper from "@/lib/nprogress.wrapper";
import { ToastProvider } from "@/utils/toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NprogressWrapper>
            <NextAuthWrapper>
              <ToastProvider>
                <TrackContextProvider>{children}</TrackContextProvider>
              </ToastProvider>
            </NextAuthWrapper>
          </NprogressWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
