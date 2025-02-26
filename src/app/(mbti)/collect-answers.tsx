type CollectAnswerProps = {
  question: {
    id: number;
    text: string;
    dimension: string;
    effect: string;
  };
  onAnswer: (id: number, dimension: string, effect: string, score: number) => void;
}

const CollectAnswers = ({ question, onAnswer }: CollectAnswerProps) => {
  const handleAnswer = (score: number) => {
    onAnswer(question.id, question.dimension, question.effect, score);
  };

  return (
    <div className="question">
    <h3>{question.text}</h3>
    <div className="options">
      {[3, 2, 1, 0, -1, -2, -3].map((score) => (
        <button key={score} onClick={() => handleAnswer(score)}>
          {score > 0 ? `+${score}` : score}
        </button>
      ))}
    </div>
  </div>
  );
}

export default CollectAnswers;