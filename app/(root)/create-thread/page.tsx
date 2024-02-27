import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import styles from "@/Styles/createThread.module.scss";
import PostThread from "@/Components/forms/PostThread";

export default async function page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <div className={styles.threadContainer}>
      <h1 className={styles.head}>Create Thread</h1>
      <div className={styles.postThread_container}>
      <PostThread userId={user.id} />
      </div>
    </div>
  );
}
