import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/Components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import styles from "@/Styles/profile.module.scss";
import { profileTabs } from "@/Constants";
import Image from "next/image";
import ThreadsTab from '@/Components/shared/ThreadsTab'

export default async function page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className={styles.tabsContainer}>
        <Tabs defaultValue="threads" className={styles.tab}>
          <TabsList className={styles.tabList}>
            {profileTabs.map((tab) => (
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
                      {userInfo?.threads?.length}
                    </p>
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent key={`content-${tab.label}`} value={tab.value} className={styles.tabContent}>
              <ThreadsTab
              currentUserId={user.id}
              accountId={userInfo.id}
              accounType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
