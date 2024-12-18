import { Poppins } from "next/font/google";
import "../public/styles/globals.css";
import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Lookingfor",
  description: "Job search made easy with Lookingfor 🚀",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/looglingforlogo.png" />
      </head>
      <body className={poppins.className}>
        <Provider>
          <Navbar />
          <Toaster position="top-center" />
          {children}
        </Provider>
      </body>
    </html>
  );
}
