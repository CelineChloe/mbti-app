'use client';

import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";

type CollectAnswerProps = {
  question: {
    id: number;
    text: string;
    dimension: string;
    effect: string;
  };
  onAnswer: (id: number, dimension: string, effect: string, score: number) => void;
}

const CollectAnswers = ({ question }: CollectAnswerProps) => {

  return (
    <div className="question">
      <h3 className="header font-head h6 pb-4">{question.id}. {question.text}</h3>
      <div className="options flex gap-7 justify-center items-center">
        <div>Đồng ý</div>
        <RadioGroup defaultValue="comfortable" className="flex gap-9">
          <RadioGroupItem value="1" id="r1" className="scale-[250%]" />
          <RadioGroupItem value="2" id="r2" className="scale-[200%]" />
          <RadioGroupItem value="comfortable" id="r3" className="scale-[150%]" />
          <RadioGroupItem value="3" id="r4" className="scale-[200%]" />
          <RadioGroupItem value="4" id="r5" className="scale-[250%]" />
        </RadioGroup>
        <div>Không đồng ý</div>
      </div>
    </div>
  );
}

export default CollectAnswers;