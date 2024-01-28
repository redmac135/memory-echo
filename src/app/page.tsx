"use client";

import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <img className={styles.logo} src="/logohighqual.png" alt="logo" />
      <section className={styles.section}>
        <img className={styles.img} src="/landing4.webp" alt="landing page" />
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
