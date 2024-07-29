import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/Components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import styles from "@/Styles/profile.module.scss";
import { communityTabs } from "@/Constants";
import Image from "next/image";
import ThreadsTab from "@/Components/shared/ThreadsTab";
import { fetchCommunityDetails } from "@/lib/actions/community.action";
import UserCard from "@/Components/cards/UserCard";

export default async function page({ params }: { params: { id: string } }) {
    console.log("communitites")
  const user = await currentUser();
  if (!user) return null;

//   const userInfo = await fetchUser(user.id);
//   if (!userInfo?.onboarded) redirect("/onboarding");

console.log("communitites")

  const communityDetails = await fetchCommunityDetails(params.id);
  console.log(communityDetails)
  // return <h1 style={{color: 'white'}}>hello</h1>
  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type="Community"
      />

      <div className={styles.tabsContainer}>
        <Tabs defaultValue="threads" className={styles.tab}>
          <TabsList className={styles.tabList}>
            {communityTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className={styles.tabList}
              >
                <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                <p>{tab.label}</p>

                {tab.label === "Threads" && (
                  <div className={styles.threadsCount}>
                    <p style={{ fontSize: "10px" }}>
                      {communityDetails?.threads?.length}
                    </p>
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className={styles.tabContent}>
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accounType="Community"
            />
          </TabsContent>
          <TabsContent value="members" className={styles.tabContent}>
            <section>
              {communityDetails?.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
