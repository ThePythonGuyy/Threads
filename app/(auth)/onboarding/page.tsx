
import styles from "@/Styles/onBoarding.module.scss";
import AccountProfile from "@/Components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

export default async function page() {
  const user = await currentUser();
  

  const userInfo = {
    id: "1",
    username: "",
    name: "",
    bio: "",
    image: "",
  };
  const a = "a";
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
