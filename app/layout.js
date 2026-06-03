import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CosProvider } from "./context/CosContext";
import FloatingWidgets from "./components/FloatingWidgets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zawaz Wood",
  description: "Zawaz Wood - Stative și pușculițe",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      style={{ margin: 0, padding: 0, height: "100%" }}
    >
      <body style={{ margin: 0, padding: 0, height: "100%" }}>
        <CosProvider>
          <div style={{ overflowX: "hidden" }}>
            {children}
          </div>
          <FloatingWidgets />
        </CosProvider>
      </body>
    </html>
  );
}
