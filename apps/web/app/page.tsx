import Image, { type ImageProps } from "next/image";
import { PromoBanner } from "@repo/ui/PromoBanner";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PromoBanner
          headline="Welcome to my enterprise architecture!"
          bgColor="bg-blue-600"
        />
      </main>
    </div>
  );
}
