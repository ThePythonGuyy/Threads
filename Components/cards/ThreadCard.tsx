// "use client";

import styles from "@/Styles/threadCard.module.scss";
import Link from "next/link";
import Image from "next/image";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
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
}: Props) {
  return (
    <article className={`${styles.card_container} ${styles.comment}`}>
      <div className={styles.c1}>
        <div className={styles.c2}>
          <div className={styles.c3} id="profile-image">
            <Link href={`/profile/${author.id}`} className={styles.profileImg}>
              <Image
                src={author.image}
                alt="Profile image"
                fill
                style={{ cursor: "pointer" , borderRadius: '50%'}}
              />
            </Link>
            <div className={styles.card_bar} />
          </div>
          <section className={styles.c4} id="thread-content">
            <Link href={`/profile/${author.id}`} className={styles.authorName}>
              <h4>{author.name}</h4>
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
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className={styles.noOfComments}>{comments.length}</p>
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
