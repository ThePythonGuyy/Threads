import { ClerkProvider } from "@clerk/nextjs";
import { raleway } from "@/app/fonts";

export const metadata = {
  title: "Threads",
  description: "A Meta Threads Application",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${raleway.className}`}
          style={{ backgroundColor: "black" }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
