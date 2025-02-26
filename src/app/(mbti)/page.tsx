'use client';

import { useState } from "react";
import CollectAnswers from "./collect-answers";
import { questions } from "../questions-mbti";

const MBTIPage = () => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (id: number, dimension: string, effect: string, score: number) => {
    setAnswers({ ...answers, [id]: score });
  };

  const calculateResult = () => {
    const scores: { [key: string]: number } = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    questions.forEach(({ id, effect }) => {
      if (answers[id] !== undefined) {
        scores[effect] += answers[id];
      }
    });

    const mbtiType =
      (scores.E >= scores.I ? "E" : "I") +
      (scores.N >= scores.S ? "N" : "S") +
      (scores.T >= scores.F ? "T" : "F") +
      (scores.J >= scores.P ? "J" : "P");

    setResult(mbtiType);
  };

  return (
    <div>
      <h1>MBTI Test</h1>
      {questions.map((q) => (
        <CollectAnswers key={q.id} question={q} onAnswer={handleAnswer} />
      ))}
      <button onClick={calculateResult}>Submit</button>
      {result && <h2>Your MBTI Type: {result}</h2>}
    </div>
  );
};

export default MBTIPage;
