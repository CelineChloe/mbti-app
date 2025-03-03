'use client';

import { useState } from "react";
import CollectAnswers from "./collect-answers";
import { questions } from "../questions-mbti";
import { Button } from "@/src/components/ui/button";

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
    <div className="">
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-semibold">MBTI Test</h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <div className="flex gap-10 flex-col">
          {questions.map((q) => (
            <CollectAnswers key={q.id} question={q} onAnswer={handleAnswer} />
          ))}
        </div>
        <div className="mb-10">
          <Button onClick={calculateResult}>Submit</Button>
          {result && <h2>Your MBTI Type: {result}</h2>}
        </div>
      </div>
    </div>
  );
};

export default MBTIPage;
