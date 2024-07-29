"use client"

import React from 'react'
import styles from "@/Styles/community.module.scss";
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface CommunityCardProps {
  key: string;
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;

}

export default function CommunityCard({key, id, name, username, imgUrl, bio} : CommunityCardProps) {

  const router = useRouter();
  return (
   <section className={styles.cardContainer} key={key}>
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
      {bio}
    </div>
    <div className={styles.more}>
    <Button className={`form_submitButton ${styles.button}`} onClick={() => router.push(`//${id}`)}>
            View
        </Button>
    </div>
   </section>
  )
}
