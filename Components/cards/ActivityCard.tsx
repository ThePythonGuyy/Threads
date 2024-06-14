import React from 'react'
import styles from '@/Styles/activity.module.scss'
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    name: string;
    imageUrl: string;
    parentId: string;
}
export default function ActivityCard({ name, imageUrl, parentId} : Props) {

  
  return (
<article className={styles.card}>
  <Link href={`/thread/${JSON.parse(parentId)}`}>
  <Image
    src = {imageUrl}
    alt = 'profile img'
    width = {36}
    height = {36}
    />

    <h5>{name}</h5>
    <p>replied to your thread</p>
    </Link>
</article>
  )
}
