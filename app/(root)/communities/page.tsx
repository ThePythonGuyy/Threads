import React from "react";
import styles from "@/Styles/community.module.scss";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers} from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import UserCard from '@/Components/cards/UserCard'
import { fetchCommunities } from "@/lib/actions/community.action";
import CommunityCard from "@/Components/cards/CommunityCard";


export default async function page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  if(!userInfo.onboarded) redirect('/onboarding');

  const result = await fetchCommunities({
 
    searchString: '',
    pageNumber: 1,
    pageSize: 10,
  })



  return (
    <section className={styles.communityContainer}>
      <h1 className="head-text">Search</h1>
      <div className={styles.communityList}>
        {result.communities.length !== 0 ? (
          <>
          { result.communities.map((community) => (
            <CommunityCard 
              key={community.id}
              id={community.id}
              name={community.name}
              username={community.username}
              imgUrl={community.image}
              bio = {community.bio}
         
            />
     
          ))}
                 
          </>
        ) : (
          <>
       
          </>
        )}
      </div>
    </section>
  );
}
