'use client';

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Label } from "@/src/components/ui/label";
import { useMBTI } from "@/src/lib/store";
import { cn } from "@/src/lib/utils";
import { Circle } from "lucide-react";

type CollectAnswerProps = {
  question: {
    id: number;
    text: string;
    dimension: string;
    effect: string;
  };
  onAnswerSelected?: (lastAnsweredQuestionId?: number) => void;
}

const CollectAnswers = ({ question, onAnswerSelected }: CollectAnswerProps) => {
  const { answers, setAnswer } = useMBTI();
  const [selectedValue, setSelectedValue] = useState<string>("");

  // Khởi tạo giá trị đã chọn từ store
  useEffect(() => {
    if (answers[question.id] !== undefined) {
      // Chuyển đổi từ số điểm sang giá trị chuỗi
      const score = answers[question.id];
      let value = "";
      
      switch(score) {
        case 2: value = "strongly-agree"; break;
        case 1: value = "agree"; break;
        case 0: value = "neutral"; break;
        case -1: value = "disagree"; break;
        case -2: value = "strongly-disagree"; break;
      }
      
      setSelectedValue(value);
    }
  }, [answers, question.id]);

  // Xử lý khi người dùng chọn một option
  const handleValueChange = (value: string) => {
    // Ngay lập tức cập nhật UI locally
    setSelectedValue(value);
    
    // Chuyển đổi từ giá trị chuỗi sang số điểm
    let score: number;
    switch(value) {
      case "strongly-agree": score = 2; break;
      case "agree": score = 1; break;
      case "neutral": score = 0; break;
      case "disagree": score = -1; break;
      case "strongly-disagree": score = -2; break;
      default: score = 0;
    }
    
    // Log để debug
    console.log(`Câu ${question.id}: chọn ${value}, điểm: ${score}`);
    
    // Cập nhật giá trị vào store
    setAnswer(question.id, score);
    
    // Gọi onAnswerSelected với ID của câu hỏi hiện tại
    if (onAnswerSelected) {
      // Tạo một sự trễ nhỏ để UI có thể hiển thị phản hồi
      setTimeout(() => {
        // Truyền ID của câu hỏi vừa trả lời vào callback
        onAnswerSelected(question.id);
      }, 300);
    }
  };

  // Màu sắc cho từng lựa chọn
  const optionColors = {
    "strongly-agree": {
      radio: "border-green-600 text-green-600",
      circle: "fill-green-600 text-green-600",
      text: "text-green-600",
      shadow: "shadow-green-600"
    },
    "agree": {
      radio: "border-green-500 text-green-500",
      circle: "fill-green-500 text-green-500",
      text: "text-green-500",
      shadow: "shadow-green-500"
    },
    "neutral": {
      radio: "border-gray-500 text-gray-500",
      circle: "fill-gray-500 text-gray-500",
      text: "text-gray-500",
      shadow: "shadow-gray-500"
    },
    "disagree": {
      radio: "border-purple-600 text-purple-600",
      circle: "fill-purple-600 text-purple-600",
      text: "text-purple-600",
      shadow: "shadow-purple-600"
    },
    "strongly-disagree": {
      radio: "border-purple-800 text-purple-800",
      circle: "fill-purple-800 text-purple-800",
      text: "text-purple-800",
      shadow: "shadow-purple-800"
    }
  };

  // Custom RadioGroupItem component với indicator có màu tùy chỉnh
  const CustomRadioGroupItem = ({ value, id, className }: { value: string, id: string, className?: string }) => {
    const isSelected = selectedValue === value;
    const colors = optionColors[value as keyof typeof optionColors];
    
    return (
      <RadioGroupItem
        value={value}
        id={id}
        className={cn(
          "aspect-square scale-[170%] md:scale-[200%] rounded-full border shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          colors.radio,
          isSelected && "ring-opacity-25",
          isSelected && `${colors.shadow} shadow-md`,
          className
        )}
      >
        <Circle className={cn("h-3.5 w-3.5", colors.circle)} />
      </RadioGroupItem>
    );
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <h3 className="text-gray-600 header font-head font-sans text-[18px] md:text-[25px] font-medium pb-4">{question.id}. {question.text}</h3>
      <div className="options flex flex-col md:flex-row gap-4 md:gap-7 justify-center items-center">
        <div className="text-green-600 text-[16px] md:text-[22px] font-medium">Đồng ý</div>
        <RadioGroup 
          value={selectedValue}
          onValueChange={handleValueChange}
          className="flex gap-6 md:gap-12"
        >
          <div className="flex flex-col items-center gap-3">
            <CustomRadioGroupItem 
              value="strongly-agree" 
              id={`q${question.id}-sa`} 
              className="scale-[200%] md:scale-[250%]"
            />
            <Label htmlFor={`q${question.id}-sa`} className={cn("text-xs md:text-sm text-center font-medium mt-1", optionColors["strongly-agree"].text)}>Rất đồng ý</Label>
          </div>
          <div className="flex flex-col items-center gap-3">
            <CustomRadioGroupItem 
              value="agree" 
              id={`q${question.id}-a`} 
              className="scale-[170%] md:scale-[200%]"
            />
            <Label htmlFor={`q${question.id}-a`} className={cn("text-xs md:text-sm text-center font-medium mt-1", optionColors["agree"].text)}>Đồng ý</Label>
          </div>
          <div className="flex flex-col items-center gap-3">
            <CustomRadioGroupItem 
              value="neutral" 
              id={`q${question.id}-n`} 
              className="scale-[150%]"
            />
            <Label htmlFor={`q${question.id}-n`} className={cn("text-xs md:text-sm text-center font-medium mt-1", optionColors["neutral"].text)}>Trung lập</Label>
          </div>
          <div className="flex flex-col items-center gap-3">
            <CustomRadioGroupItem 
              value="disagree" 
              id={`q${question.id}-d`} 
              className="scale-[170%] md:scale-[200%]"
            />
            <Label htmlFor={`q${question.id}-d`} className={cn("text-xs md:text-sm text-center font-medium mt-1", optionColors["disagree"].text)}>Không đồng ý</Label>
          </div>
          <div className="flex flex-col items-center gap-3">
            <CustomRadioGroupItem 
              value="strongly-disagree" 
              id={`q${question.id}-sd`} 
              className="scale-[200%] md:scale-[250%]"
            />
            <Label htmlFor={`q${question.id}-sd`} className={cn("text-xs md:text-sm text-center font-medium mt-1", optionColors["strongly-disagree"].text)}>Rất không đồng ý</Label>
          </div>
        </RadioGroup>
        <div className="text-purple-800 text-[16px] md:text-[22px] font-medium">Không đồng ý</div>
      </div>
      
      {/* Hiển thị trạng thái đã chọn */}
      {selectedValue && (
        <div className="mt-4 text-center text-sm font-medium text-blue-600 bg-blue-50 p-2 rounded-md">
          Bạn đã chọn: {
            selectedValue === "strongly-agree" ? "Rất đồng ý" :
            selectedValue === "agree" ? "Đồng ý" :
            selectedValue === "neutral" ? "Trung lập" :
            selectedValue === "disagree" ? "Không đồng ý" :
            "Rất không đồng ý"
          }
        </div>
      )}
    </div>
  );
}

export default CollectAnswers;