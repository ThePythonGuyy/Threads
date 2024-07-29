// "use client";

import styles from "@/Styles/threadCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
    username: string;
  };
  createdAt: string;
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  isProfilePage?: boolean;
}
export default function ThreadCard({
  id,
  currentUserId,
  parentId,
  author,
  community,
  createdAt,
  comments,
  content,
  isComment = false,
  isProfilePage = false,
}: Props) {
  const image = community ? community.image : author.image;
  const nameEle = () => {
    if (community) {
      return <h4>{community.name} { } <sub className={styles.nameSub}> community</sub></h4>;
    } else {
      return <h4>{author.name}</h4>;
    }
  };

  const profileLink : string = community ? `/communities/${community.id}`: `/profile/${author.id}`;


  return (
    <article
      className={`${styles.card_container} ${isComment || isProfilePage ? styles.comment : ""}`}
    >
      <div className={styles.c1}>
        <div className={styles.c2}>
          <div className={styles.c3} id="profile-image">
            <Link href={profileLink} className={styles.profileImg}>
              <Image
                src={image}
                alt="Profile image"
                fill
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Link>
            <div className={styles.card_bar} />
          </div>
          <section className={styles.c4} id="thread-content">
            <Link href={profileLink} className={styles.authorName}>
              {nameEle()}
            </Link>
            <p className={styles.thread_content}>{content}</p>
            <div className={styles.threadResponse_container}>
              <div className={styles.threadResponse}>
                <Image
                  src="/assets/heart-gray.svg"
                  alt="Like"
                  width={24}
                  height={24}
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="Comment"
                    width={24}
                    height={24}
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                />
                <Image
                  src="/assets/share.svg"
                  alt="Share"
                  width={24}
                  height={24}
                />
              </div>
              {!isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`} className={styles.commentsCount}>
                  <p >{comments.length} {
                    comments.length > 1 ? (<span>replies</span>) : (<span>reply</span>) 
                    }</p>
                </Link>
              )}
            </div>
          </section>
        </div>
        {/* /TODO delete a thread */}
        <div className={styles.communityPostInfo}>
          {!isComment && community && (
            <Link
              href={`/communities/${community.id}`}
              className={styles.communityDetails}
            >
              <p>
                {formatDateString(createdAt)} - @{author.username}
              </p>
            </Link>
          )}
              {!community && (
            <Link
              href={``}
              className={styles.communityDetails}
            >
              <p>
                {formatDateString(createdAt)} 
              </p>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
