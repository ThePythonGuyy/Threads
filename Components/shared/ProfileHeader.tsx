import React from "react";
import styles from "@/Styles/profileHeader.module.scss";
import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: 'User' | 'Community'
}

export default function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) {
  return (
    <section className={styles.profileContainer}>
      <div className={styles.userInfo}>
        <div className={styles.profile}>
          <div className={styles.profileImgCont}>
            <Image
              src={imgUrl}
              alt="profile photo"
              width={48}
              height={48}
              className={styles.profileImg}
            />
          </div>
          <div className={styles.profileName}>
            <h3>{name}</h3>
            <p>@{username}</p>
          </div>
        </div>
        <div className={styles.bio}>
          <p>{bio}</p>
        </div>
      </div>
    </section>
  );
}
