import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import styles from '@/Styles/activity.module.scss'
import ActivityCard from '@/Components/cards/ActivityCard';

export default async function page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  if(!userInfo.onboarded) redirect('/onboarding');

  const activitys = await getActivity(userInfo._id);
  console.log(activitys)
  return (
   <section className={styles.activityContainer}>
    <h1 className="head-text">
      Activity
    </h1>

    <section className={styles.activity}>
      {activitys.length > 0 ? (
        activitys.map((activity) => (
          <ActivityCard 
          name={activity.author.name}
          imageUrl={activity.author.image}
          parentId={activity.parentId}
        />
        ))
     
      ) : (
        <p>No Activities Fuund</p>
      )}
    </section>
   </section>
  )
}
