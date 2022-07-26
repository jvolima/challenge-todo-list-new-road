import styles from "./Header.module.css";
import rocketSvg from "../assets/rocket.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocketSvg} alt="Logo do site (foguete)" />
      <h1>to<span>do</span></h1>
    </header>
  )
}