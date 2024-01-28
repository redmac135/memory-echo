import Image from "next/image";
import styles from "./logo.module.css";

export default function Logo() {
  return (
    <Image
      className={styles.logo}
      src="/logo dark.png"
      width={80}
      height={80}
      alt="logo"
      onClick={() => {
        window.location.href = "/";
      }}
    />
  );
}
