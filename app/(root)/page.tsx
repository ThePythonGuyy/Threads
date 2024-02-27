import { fetchThreads } from "@/lib/actions/thread.action";
import styles from "@/Styles/home.module.scss";
import "../globals.scss";
import ThreadCard from "@/Components/cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
export default async function Home() {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();
  return (
    <section>
      <h1 className="head-text">Home</h1>
      <div className={styles.thread_container}>
        {result.threads.length === 0 ? (
          <p>dsaf</p>
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
