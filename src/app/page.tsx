import { getSession } from "next-auth/react";
import { useEffect } from "react";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <a href="/api/auth/login">Login</a>
      </section>
    </main>
  );
}
