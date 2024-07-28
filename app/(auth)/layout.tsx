import { ClerkProvider } from "@clerk/nextjs";
import { raleway } from "@/app/fonts";
import "../globals.scss";
export const metadata = {
  title: "Threads",
  description: "A Meta Threads Application",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${raleway.className} authContainer`}>
          <div>
            <img src="/assets/threadsWall.png" alt="threadsWall" />
          </div>
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
