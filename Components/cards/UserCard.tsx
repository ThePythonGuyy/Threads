"use client"

import React from "react";
import styles from "@/Styles/userCard.module.scss";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

export default function UserCard({
  id,
  name,
  username,
  imgUrl,
  personType,
}: Props) {

    const router = useRouter();
  return (
    <article className={styles.userCard}>
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
      <div className={styles.button}>
        <Button className={`form_submitButton ${styles.button}`} onClick={() => router.push(`/profile/${id}`)}>
            View
        </Button>
      </div>
    </article>
  );
}
