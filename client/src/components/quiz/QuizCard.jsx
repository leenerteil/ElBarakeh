// QuizCard.jsx
import React, { useState } from 'react';
import { Image } from 'lucide-react';

const QuizCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  userAnswer,
  showResults 
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [imageError, setImageError] = useState(false);

  const handleSelect = (index) => {
    if (showResults) return;
    setSelectedOption(index);
    onAnswer(index);
  };

  const isCorrect = userAnswer === question.correctAnswer;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-6xl mx-auto w-full" dir="rtl">
      {/* Header Section - Bigger and no gaps */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-lg sm:text-xl font-semibold text-gray-700">
            سؤال {questionNumber} من {totalQuestions}
          </span>
          <span className={`px-3 py-1.5 rounded-lg text-base font-bold ${
            question.image ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' : 'bg-gray-100 text-gray-800 border-2 border-gray-300'
          }`}>
            {question.image ? 'سؤال بصري' : 'سؤال نصي'}
          </span>
        </div>
        
        {showResults && (
          <span className={`px-4 py-2 rounded-full text-base font-bold ${
            isCorrect 
              ? 'bg-green-100 text-green-800 border-2 border-green-400' 
              : 'bg-red-100 text-red-800 border-2 border-red-400'
          }`}>
            {isCorrect ? '✓ إجابة صحيحة' : '✗ إجابة خاطئة'}
          </span>
        )}
      </div>

      {/* Main Content Grid - Adjusted to eliminate gaps */}
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-6">
        {/* Image Section - Square Container - Made bigger */}
        {question.image && (
          <div className="lg:w-2/5 mb-6 lg:mb-0">
            <div className="mb-3">
              <h4 className="text-gray-800 font-bold flex items-center text-base sm:text-lg">
                <Image className="ml-2 w-5 h-5" />
                إشارة المرور
              </h4>
            </div>
            
            <div className="relative overflow-hidden rounded-xl bg-gray-50 p-4 border-2 border-gray-300">
              {!imageError ? (
                <div className="aspect-square flex items-center justify-center p-2">
                  <img 
                    src={question.image} 
                    alt="إشارة مرور" 
                    className="w-full h-full object-contain"
                    onError={handleImageError}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      maxWidth: '380px',
                      maxHeight: '380px'
                    }}
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4">
                  <Image className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-600 text-sm">لم يتم تحميل الصورة</p>
                  <button 
                    onClick={() => setImageError(false)}
                    className="mt-3 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors border border-blue-300"
                  >
                    حاول مرة أخرى
                  </button>
                </div>
              )}
            </div>
            
            {!imageError && (
              <div className="mt-3 text-sm text-gray-600 text-center font-medium">
                <span>صورة إشارة مرور حقيقية</span>
              </div>
            )}
          </div>
        )}

        {/* Question and Options Section - Adjusted spacing */}
        <div className={`${question.image ? 'lg:w-3/5' : 'w-full'}`}>
        
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-6">
              {question.question}
            </h3>
          </div>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index || userAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              
              let buttonClass = "w-full text-right p-5 rounded-xl border-2 transition-all duration-200 text-lg sm:text-xl font-medium ";
              
              if (showResults) {
                if (isCorrectOption) {
                  buttonClass += "bg-green-50 border-green-600 text-green-900 shadow-md";
                } else if (isSelected && !isCorrectOption) {
                  buttonClass += "bg-red-50 border-red-600 text-red-900 shadow-md";
                } else {
                  buttonClass += "border-gray-300 bg-gray-100";
                }
              } else {
                buttonClass += isSelected 
                  ? "border-blue-600 bg-blue-100 text-blue-900 shadow-md" 
                  : "border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md bg-white";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showResults}
                  className={`${buttonClass} group`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      <span className="ml-4 text-gray-600 font-bold flex-shrink-0 text-xl">
                        {String.fromCharCode(1632 + index + 1)}.
                      </span>
                      <span className="font-bold text-right pr-3 text-lg">{option}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 ${
                      isSelected ? 'border-blue-600' : 'border-gray-400'
                    }`}>
                      {isSelected && !showResults && (
                        <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                      )}
                      {showResults && isCorrectOption && (
                        <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                          <span className="text-white text-base font-bold">✓</span>
                        </div>
                      )}
                      {showResults && isSelected && !isCorrectOption && (
                        <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                          <span className="text-white text-base font-bold">✗</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Section - Adjusted spacing */}
          {showResults && question.explanation && (
            <div className="mt-8 p-5 sm:p-6 bg-blue-50 rounded-xl border-2 border-blue-300">
              <h4 className="font-bold text-blue-900 mb-4 flex items-center text-lg sm:text-xl">
                <span className="ml-2 text-xl">💡</span>
                <span>شرح الإجابة</span>
              </h4>
              <p className="text-gray-800 leading-relaxed text-lg">{question.explanation}</p>
              
              {/* Tips Section */}
              <div className="mt-5 pt-5 border-t-2 border-blue-300">
                <h5 className="font-bold text-blue-800 mb-3 flex items-center text-lg sm:text-xl">
                  <span className="ml-2 text-xl">📝</span>
                  <span>نصيحة مهمة</span>
                </h5>
                <p className="text-gray-700 text-lg">
                  {question.image 
                    ? 'تذكر دائماً أن إشارات المرور تهدف إلى تنظيم حركة السير وضمان السلامة للجميع.'
                    : 'الالتزام بقوانين المرور يحافظ على سلامتك وسلامة الآخرين على الطريق.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;