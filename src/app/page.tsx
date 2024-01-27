import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <Image src="/everything.webp" fill objectFit="cover" alt="introductory image" />
      </section>
    </main>
  );
}
