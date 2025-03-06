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
    <div className="flex flex-col justify-center gap-4">
      <h3 className="text-gray-600 header font-head font-sans text-[25px] font-medium pb-4">{question.id}. {question.text}</h3>
      <div className="options flex gap-7 justify-center items-center">
        <div className="text-green-600 text-[22px] font-medium">Đồng ý</div>
        <RadioGroup defaultValue="comfortable" className="flex gap-9">
          <RadioGroupItem value="1" id="r1" className="scale-[250%] text-green-600" />
          <RadioGroupItem value="2" id="r2" className="scale-[200%] text-green-600" />
          <RadioGroupItem value="comfortable" id="r3" className="scale-[150%]" />
          <RadioGroupItem value="3" id="r4" className="scale-[200%] text-purple-800" />
          <RadioGroupItem value="4" id="r5" className="scale-[250%] text-purple-800" />
        </RadioGroup>
        <div className="text-purple-800 text-[22px] font-medium">Không đồng ý</div>
      </div>
    </div>
  );
}

export default CollectAnswers;