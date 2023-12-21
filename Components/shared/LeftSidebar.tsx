"use client"

import React from "react";
import styles from "@/Styles/leftbar.module.scss";
import { sidebarLinks } from "@/Constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

export default function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className={styles.container}>
      <div className={styles.menuWrap}>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link className={`${styles.menu} ${isActive && styles.menuActive}`} href={link.route} key={link.label} >
              <Image
                src={link.imgURL}
                width={28}
                height={28}
                alt={link.label}
              />
              <p>{link.label}</p>
            </Link>
          );
        })}
   
      </div>
      <div className={styles.logout}>
        <SignedIn >
            <SignOutButton signOutCallback={() => router.push('/sign-in') }>
              <div className={styles.logoutButton}>
                <Image src='/assets/logout.svg' width={25} height={25} alt='logout' />
                <p>Logout</p>
              </div>

            </SignOutButton>
          </SignedIn>
        </div>
    </section>
  );
}
