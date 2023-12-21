"use client"

import React from "react";
import styles from "@/Styles/bottombar.module.scss";
import { sidebarLinks } from "@/Constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Bottombar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className={styles.bottomBar}>
      <div className={styles.bottomBar_container}>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              className={`${styles.menu} ${isActive && styles.menuActive}`}
              href={link.route}
              key={link.label}
            >
              <Image
                src={link.imgURL}
                width={28}
                height={28}
                alt={link.label}
              />
                   <p>{link.label.split(/\s+/)[0]}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
