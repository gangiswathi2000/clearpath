'use client';
import { useEffect, useState } from 'react';

interface StreamingTextProps {
  text: string;
  speed?: number; // ms per word
}

export default function StreamingText({ text, speed = 30 }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const words = text.split(' ');

    setTimeout(() => setDisplayedText(''), 0);

    if (words.length === 0 || text === '') return;

    const intervalId = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedText((prev) => (prev ? prev + ' ' + words[currentIndex] : words[currentIndex]));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
}
