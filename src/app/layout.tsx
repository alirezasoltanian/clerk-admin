// import Sidebar from "@/components/Sidebar";
import "./globals.css";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { getUser } from "./_actions/auth";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

// import Navbar from "@/components/Navbar";
// import { Inter } from 'next/font/google'
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
// import PermanentLayout from "@/components/PermanentLayout";
// import { CartSheet } from "@/components/cart/cart-sheet";
// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../../public/assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInformation = (await getUser()).user;
  console.log(userInformation);

  return (
    <html lang='en'>
      <body
        className={cn(
          "min-h-screen  font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
     
        <div className='  overflow-x-hidden'>
          <div className='min-h-[100vh] '>{children}</div>

          <Toaster />
          <TailwindIndicator />
        </div>
      </body>
    </html>
  );
}
