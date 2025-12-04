import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../../components/quiz/QuizCard';
import { quizQuestions } from '../../data/quizData';
import { useAuthStore } from '../../store/authStore';
import { ArrowRight, Trophy, Clock } from 'lucide-react';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleAnswer = (answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const getTimeSpent = () => {
    const minutes = Math.floor((Date.now() - startTime) / 60000);
    const seconds = Math.floor(((Date.now() - startTime) % 60000) / 1000);
    return `${minutes} دقيقة ${seconds} ثانية`;
  };

  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/quiz' } });
    return null;
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizQuestions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">نتيجة الاختبار</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-primary-blue">{score}/{quizQuestions.length}</div>
                  <div className="text-gray-600 mt-2">الإجابات الصحيحة</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-green-600">{percentage.toFixed(0)}%</div>
                  <div className="text-gray-600 mt-2">النسبة المئوية</div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-center space-x-2 space-x-reverse text-gray-600">
                  <Clock size={20} />
                  <span>الوقت المستغرق: {getTimeSpent()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setUserAnswers({});
                    setShowResults(false);
                  }}
                  className="w-full bg-primary-blue text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  إعادة الاختبار
                </button>
                <button
                  onClick={() => navigate('/study')}
                  className="w-full border-2 border-primary-blue text-primary-blue py-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  العودة للمادة الدراسية
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">اختبار القيادة</h1>
            <p className="text-gray-600">
              اختبر معرفتك بقوانين القيادة والسلامة المرورية
            </p>
          </div>

          <QuizCard
            question={quizQuestions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={quizQuestions.length}
            onAnswer={handleAnswer}
            userAnswer={userAnswers[currentQuestion]}
          />

          <div className="flex justify-between mt-8">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              السابق
            </button>

            <button
              onClick={nextQuestion}
              disabled={userAnswers[currentQuestion] === undefined}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 space-x-reverse ${
                userAnswers[currentQuestion] === undefined
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-blue text-white hover:bg-blue-700'
              }`}
            >
              <span>{currentQuestion === quizQuestions.length - 1 ? 'إنهاء الاختبار' : 'التالي'}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;