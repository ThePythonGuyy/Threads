
// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import { fetchUser } from "@/lib/actions/user.actions";
// import ProfileHeader from "@/Components/shared/ProfileHeader";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
// import styles from "@/Styles/profile.module.scss";
// import { communityTabs } from "@/Constants";
// import Image from "next/image";
// import ThreadsTab from '@/Components/shared/ThreadsTab'
// import { fetchCommunityDetails } from "@/lib/actions/community.action";

// export default async function page({ params }: { params: { id: string } }) {
//   const user = await currentUser();
//   if (!user) return null;

//   const userInfo = await fetchUser(user.id);
//   if (!userInfo?.onboarded) redirect("/onboarding");


//   const communityDetails = await fetchCommunityDetails(params.id)
//   return (
//     <section>
//       <ProfileHeader
//         accountId={communityDetails.id}
//         authUserId={user.id}
//         name={communityDetails.name}
//         username={communityDetails.username}
//         imgUrl={communityDetails.image}
//         bio={communityDetails.bio}
//         type="Community"
//       />

//       <div className={styles.tabsContainer}>
//         <Tabs defaultValue="threads" className={styles.tab}>
//           <TabsList className={styles.tabList}>
//             {communityTabs.map((tab) => (
//               <TabsTrigger
//                 key={tab.label}
//                 value={tab.value}
//                 className={styles.tabList}
//               >
//                 <Image src={tab.icon} alt={tab.label} width={24} height={24} />
//                 <p>{tab.label}</p>

//                 {tab.label === "Threads" && (
//                   <div className={styles.threadsCount}>
//                     <p style={{ fontSize: "10px" }}>
//                       {communityDetails?.threads?.length}
//                     </p>
//                   </div>
//                 )}
//               </TabsTrigger>
//             ))}
//           </TabsList>
//           {profileTabs.map((tab) => (
//             <TabsContent key={`content-${tab.label}`} value={tab.value} className={styles.tabContent}>
//               <ThreadsTab
//               currentUserId={user.id}
//               accountId={communityDetails.id}
//               accounType="User"
//               />
//             </TabsContent>
//           ))}
//         </Tabs>
//       </div>
//     </section>
//   );
// }
