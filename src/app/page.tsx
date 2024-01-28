import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <img src="/everything-2.png" objectFit="cover" alt="introductory image" />
      </section>
    </main>
  );
}
