import MBTIPage from "./(mbti)/page";

export default function Home() {
  // const [answers, setAnswers] = useState({});
  // const [result, setResult] = useState("");

  // const handleAnswer = (id, value) => {
  //   setAnswers({ ...answers, [id]: value });
  // };

  // const calculateResult = () => {
  //   const scores = { IE: 0, SN: 0, TF: 0, JP: 0 };

  //   questions.forEach(({ id, dimension }) => {
  //     if (answers[id] !== undefined) {
  //       scores[dimension] += answers[id];
  //     }
  //   });

  //   const mbtiType =
  //     (scores.IE >= 0 ? "E" : "I") +
  //     (scores.SN >= 0 ? "N" : "S") +
  //     (scores.TF >= 0 ? "T" : "F") +
  //     (scores.JP >= 0 ? "J" : "P");

  //   setResult(mbtiType);
  // };

  return (
    <>
      <MBTIPage />
    </>
  );
}
