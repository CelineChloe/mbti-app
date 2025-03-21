'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { questions } from '@/app/questions-mbti';

// Định nghĩa kiểu dữ liệu cho context
type MBTIContextType = {
  answers: { [key: number]: number };
  setAnswer: (questionId: number, score: number) => void;
  calculateResult: () => { type: string; percentages: { [key: string]: { value: number; dominant: string } } };
  result: string | null;
  resetTest: () => void;
  getAnswerCount: () => number;
};

// Tạo context mặc định
const MBTIContext = createContext<MBTIContextType | undefined>(undefined);

// Hook custom để sử dụng context
export const useMBTI = () => {
  const context = useContext(MBTIContext);
  if (context === undefined) {
    throw new Error('useMBTI must be used within a MBTIProvider');
  }
  return context;
};

// Component Provider
export const MBTIProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [result, setResult] = useState<string | null>(null);

  // Hàm để đặt câu trả lời vào store
  const setAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  // Hàm tính số câu đã trả lời
  const getAnswerCount = () => {
    return Object.keys(answers).length;
  };

  // Hàm tính toán kết quả MBTI
  const calculateResult = () => {
    const scores: { [key: string]: number } = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    questions.forEach(({ id, effect }: { id: number; effect: string }) => {
      if (answers[id] !== undefined) {
        // Cộng điểm vào đúng loại tính cách dựa trên "effect"
        scores[effect] += answers[id];
      }
    });

    // Tính toán loại MBTI dựa trên điểm số
    const mbtiType =
      (scores.E >= scores.I ? "E" : "I") +
      (scores.N >= scores.S ? "N" : "S") +
      (scores.T >= scores.F ? "T" : "F") +
      (scores.J >= scores.P ? "J" : "P");

    // Tính tỷ lệ phần trăm cho từng cặp tính cách
    const percentages: { [key: string]: { value: number; dominant: string } } = {
      IE: {
        value: Math.round((Math.abs(scores.E - scores.I) / (scores.E + scores.I)) * 100),
        dominant: scores.E >= scores.I ? "E" : "I"
      },
      SN: {
        value: Math.round((Math.abs(scores.N - scores.S) / (scores.N + scores.S)) * 100),
        dominant: scores.N >= scores.S ? "N" : "S"
      },
      TF: {
        value: Math.round((Math.abs(scores.T - scores.F) / (scores.T + scores.F)) * 100),
        dominant: scores.T >= scores.F ? "T" : "F"
      },
      JP: {
        value: Math.round((Math.abs(scores.J - scores.P) / (scores.J + scores.P)) * 100),
        dominant: scores.J >= scores.P ? "J" : "P"
      }
    };

    setResult(mbtiType);
    return { type: mbtiType, percentages };
  };

  // Hàm reset lại bài test
  const resetTest = () => {
    setAnswers({});
    setResult(null);
  };

  // Giá trị của context
  const value = {
    answers,
    setAnswer,
    calculateResult,
    result,
    resetTest,
    getAnswerCount
  };

  return <MBTIContext.Provider value={value}>{children}</MBTIContext.Provider>;
}; 