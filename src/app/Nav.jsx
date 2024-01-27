import Link from 'next/link';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
            {}
            <img src="/logo dark.png" alt="Logo" width={50} height={50} />
        </Link>
      </div>
      <div className={styles.button}>
        <Link href="">
          <span className={styles.blackBtn}>Login</span>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
