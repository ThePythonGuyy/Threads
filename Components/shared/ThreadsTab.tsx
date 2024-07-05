import { fetchUserThreads } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import styles from '@/Styles/threadsTab.module.scss'
import React from 'react'
import ThreadCard from '../cards/ThreadCard';

interface Props {
    currentUserId: string;
    accountId: string;
    accounType: string;
}
export default async function ThreadsTab({ currentUserId, accountId, accounType } : Props) {
    let result = await fetchUserThreads(accountId);
    if(!result) redirect('/');
    return (
   <section className={styles.container}>
        {result.threads.map((thread: any) => (
            <ThreadCard
            key={thread._id.toString()}
            id={thread._id.toString()}
            currentUserId={currentUserId}
            content={thread.text}
            parentId={thread.parentId}
            author={thread.author}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            isProfilePage={true}
          />
        ))}
   </section>
  )
}
