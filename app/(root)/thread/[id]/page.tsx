import React from "react";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchThreadById } from "@/lib/actions/thread.action";
import ThreadCard from "@/Components/cards/ThreadCard";
import Comment from '@/Components/forms/Comment'
import styles from '@/Styles/threadDetails.module.scss'
async function page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboarded) redirect("/onboarding");
  const thread = await fetchThreadById(params.id);
  return (
    <section className={styles.threadDetails_container}>
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      <div className={styles.threadComments_container}>
        <Comment 
            threadId={JSON.stringify(thread._id)}
            currentUserImg={userInfo.image}
            currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className={styles.children}>
        {thread.children.map((children: any) => (
           <ThreadCard
           key={children._id}
           id={children._id}
           currentUserId={user?.id || ""}
           parentId={children.parentId}
           content={children.text}
           author={children.author}
           community={children.community}
           createdAt={children.createdAt}
           comments={children.children}
           isComment = {true}
         />
        ))}
      </div>
    </section>
  );
}

export default page;
