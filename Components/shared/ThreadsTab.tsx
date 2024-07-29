import { fetchUserThreads } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import styles from '@/Styles/threadsTab.module.scss'
import React from 'react'
import ThreadCard from '../cards/ThreadCard';
import { fetchCommunityPosts } from '@/lib/actions/community.action';

interface Props {
    currentUserId: string;
    accountId: string;
    accounType: 'User' | 'Community';
}
export default async function ThreadsTab({ currentUserId, accountId, accounType } : Props) {
    let result = accounType === 'User' ? await fetchUserThreads(accountId) : await fetchCommunityPosts(accountId);
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
