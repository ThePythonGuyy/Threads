import type { Metadata } from "next";
import "../globals.scss";
import { inter } from "../fonts";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/Components/shared/Topbar";
import LeftSidebar from "@/Components/shared/LeftSidebar";
import RightSidebar from "@/Components/shared/RightSidebar";
import Bottombar from "@/Components/shared/Bottombar";
import { dark } from "@clerk/themes";
export const metadata = {
  title: "Threads",
  description: "A Meta Threads Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Topbar />

          <main className="root-container">
            <LeftSidebar />

            <section className="main-container">
              <div className="main-container-children">{children}</div>
            </section>

            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
