import React from "react";
import styles from "@/Styles/search.module.scss";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers} from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import UserCard from '@/Components/cards/UserCard'

export default async function page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  if(!userInfo.onboarded) redirect('/onboarding');

  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 20
  })

  return (
    <section>
      <h1 className="head-text">Search</h1>
      <div className={styles.userList}>
        {result.users.length !== 0 ? (
          <>
          { result.users.map((person) => (
            <UserCard 
              key={person.id}
              id={person.id}
              name={person.name}
              username={person.username}
              imgUrl={person.image}
              personType='User'
            />
          ))}
          </>
        ) : (
          <>
          hello
          </>
        )}
      </div>
    </section>
  );
}
