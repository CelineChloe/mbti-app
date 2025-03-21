'use client';

import { useState, useEffect } from "react";
import CollectAnswers from "./collect-answers";
import { questions } from "../questions-mbti";
import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useMBTI } from "@/lib/store";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MBTIPage = () => {
  const { calculateResult, result, resetTest, getAnswerCount, answers } = useMBTI();
  const [activeTab, setActiveTab] = useState("test");
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [percentages, setPercentages] = useState<{ [key: string]: { value: number; dominant: string } } | null>(null);
  
  // Tính phần trăm hoàn thành
  const completionPercentage = Math.round((getAnswerCount() / questions.length) * 100);
  
  // Tìm câu hỏi tiếp theo chưa trả lời khi component mount hoặc khi answers thay đổi
  useEffect(() => {
    findNextUnanswered();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  // Hàm tìm câu hỏi tiếp theo chưa trả lời
  const findNextUnanswered = () => {
    const answeredIds = Object.keys(answers).map(id => parseInt(id));
    
    for (const question of questions) {
      if (!answeredIds.includes(question.id)) {
        setCurrentQuestionId(question.id);
        return;
      }
    }
    
    // Nếu đã trả lời hết tất cả câu hỏi, set currentQuestionId = null
    if (getAnswerCount() === questions.length) {
      setCurrentQuestionId(null);
    }
  };
  
  // Theo dõi sự kiện cuộn để xác định khi nào cần fixed header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Các thông tin về loại MBTI
  const mbtiDescriptions: { [key: string]: { title: string; description: string } } = {
    "INTJ": {
      title: "Chiến lược gia (The Architect)",
      description: "Người có tư duy sáng tạo và phân tích chiến lược. Thường đặt ra các mục tiêu tham vọng và tự tin theo đuổi chúng."
    },
    "INTP": {
      title: "Nhà tư duy (The Logician)",
      description: "Người đổi mới với khát khao hiểu biết. Thích tìm ra các mẫu mực logic đặc biệt và phát triển các giải thích mới."
    },
    "ENTJ": {
      title: "Chỉ huy (The Commander)",
      description: "Người lãnh đạo táo bạo, giàu trí tưởng tượng và ý chí mạnh mẽ. Luôn tìm kiếm cách thức tốt nhất để đạt hiệu suất cao."
    },
    "ENTP": {
      title: "Người tranh luận (The Debater)",
      description: "Người suy nghĩ nhanh nhạy và ham thích tranh luận. Có thể phản biện cả hai mặt của vấn đề."
    },
    "INFJ": {
      title: "Người ủng hộ (The Advocate)",
      description: "Người yên tĩnh, thần bí, truyền cảm hứng và không mệt mỏi khi đổi mới. Quan tâm sâu sắc đến những người khác."
    },
    "INFP": {
      title: "Người hòa giải (The Mediator)",
      description: "Người mơ mộng, lý tưởng và đầy thông cảm. Muốn giúp đỡ người khác tìm thấy mục đích của họ."
    },
    "ENFJ": {
      title: "Người chủ xướng (The Protagonist)",
      description: "Người lãnh đạo đầy nhiệt huyết, chu đáo và tin tưởng. Có thể nhìn thấy tiềm năng trong mọi người và giúp họ phát triển."
    },
    "ENFP": {
      title: "Người vận động (The Campaigner)",
      description: "Người nhiệt tình, sáng tạo và hòa đồng, luôn có thể tìm ra lý do để mỉm cười."
    },
    "ISTJ": {
      title: "Người tổ chức (The Logistician)",
      description: "Người thực tế và làm việc dựa trên sự thật, đáng tin cậy. Thích làm việc trong các quy trình rõ ràng."
    },
    "ISFJ": {
      title: "Người bảo vệ (The Defender)",
      description: "Người bảo vệ và hết lòng, sẵn sàng bảo vệ những người họ yêu thương. Rất thực tế và có trách nhiệm."
    },
    "ESTJ": {
      title: "Người giám sát (The Executive)",
      description: "Người quản lý xuất sắc, không ngại khó khăn. Truyền thống và có trật tự, thích làm việc theo kế hoạch."
    },
    "ESFJ": {
      title: "Người quan tâm (The Consul)",
      description: "Người quan tâm, thích hỗ trợ người khác. Thích tạo sự hòa hợp trong các mối quan hệ và môi trường của họ."
    },
    "ISTP": {
      title: "Người thợ thủ công (The Virtuoso)",
      description: "Người táo bạo, thiếu kiên nhẫn và thực tế. Thích giải quyết vấn đề bằng tay."
    },
    "ISFP": {
      title: "Người nghệ sĩ (The Adventurer)",
      description: "Người linh hoạt, quyến rũ, sống động và nghệ sĩ. Thích khám phá và thử nghiệm."
    },
    "ESTP": {
      title: "Người doanh nhân (The Entrepreneur)",
      description: "Người năng động, thông minh và tập trung vào khoảnh khắc. Thích giải quyết vấn đề và không ngại rủi ro."
    },
    "ESFP": {
      title: "Người giải trí (The Entertainer)",
      description: "Người tự phát, nhiệt tình và vui vẻ. Thích là trung tâm của sự chú ý và tạo niềm vui cho người khác."
    }
  };

  const handleCalculateResult = () => {
    if (getAnswerCount() < questions.length) {
      alert(`Bạn mới trả lời ${getAnswerCount()}/${questions.length} câu hỏi. Vui lòng trả lời tất cả các câu hỏi.`);
      return;
    }
    const { percentages } = calculateResult();
    setPercentages(percentages);
    setActiveTab("result");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    resetTest();
    setActiveTab("test");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cuộn đến câu hỏi chưa trả lời tiếp theo
  const scrollToNextUnanswered = (lastAnsweredQuestionId?: number) => {
    // Xác định câu hỏi tiếp theo dựa vào lastAnsweredQuestionId
    let nextQuestion;
    
    if (lastAnsweredQuestionId) {
      // Nếu có ID câu hỏi vừa trả lời, tìm câu hỏi tiếp theo sau nó
      const currentIndex = questions.findIndex(q => q.id === lastAnsweredQuestionId);
      
      // Tìm câu hỏi chưa trả lời sau câu hỏi hiện tại
      for (let i = currentIndex + 1; i < questions.length; i++) {
        if (!answers[questions[i].id]) {
          nextQuestion = questions[i];
          break;
        }
      }
      
      // Nếu không tìm thấy câu hỏi chưa trả lời phía sau, tìm từ đầu
      if (!nextQuestion) {
        for (let i = 0; i < currentIndex; i++) {
          if (!answers[questions[i].id]) {
            nextQuestion = questions[i];
            break;
          }
        }
      }
    } else {
      // Nếu không có lastAnsweredQuestionId, tìm câu hỏi chưa trả lời đầu tiên
      nextQuestion = questions.find(q => !answers[q.id]);
    }
    
    // Xử lý sau khi tìm được câu hỏi tiếp theo
    if (nextQuestion) {
      // Có câu hỏi chưa trả lời tiếp theo
      setCurrentQuestionId(nextQuestion.id);
      // Đợi React render để đảm bảo DOM được cập nhật
      setTimeout(() => {
        const element = document.getElementById(`question-${nextQuestion.id}`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    } else {
      // Tất cả câu hỏi đã trả lời, cuộn đến nút kết quả
      setCurrentQuestionId(null);
      setTimeout(() => {
        const resultBtn = document.getElementById("result-button");
        resultBtn?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
  };

  return (
    <div className="text-gray-800 font-medium pb-20">
      <div className={`${isScrolled ? 'fixed top-0 left-0 right-0 z-20 bg-white/95 shadow-md transition-all duration-300 py-4' : 'py-8'}`}>
        <div className="container mx-auto">
          <h1 className={`font-semibold text-neutral-600 text-center transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl md:text-4xl'}`}>
            Bài kiểm tra tính cách MBTI miễn phí
          </h1>
          
          {isScrolled && activeTab === "test" && (
            <div className="my-2 px-4 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Tiến độ: {completionPercentage}%</span>
                <span className="text-sm font-medium">{getAnswerCount()}/{questions.length} câu hỏi</span>
              </div>
              <Progress value={completionPercentage} className="h-2 bg-gray-200" />
              {getAnswerCount() < questions.length && (
                <div className="flex justify-end mt-2">
                  <Button onClick={() => scrollToNextUnanswered(currentQuestionId || undefined)} variant="ghost" size="sm" className="text-xs">
                    Câu hỏi tiếp theo
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`container mx-auto ${isScrolled ? 'mt-28' : 'mt-8'}`}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-10">
            <TabsTrigger value="test">Bài kiểm tra</TabsTrigger>
            <TabsTrigger value="result" disabled={!result}>Kết quả</TabsTrigger>
          </TabsList>

          <TabsContent value="test">
            {!isScrolled && (
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Tiến độ: {completionPercentage}%</span>
                  <span className="text-sm font-medium">{getAnswerCount()}/{questions.length} câu hỏi</span>
                </div>
                <Progress value={completionPercentage} className="h-3 bg-gray-200" />
              </div>
            )}

            <div className="flex flex-col gap-y-10 transition-all duration-300">
              <div className="flex gap-10 flex-col">
                {questions.map((question, index) => {
                  const isCurrentQuestion = question.id === currentQuestionId;
                  const isAnswered = answers[question.id] !== undefined;
                  
                  // Chỉ hiển thị câu hỏi hiện tại và câu hỏi kế tiếp (nếu có)
                  const nextQuestion = questions.find(q => 
                    !Object.keys(answers).map(id => parseInt(id)).includes(q.id) && 
                    q.id > (currentQuestionId || 0)
                  );
                  const nextQuestionId = nextQuestion?.id;
                  const isNextQuestion = question.id === nextQuestionId;
                  
                  // Ẩn hoàn toàn những câu hỏi không phải là câu hiện tại hoặc câu tiếp theo và chưa được trả lời
                  const shouldHide = !isCurrentQuestion && !isAnswered && !isNextQuestion;
                  
                  // Xác định vị trí câu hỏi so với câu hiện tại
                  const isBeforeCurrent = question.id < (currentQuestionId || 0);
                  const isAfterCurrent = question.id > (currentQuestionId || 0);
                  
                  return (
                  <div 
                    key={question.id} 
                    id={`question-${question.id}`} 
                    className={`scroll-mt-32 transition-all duration-500 ease-in-out ${
                      isCurrentQuestion 
                        ? "opacity-100 scale-100 z-10" 
                        : isAnswered 
                          ? `opacity-40 scale-95 filter blur-[1px] hover:opacity-80 hover:blur-0 hover:scale-[0.98] ${isBeforeCurrent ? "translate-y-0" : ""}` 
                          : shouldHide 
                            ? "opacity-0 max-h-0 overflow-hidden pointer-events-none m-0 p-0" 
                            : `opacity-60 scale-95 ${isAfterCurrent ? "translate-y-0" : ""}`
                    }`}
                  >
                    <div className={`pb-10 bg-white p-6 rounded-lg relative ${
                      shouldHide 
                        ? "p-0 m-0 border-none" 
                        : isCurrentQuestion 
                          ? "shadow-xl border-l-4 border-blue-500 transform-gpu" 
                          : "shadow-sm hover:shadow transition-shadow"
                      } transition-all duration-300`}
                    >
                      {!shouldHide && isCurrentQuestion && (
                        <div className="absolute -top-4 left-0 bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-t-md shadow-sm">
                          Câu hỏi hiện tại
                        </div>
                      )}
                      {!shouldHide && isNextQuestion && (
                        <div className="absolute -top-4 left-0 bg-gray-500 text-white text-xs font-medium py-1 px-3 rounded-t-md shadow-sm">
                          Câu hỏi tiếp theo
                        </div>
                      )}
                      {!shouldHide && isAnswered && !isCurrentQuestion && (
                        <div className="absolute -top-4 right-0 bg-green-500 text-white text-[10px] py-1 px-2 rounded-t-md shadow-sm">
                          Đã trả lời
                        </div>
                      )}
                      {!shouldHide && <CollectAnswers question={question} onAnswerSelected={() => scrollToNextUnanswered(question.id)} />}
                    </div>
                    {!shouldHide && index < questions.length - 1 && (
                      <hr className={`border-gray-200 transition-all duration-300 ${isCurrentQuestion ? "opacity-100" : "opacity-30"}`} />
                    )}
                  </div>
                )})}
              </div>
              <div className="mb-10 flex justify-center">
                <Button id="result-button" onClick={handleCalculateResult} className="flex gap-1 text-lg px-6 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span>Xem kết quả</span>
                  <ArrowRight className="w-6 h-w-6 ml-2" size={20} />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="result" className="transition-all duration-500">
            {result && (
              <div className="flex flex-col gap-6">
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-blue-800">Kết quả bài kiểm tra MBTI của bạn</CardTitle>
                    <CardDescription className="text-center text-lg">Dựa trên câu trả lời của bạn, chúng tôi đã xác định loại tính cách của bạn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="text-6xl font-bold text-center mb-6 text-purple-700 animate-fadeIn">{result}</div>
                      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">{mbtiDescriptions[result]?.title || "Đang cập nhật"}</h2>
                      <p className="text-lg text-center">{mbtiDescriptions[result]?.description || "Đang cập nhật thông tin về loại tính cách này"}</p>
                    </div>
                  </CardContent>
                </Card>

                {percentages && (
                  <Card className="bg-white border-2 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-center text-blue-800">Chi tiết kết quả</CardTitle>
                      <CardDescription className="text-center">Tỷ lệ phần trăm cho từng cặp tính cách của bạn</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Hướng nội (I)</span>
                            <span className="font-medium">Hướng ngoại (E)</span>
                          </div>
                          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`absolute h-full rounded-full transition-all duration-500 ${
                                percentages.IE.dominant === "E" 
                                  ? percentages.IE.value >= 80 
                                    ? "bg-blue-700" 
                                    : percentages.IE.value >= 60 
                                      ? "bg-blue-600" 
                                      : "bg-blue-500"
                                  : percentages.IE.value >= 80 
                                    ? "bg-purple-700" 
                                    : percentages.IE.value >= 60 
                                      ? "bg-purple-600" 
                                      : "bg-purple-500"
                              }`}
                              style={{ width: `${percentages.IE.value}%` }}
                            />
                          </div>
                          <div className="text-sm text-gray-600 mt-1 text-center">
                            {percentages.IE.dominant === "I" 
                              ? `Hướng nội ${percentages.IE.value}%` 
                              : `Hướng ngoại ${percentages.IE.value}%`}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Cảm nhận (S)</span>
                            <span className="font-medium">Trực giác (N)</span>
                          </div>
                          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`absolute h-full rounded-full transition-all duration-500 ${
                                percentages.SN.dominant === "N" 
                                  ? percentages.SN.value >= 80 
                                    ? "bg-blue-700" 
                                    : percentages.SN.value >= 60 
                                      ? "bg-blue-600" 
                                      : "bg-blue-500"
                                  : percentages.SN.value >= 80 
                                    ? "bg-purple-700" 
                                    : percentages.SN.value >= 60 
                                      ? "bg-purple-600" 
                                      : "bg-purple-500"
                              }`}
                              style={{ width: `${percentages.SN.value}%` }}
                            />
                          </div>
                          <div className="text-sm text-gray-600 mt-1 text-center">
                            {percentages.SN.dominant === "S" 
                              ? `Cảm nhận ${percentages.SN.value}%` 
                              : `Trực giác ${percentages.SN.value}%`}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Lý trí (T)</span>
                            <span className="font-medium">Cảm xúc (F)</span>
                          </div>
                          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`absolute h-full rounded-full transition-all duration-500 ${
                                percentages.TF.dominant === "F" 
                                  ? percentages.TF.value >= 80 
                                    ? "bg-blue-700" 
                                    : percentages.TF.value >= 60 
                                      ? "bg-blue-600" 
                                      : "bg-blue-500"
                                  : percentages.TF.value >= 80 
                                    ? "bg-purple-700" 
                                    : percentages.TF.value >= 60 
                                      ? "bg-purple-600" 
                                      : "bg-purple-500"
                              }`}
                              style={{ width: `${percentages.TF.value}%` }}
                            />
                          </div>
                          <div className="text-sm text-gray-600 mt-1 text-center">
                            {percentages.TF.dominant === "T" 
                              ? `Lý trí ${percentages.TF.value}%` 
                              : `Cảm xúc ${percentages.TF.value}%`}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Nguyên tắc (J)</span>
                            <span className="font-medium">Linh hoạt (P)</span>
                          </div>
                          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`absolute h-full rounded-full transition-all duration-500 ${
                                percentages.JP.dominant === "P" 
                                  ? percentages.JP.value >= 80 
                                    ? "bg-blue-700" 
                                    : percentages.JP.value >= 60 
                                      ? "bg-blue-600" 
                                      : "bg-blue-500"
                                  : percentages.JP.value >= 80 
                                    ? "bg-purple-700" 
                                    : percentages.JP.value >= 60 
                                      ? "bg-purple-600" 
                                      : "bg-purple-500"
                              }`}
                              style={{ width: `${percentages.JP.value}%` }}
                            />
                          </div>
                          <div className="text-sm text-gray-600 mt-1 text-center">
                            {percentages.JP.dominant === "J" 
                              ? `Nguyên tắc ${percentages.JP.value}%` 
                              : `Linh hoạt ${percentages.JP.value}%`}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <CardFooter className="flex justify-center">
                  <Button onClick={handleReset} variant="outline" className="flex gap-2 hover:bg-gray-100 transition-colors duration-300">
                    <RotateCcw size={18} />
                    <span>Làm lại bài kiểm tra</span>
                  </Button>
                </CardFooter>
              </div>
            )}

            <Alert className="bg-blue-50 border-blue-200">
              <AlertTitle>Lưu ý:</AlertTitle>
              <AlertDescription>
                Kết quả này chỉ mang tính chất tham khảo. MBTI là một công cụ để giúp bạn hiểu rõ hơn về bản thân, không phải là một công cụ đánh giá tâm lý chuyên nghiệp.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MBTIPage;
