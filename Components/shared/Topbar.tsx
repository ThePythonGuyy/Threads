import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '@/Styles/topbar.module.scss'
import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { jaoren } from '@/app/fonts'

export default function Topbar() {
  return (
    <nav className={styles.topNav}>
      <Link href='/' className={styles.headContent}>
        <Image src='/assets/logo.svg' width={28} height={28} alt='logo' />
        <h3 className={``}>Threads</h3>
      </Link>
      <div>
        <div className={styles.signOut}>
          <SignedIn>
            <SignOutButton>
              <div >
                <Image src='/assets/logout.svg' width={28} height={28} alt='logout' />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>

     <div className={styles.organizationTab}>
       
      <OrganizationSwitcher 
        appearance={{
          baseTheme: dark,
        }}
      
      /> 
      </div>
    </nav> 
  )
}
