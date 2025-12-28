import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw, CheckCircle, XCircle } from "lucide-react";

interface Question {
  question: string;
  currentDirection: "up" | "down" | "left" | "right";
  correctAnswer:
    | "clockwise"
    | "counterclockwise"
    | "up"
    | "down"
    | "into"
    | "out";
  options: string[];
}

const questions: Question[] = [
  {
    question:
      "Current flows upward. What is the direction of the magnetic field on the right side?",
    currentDirection: "up",
    correctAnswer: "out",
    options: ["Into the page", "Out of the page", "Upward", "Downward"],
  },
  {
    question:
      "Current flows to the right. What is the direction of the magnetic field above the wire?",
    currentDirection: "right",
    correctAnswer: "out",
    options: ["Into the page", "Out of the page", "Left", "Right"],
  },
  {
    question:
      "Current flows downward. What is the direction of the magnetic field on the left side?",
    currentDirection: "down",
    correctAnswer: "out",
    options: ["Into the page", "Out of the page", "Upward", "Downward"],
  },
];

const RightHandRule = () => {
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [animateHand, setAnimateHand] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateHand((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer
      .toLowerCase()
      .includes(questions[currentQuestion].correctAnswer);
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // End of quiz
        setTimeout(() => {
          setPracticeMode(false);
          setCurrentQuestion(0);
          setSelectedAnswer(null);
        }, 2000);
      }
    }, 1500);
  };

  const resetPractice = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setPracticeMode(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Right-Hand Thumb Rule Helper</CardTitle>
        <CardDescription>
          Learn and practice the right-hand thumb rule for determining magnetic
          field direction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!practiceMode ? (
            <>
              {/* Visual Guide */}
              <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-8">
                <h3 className="text-xl font-bold text-center mb-6 text-purple-900 dark:text-purple-100">
                  The Right-Hand Thumb Rule
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Hand Illustration */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-64 h-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
                      {/* Simplified hand illustration using SVG */}
                      <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                        {/* Palm */}
                        <ellipse
                          cx="100"
                          cy="120"
                          rx="40"
                          ry="50"
                          fill="currentColor"
                          className="text-amber-200 dark:text-amber-700"
                        />

                        {/* Thumb (pointing up) */}
                        <g
                          className={`transition-transform duration-1000 ${
                            animateHand ? "translate-y-2" : ""
                          }`}
                        >
                          <path
                            d="M 70 120 Q 60 100, 60 80 L 60 60 Q 60 50, 70 50 Q 80 50, 80 60 L 80 80 Q 80 100, 70 120"
                            fill="currentColor"
                            className="text-amber-300 dark:text-amber-600"
                          />
                          {/* Thumb arrow */}
                          <path
                            d="M 70 40 L 65 50 L 75 50 Z"
                            fill="currentColor"
                            className="text-blue-500"
                          />
                          <text
                            x="50"
                            y="35"
                            className="text-xs font-bold fill-blue-600 dark:fill-blue-400"
                          >
                            Current
                          </text>
                        </g>

                        {/* Fingers (curling) */}
                        <g
                          className={`transition-transform duration-1000 ${
                            animateHand ? "rotate-12" : ""
                          }`}
                          style={{ transformOrigin: "100px 120px" }}
                        >
                          {[0, 1, 2, 3].map((i) => (
                            <path
                              key={i}
                              d={`M ${110 + i * 12} 120 Q ${
                                120 + i * 12
                              } 100, ${115 + i * 12} 80 L ${
                                115 + i * 12
                              } 60 Q ${115 + i * 12} 50, ${120 + i * 12} 55 Q ${
                                125 + i * 12
                              } 50, ${125 + i * 12} 60 L ${125 + i * 12} 80 Q ${
                                130 + i * 12
                              } 100, ${120 + i * 12} 120`}
                              fill="currentColor"
                              className="text-amber-300 dark:text-amber-600"
                            />
                          ))}
                        </g>

                        {/* Circular arrow for magnetic field */}
                        <g>
                          <path
                            d="M 100 120 m 60 0 a 60 60 0 0 1 -120 0 a 60 60 0 0 1 120 0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-green-500 dark:text-green-400"
                            strokeDasharray="5,5"
                          />
                          <path
                            d="M 45 120 L 40 115 L 40 125 Z"
                            fill="currentColor"
                            className="text-green-500 dark:text-green-400"
                          />
                          <text
                            x="165"
                            y="125"
                            className="text-xs font-bold fill-green-600 dark:fill-green-400"
                          >
                            Field
                          </text>
                        </g>
                      </svg>
                    </div>
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                      Animated demonstration
                    </p>
                  </div>

                  {/* Instructions */}
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Point your thumb
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Point your right thumb in the direction of the
                            conventional current flow
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Curl your fingers
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Curl your fingers around the wire naturally
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Find the field direction
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Your curled fingers point in the direction of the
                            magnetic field lines
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practice Mode Button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={resetPractice}
                  className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <RotateCw className="mr-2 w-5 h-5" />
                  Start Practice Mode
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Practice Mode */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">
                    Question {currentQuestion + 1} of {questions.length}
                  </h3>
                  <div className="text-sm font-semibold px-3 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">
                    Score: {score}/{questions.length}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-lg mb-4">
                    {questions[currentQuestion].question}
                  </p>

                  {/* Visual representation */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-6 flex items-center justify-center min-h-50">
                    <div className="relative">
                      {/* Wire with current */}
                      {questions[currentQuestion].currentDirection === "up" && (
                        <div className="w-4 h-40 bg-amber-600 rounded relative">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-8 border-b-blue-500"></div>
                            <div className="text-xs font-bold text-blue-600 whitespace-nowrap">
                              I
                            </div>
                          </div>
                        </div>
                      )}
                      {questions[currentQuestion].currentDirection ===
                        "right" && (
                        <div className="w-40 h-4 bg-amber-600 rounded relative">
                          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
                            <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-blue-500"></div>
                            <div className="text-xs font-bold text-blue-600 absolute -right-4 -top-5">
                              I
                            </div>
                          </div>
                        </div>
                      )}
                      {questions[currentQuestion].currentDirection ===
                        "down" && (
                        <div className="w-4 h-40 bg-amber-600 rounded relative">
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-blue-500"></div>
                            <div className="text-xs font-bold text-blue-600 whitespace-nowrap">
                              I
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Answer options */}
                  <div className="grid grid-cols-2 gap-3">
                    {questions[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option
                        .toLowerCase()
                        .includes(questions[currentQuestion].correctAnswer);
                      const showResult = selectedAnswer !== null;

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
                          disabled={selectedAnswer !== null}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            !showResult
                              ? "border-gray-300 hover:border-purple-500 hover:bg-purple-50 dark:border-gray-600 dark:hover:border-purple-400 dark:hover:bg-purple-900/20"
                              : isSelected
                              ? isCorrect
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : "border-red-500 bg-red-50 dark:bg-red-900/20"
                              : isCorrect
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : "border-gray-300 dark:border-gray-600 opacity-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showResult &&
                              isSelected &&
                              (isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              ))}
                            {showResult && !isSelected && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setPracticeMode(false)}
                >
                  Return to Guide
                </Button>
              </div>
            </>
          )}

          {/* Key Points */}
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
              Remember
            </h4>
            <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1 list-disc list-inside">
              <li>Always use your RIGHT hand (not left!)</li>
              <li>
                Thumb = Current direction (conventional, not electron flow)
              </li>
              <li>Fingers = Magnetic field direction</li>
              <li>The field forms concentric circles around the wire</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RightHandRule;
