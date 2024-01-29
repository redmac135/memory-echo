"use client";

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <Image
        className={styles.logo}
        width={65}
        height={65}
        src="/logohighqual.png"
        alt="logo"
      />
      <section className={styles.section}>
        <Image
          className={styles.img}
          fill
          src="/landing4.webp"
          alt="landing page"
        />
        <button
          className={styles.button}
          onClick={() => {
            window.location.href = "/echo";
          }}
        >
          Take me back...
        </button>
      </section>
    </main>
  );
}
