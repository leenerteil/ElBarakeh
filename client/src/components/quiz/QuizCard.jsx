import React, { useState } from 'react';

const QuizCard = ({ question, questionNumber, totalQuestions, onAnswer, userAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (index) => {
    setSelectedOption(index);
    onAnswer(index);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            سؤال {questionNumber} من {totalQuestions}
          </span>
          {userAnswer !== null && (
            <span className={`px-3 py-1 rounded-full text-sm ${userAnswer === question.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {userAnswer === question.correctAnswer ? 'صحيح' : 'غير صحيح'}
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold mt-2">{question.question}</h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={userAnswer !== null}
            className={`w-full text-right p-4 rounded-lg border transition-all ${
              selectedOption === index
                ? 'border-primary-blue bg-blue-50'
                : 'border-gray-200 hover:border-primary-blue hover:bg-blue-50'
            } ${
              userAnswer !== null && index === question.correctAnswer
                ? 'bg-green-50 border-green-500'
                : ''
            } ${
              userAnswer !== null && userAnswer === index && userAnswer !== question.correctAnswer
                ? 'bg-red-50 border-red-500'
                : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">{option}</span>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                selectedOption === index ? 'border-primary-blue' : 'border-gray-300'
              }`}>
                {selectedOption === index && (
                  <div className="w-3 h-3 rounded-full bg-primary-blue"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {userAnswer !== null && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-primary-blue mb-2">شرح الإجابة:</h4>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizCard;