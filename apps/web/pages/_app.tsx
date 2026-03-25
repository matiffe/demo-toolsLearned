import type { AppProps } from "next/app";
import localFont from "next/font/local";
import "../app/globals.css";

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans antialiased`}
    >
      <Component {...pageProps} />
    </div>
  );
}
