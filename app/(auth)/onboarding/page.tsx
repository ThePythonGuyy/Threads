import styles from "@/Styles/onBoarding.module.scss";
import AccountProfile from "@/Components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";



export default async function page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if(userInfo?.onboarded) redirect('/');



  const userData = {
    id: user?.id || "",
    objectId: userInfo?.id || "",
    username: userInfo?.username || user?.username || "",
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl || "",
  };
  return (
    <main className={styles.container}>
      <h1>OnBoarding</h1>
      <p>Complete your profile now to use Threads</p>

      <section className={styles.profile_container}>
        <AccountProfile user={userData} btnTitle="continue" />
      </section>
    </main>
  );
}
