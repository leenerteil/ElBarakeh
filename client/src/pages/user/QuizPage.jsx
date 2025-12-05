// QuizPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  BarChart3, 
  Award, 
  Clock, 
  ChevronRight, 
  RefreshCw,
  CheckCircle,
  XCircle,
  BookOpen,
  ChevronLeft
} from 'lucide-react';
import QuizCard from '../../components/quiz/QuizCard';
import { 
  quizCategories, 
  getQuestionsByCategory, 
  getAllQuestions 
} from '../../data/quizData';

const QuizPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [questions, setQuestions] = useState([]);
  const [quizMode, setQuizMode] = useState('category'); // 'category', 'mixed', 'exam'

  // Initialize questions based on mode
  useEffect(() => {
    if (quizMode === 'category' && selectedCategory) {
      setQuestions(getQuestionsByCategory(selectedCategory.id, 20));
    } else if (quizMode === 'mixed') {
      const allQuestions = getAllQuestions();
      // Shuffle and take 25 random questions
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 25);
      setQuestions(shuffled);
    } else if (quizMode === 'exam') {
      // Simulate real exam: 30 questions from all categories
      const allQuestions = getAllQuestions();
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 30);
      setQuestions(shuffled);
    }
  }, [quizMode, selectedCategory]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizStarted && !quizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishQuiz();
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizFinished, timeLeft]);

  const handleStartQuiz = () => {
    if (quizMode === 'category' && !selectedCategory) {
      alert('الرجاء اختيار قسم للبدء');
      return;
    }
    setQuizStarted(true);
    setUserAnswers(new Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setQuizFinished(false);
    setTimeLeft(quizMode === 'exam' ? 1800 : 1200); // 30 min for exam, 20 min otherwise
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const finishQuiz = () => {
    setQuizFinished(true);
  };

  const calculateScore = () => {
    const correctAnswers = userAnswers.reduce((count, answer, index) => {
      return count + (answer === questions[index]?.correctAnswer ? 1 : 0);
    }, 0);
    return correctAnswers;
  };

  const getGrade = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { grade: 'ممتاز', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'جيد جداً', color: 'text-blue-600' };
    if (percentage >= 70) return { grade: 'جيد', color: 'text-yellow-600' };
    if (percentage >= 60) return { grade: 'مقبول', color: 'text-orange-600' };
    return { grade: 'راسب', color: 'text-red-600' };
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setSelectedCategory(null);
    setUserAnswers([]);
    setCurrentQuestion(0);
    setTimeLeft(1800);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-2 sm:px-4 md:px-6" dir="rtl">
        {/* Full width container - no max-w restriction */}
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-3">
              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 sm:ml-3" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">اختبارات القيادة</h1>
            </div>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-4xl mx-auto px-4">
              اختبر معرفتك بقوانين وإشارات المرور من خلال الاختبارات التفاعلية
            </p>
          </div>

          {/* Quiz Modes - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 px-2 sm:px-0">
            <div 
              className={`p-4 sm:p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
                quizMode === 'category' 
                  ? 'bg-blue-50 border-2 border-blue-500' 
                  : 'bg-white hover:shadow-xl'
              }`}
              onClick={() => setQuizMode('category')}
            >
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3">
                <div className={`p-3 rounded-lg sm:ml-3 ${
                  quizMode === 'category' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Award className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    quizMode === 'category' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-center sm:text-right">اختبار حسب الأقسام</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                اختر قسم معين واختبر نفسك في 20 سؤال من هذا القسم
              </p>
            </div>

            <div 
              className={`p-4 sm:p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
                quizMode === 'mixed' 
                  ? 'bg-green-50 border-2 border-green-500' 
                  : 'bg-white hover:shadow-xl'
              }`}
              onClick={() => setQuizMode('mixed')}
            >
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3">
                <div className={`p-3 rounded-lg sm:ml-3 ${
                  quizMode === 'mixed' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <RefreshCw className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    quizMode === 'mixed' ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-center sm:text-right">اختبار مختلط</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                25 سؤال عشوائي من جميع الأقسام لاختبار معرفتك الشاملة
              </p>
            </div>

            <div 
              className={`p-4 sm:p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
                quizMode === 'exam' 
                  ? 'bg-red-50 border-2 border-red-500' 
                  : 'bg-white hover:shadow-xl'
              }`}
              onClick={() => setQuizMode('exam')}
            >
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3">
                <div className={`p-3 rounded-lg sm:ml-3 ${
                  quizMode === 'exam' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <Clock className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    quizMode === 'exam' ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-center sm:text-right">محاكاة الامتحان</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                30 سؤال بوقت محدد لمحاكاة امتحان القيادة الحقيقي
              </p>
            </div>
          </div>

          {/* Category Selection (only for category mode) */}
          {quizMode === 'category' && (
            <div className="mb-8 px-2 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 text-center sm:text-right px-2">اختر قسم الاختبار:</h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {quizCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-3 sm:p-4 md:p-5 rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
                      selectedCategory?.id === category.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-white hover:shadow-lg hover:border-blue-300 hover:border'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex items-center">
                      <span className="text-xl sm:text-2xl ml-2 sm:ml-3">{category.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm sm:text-base md:text-lg truncate">{category.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">20 سؤال</p>
                      </div>
                      {selectedCategory?.id === category.id && (
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-1 sm:mr-2 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Start Button */}
          <div className="text-center px-2 sm:px-0">
            <button
              onClick={handleStartQuiz}
              disabled={quizMode === 'category' && !selectedCategory}
              className={`w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center mx-auto ${
                quizMode === 'category' && !selectedCategory
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              } transition-all duration-300`}
            >
              <Play className="ml-1 sm:ml-2" size={20} />
              {quizMode === 'exam' ? 'بدء الامتحان' : 'بدء الاختبار'}
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-8 sm:mt-12 bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mx-2 sm:mx-0">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 text-center sm:text-right">تعليمات الاختبار:</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="bg-blue-100 p-1 rounded ml-2 sm:ml-3 mt-1 flex-shrink-0">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <span className="text-sm sm:text-base">اختر الإجابة الصحيحة من بين الخيارات الأربعة</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-1 rounded ml-2 sm:ml-3 mt-1 flex-shrink-0">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <span className="text-sm sm:text-base">يمكنك التصحيح والرجوع إلى الأسئلة السابقة</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-1 rounded ml-2 sm:ml-3 mt-1 flex-shrink-0">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <span className="text-sm sm:text-base">سيظهر لك التصحيح بعد إنهاء الاختبار</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-1 rounded ml-2 sm:ml-3 mt-1 flex-shrink-0">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <span className="text-sm sm:text-base">يجب الحصول على 70% على الأقل لاجتياز الاختبار</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (quizFinished) {
    const score = calculateScore();
    const total = questions.length;
    const percentage = (score / total) * 100;
    const grade = getGrade(score, total);

    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-2 sm:px-4" dir="rtl">
        {/* Full width results container */}
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            {/* Results Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 mb-3 sm:mb-4">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">نتيجة الاختبار</h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                {selectedCategory ? `قسم: ${selectedCategory.name}` : 'اختبار مختلط'}
              </p>
            </div>

            {/* Score Card - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-blue-50 rounded-xl p-4 sm:p-6 text-center">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-1 sm:mb-2">{score}/{total}</div>
                <div className="text-gray-700 text-sm sm:text-base">الإجابات الصحيحة</div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 sm:p-6 text-center">
                <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-1 sm:mb-2">{percentage.toFixed(1)}%</div>
                <div className="text-gray-700 text-sm sm:text-base">النسبة المئوية</div>
              </div>
              
              <div className={`${percentage >= 70 ? 'bg-green-50' : 'bg-red-50'} rounded-xl p-4 sm:p-6 text-center`}>
                <div className={`text-3xl sm:text-4xl font-bold ${grade.color} mb-1 sm:mb-2`}>{grade.grade}</div>
                <div className="text-gray-700 text-sm sm:text-base">التقدير</div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 text-center sm:text-right">تفاصيل النتيجة:</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 text-sm sm:text-base">الوقت المستغرق</span>
                  <span className="font-semibold text-sm sm:text-base">{formatTime(1800 - timeLeft)}</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 text-sm sm:text-base">عدد الأسئلة</span>
                  <span className="font-semibold text-sm sm:text-base">{total} سؤال</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 text-sm sm:text-base">نسبة النجاح المطلوبة</span>
                  <span className="font-semibold text-sm sm:text-base">70%</span>
                </div>
              </div>
            </div>

            {/* Pass/Fail Message */}
            <div className={`p-4 sm:p-6 rounded-xl mb-6 sm:mb-8 ${
              percentage >= 70 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                {percentage >= 70 ? (
                  <>
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
                    <div className="text-center sm:text-right">
                      <h4 className="text-lg sm:text-xl font-semibold text-green-800">مبروك! لقد اجتزت الاختبار</h4>
                      <p className="text-green-600 mt-1 text-sm sm:text-base">مستوى معرفتك جيد جداً في قوانين وإشارات المرور</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 flex-shrink-0" />
                    <div className="text-center sm:text-right">
                      <h4 className="text-lg sm:text-xl font-semibold text-red-800">لم تجتز الاختبار</h4>
                      <p className="text-red-600 mt-1 text-sm sm:text-base">ننصحك بمراجعة المواد التعليمية والمحاولة مرة أخرى</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center text-sm sm:text-base"
              >
                <RefreshCw className="ml-1 sm:ml-2" size={18} />
                اختبار جديد
              </button>
              
              <button
                onClick={() => {
                  setQuizFinished(false);
                  setCurrentQuestion(0);
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center text-sm sm:text-base"
              >
                <BarChart3 className="ml-1 sm:ml-2" size={18} />
                مراجعة الإجابات
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Quiz Interface
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 px-2 sm:px-4" dir="rtl">
      {/* Full width container */}
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Quiz Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div className="text-center md:text-right">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
                {selectedCategory?.name || 'اختبار مختلط'}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                سؤال {currentQuestion + 1} من {questions.length}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex items-center bg-blue-50 px-3 sm:px-4 py-1 sm:py-2 rounded-lg w-full sm:w-auto justify-center">
                <Clock className="ml-1 sm:ml-2 text-blue-600" size={18} />
                <span className="font-semibold text-blue-700 text-sm sm:text-base">{formatTime(timeLeft)}</span>
              </div>
              
              <button
                onClick={finishQuiz}
                className="px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold w-full sm:w-auto text-sm sm:text-base"
              >
                إنهاء الاختبار
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 sm:mt-6">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
              <span>تقدم الاختبار</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Quiz Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Main Content - Quiz Card */}
          <div className="lg:flex-1">
            <QuizCard
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
              userAnswer={userAnswers[currentQuestion]}
              showResults={false}
            />
          </div>

          {/* Sidebar - Question Navigator with Navigation Buttons */}
          <div className="lg:w-80 xl:w-96">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-4 sm:top-6">
              <h3 className="font-bold text-xl mb-4 sm:mb-5 text-gray-800 text-center">قائمة الأسئلة</h3>
              
              <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-2 mb-6">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleJumpToQuestion(index)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg transition-all ${
                      currentQuestion === index
                        ? 'bg-blue-600 text-white ring-4 ring-blue-300 scale-105'
                        : userAnswers[index] !== null
                        ? 'bg-green-100 text-green-800 hover:bg-green-200 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              {/* Navigation Buttons Under Question Numbers */}
              <div className="flex flex-col gap-3 sm:gap-4 mt-6 pt-6 border-t-2 border-gray-200">
                <div className="flex gap-3">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className={`flex-1 px-4 py-3 rounded-lg font-bold text-base sm:text-lg flex items-center justify-center ${
                      currentQuestion === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-300'
                    }`}
                  >
                    <ChevronLeft className="ml-2 rotate-180" size={22} />
                    السابق
                  </button>
                  
                  <button
                    onClick={handleNextQuestion}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-base sm:text-lg flex items-center justify-center border-2 border-blue-700"
                  >
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        التالي
                        <ChevronLeft className="mr-2" size={22} />
                      </>
                    ) : (
                      <>
                        إنهاء
                        <Award className="mr-2" size={22} />
                      </>
                    )}
                  </button>
                </div>
                
                {userAnswers[currentQuestion] !== null && (
                  <div className="px-4 py-3 bg-green-100 text-green-800 rounded-lg border-2 border-green-300 font-bold text-center text-base">
                    ✓ تم الإجابة على السؤال الحالي
                  </div>
                )}
              </div>
              
        
              <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-4">
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-green-100 border-2 border-green-400 ml-2 sm:ml-3"></div>
                  <span className="text-base sm:text-lg font-medium text-gray-800">تمت الإجابة</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-blue-600 ml-2 sm:ml-3"></div>
                  <span className="text-base sm:text-lg font-medium text-gray-800">السؤال الحالي</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-gray-100 border-2 border-gray-400 ml-2 sm:ml-3"></div>
                  <span className="text-base sm:text-lg font-medium text-gray-800">لم تتم الإجابة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;