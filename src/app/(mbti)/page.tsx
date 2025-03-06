'use client';

import { useState } from "react";
import CollectAnswers from "./collect-answers";
import { questions } from "../questions-mbti";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <div className="text-gray-800 font-medium">
      <div className="flex justify-center mb-16">
        <h1 className="text-4xl font-semibold text-neutral-600">Bài kiểm tra tính cách MBTI miễn phí</h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <div className="flex gap-10 flex-col">
          {questions.map((question, index) => (
            <div key={question.id}>
              <div className="pb-10">
                <CollectAnswers question={question} onAnswer={handleAnswer} />
              </div>
              {index < questions.length - 1 && <hr />}
            </div>
          ))}
        </div>
        <div className="mb-10">
          <Button onClick={calculateResult} className="flex gap-1 text-lg">
            <span>Tiếp theo</span>
            <ArrowRight className="w-6 h-w-6 ml-2" size={20} />
          </Button>
          {result && <h2>Your MBTI Type: {result}</h2>}
        </div>
      </div>
    </div>
  );
};

export default MBTIPage;
