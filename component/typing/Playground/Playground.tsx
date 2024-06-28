'use client';

import styles from "./Playground.module.css";
import '@/utils/extension/arrayExtensions';
import {useEffect, useState} from "react";
import TypingLine from "@/component/typing/TypingLine/TypingLine";
import TypingInput from "@/component/typing/TypingInput/TypingInput";
import UserText from "@/component/typing/UserText/UserText";
import {indexToKey, initLineRange} from "@/utils/playgroundHelper";

interface IPlayground {
  targetList: string[];
}

const Playground = ({targetList}: IPlayground) => {
  // input을 통해 totalUserText를 update해야함.
  const [totalUserText, setTotalUserTexts] = useState<string[]>(Array.from({length: targetList.length}, () => ''));
  const [showUserText, setShowUserText] = useState<string[]>(['']);
  const [lineRange, setLineRange] = useState(initLineRange(targetList));
  const [lines, setLines] = useState(targetList.copy(lineRange.start, lineRange.end));
  
  
  // update show user text
  useEffect(() => {
    const result = totalUserText.copy(lineRange.start, lineRange.end);
    setShowUserText(result);
  }, [lineRange, totalUserText]);
  
  
  return (
    <div className={styles.container}>
      <div className={styles.text_wrap}>
        {!!lines.length && lines.map((line, i) => (
          <TypingLine key={indexToKey('wrap', i)} lineIndex={i} line={line} />
        ))}
        <UserText showUserText={showUserText} />
      </div>
      <TypingInput
        lines={lines}
        totalUserText={totalUserText}
        setTotalUserText={setTotalUserTexts}
        lineRange={lineRange}
        setLineRange={setLineRange}
      />
    </div>
  );
}

export default Playground;