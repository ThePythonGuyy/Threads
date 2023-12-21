import React from 'react'
import styles from '@/Styles/rightbar.module.scss'

export default function RightSidebar() {
  return (
    <section className={styles.rightsideBar}>
      <div className={styles.block_container}>
        <h3>Suggested Communities</h3>
      </div>
      <div className={styles.block_container}>
        <h3>Suggested Users</h3>
      </div>
    </section>
  )
}
