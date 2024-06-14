import { fetchThreads } from "@/lib/actions/thread.action";
import styles from "@/Styles/home.module.scss";
import "../globals.scss";
import ThreadCard from "@/Components/cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
export default async function Home() {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  
  return (
    <section>
      <h1 className="head-text">Home</h1>
      <div className={styles.thread_container}>
        {result.threads.length === 0 ? (
          <p>No threads found</p>
        ) : (
          <>
            {result.threads.map((thread) => (
              <ThreadCard
                key={thread._id.toString()}
                id={thread._id.toString()}
                currentUserId={user?.id || ''}
                content={thread.text}
                parentId={thread.parentId}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
