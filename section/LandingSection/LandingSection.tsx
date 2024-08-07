'use client';

import styles from "./LandingSection.module.css";
import TextWriterAnimation from "@/component/text/TextWriterAnimation/TextWriterAnimation";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {excludedKeys} from "@/static/keymap";

const LandingSection = () => {
  const [isDone, setDone] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const handleAnyKey = (event: KeyboardEvent) => {
      const key = event.key;
      if (!excludedKeys.includes(key)) {
        router.push('/typing');
      }
    }

    window.addEventListener("keydown", handleAnyKey);

    return () => window.removeEventListener("keydown", handleAnyKey);
  }, [router]);
  
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <TextWriterAnimation
          text={'Hava a chill typing experience.'}
          delay={50}
          hasCaret={true}
          setIsDoneForParent={setDone}
        />
      </h1>
      {isDone && (
        <div
          className={styles.press_btn}
          onClick={() => router.push('/typing')}
        >
          <p className={styles.p}>Press to any key</p>
        </div>
      )}
    </div>
  );
}

export default LandingSection;