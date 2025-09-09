import React, { useState, useEffect } from "react";
import "./quizepage.css";
import { questionBank } from "./Questionbank";

const Quiz = () => {
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]); // yaha store karenge random 15 Qs
  const [current, setCurrent] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [reviewQuestion, setReviewQuestion] = useState(null);

  // Category select hone ke baad random 15 questions pick karna
  useEffect(() => {
    if (category) {
      let allQuestions = [...questionBank[category]];

      // Shuffle karna (Fisher-Yates method)
      for (let i = allQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
      }

      // Sirf 15 questions lena (agar available honge)
      setQuestions(allQuestions.slice(0, 15));

      // Timer reset
      setTimeLeft(15 * 60); 
    }
  }, [category]);

  // Timer countdown logic
  useEffect(() => {
    if (!timeLeft || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResult(true); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const handleOptionClick = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [current]: option,
    });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const score = Object.keys(selectedAnswers).reduce((acc, key) => {
    return selectedAnswers[key] === questions[key]?.correct ? acc + 1 : acc;
  }, 0);

  // Format timer MM:SS
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // STEP 1: Agar abhi tak category select nahi hui
  if (!category) {
    return (
      <div className="quiz-container">
        <h2>Select Test Category</h2>
        <div className="category-boxes">
          <div className="category" onClick={() => setCategory("verbal")}>
            Verbal Ability
          </div>
          <div className="category" onClick={() => setCategory("analytical")}>
            Analytical Ability
          </div>
          <div className="category" onClick={() => setCategory("numerical")}>
            Numerical Ability
          </div>
          <div className="category" onClick={() => setCategory("written")}>
            Written English Test
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: Quiz / Result
  return (
    <div className="quiz-container">
      {!showResult ? (
        <div className="question-box">
          {/* Timer */}
          <div className="timer">
            Time Left: <b>{formatTime(timeLeft)}</b>
          </div>

          <p>
            <b>Q{current + 1}.</b> {questions[current]?.text}
          </p>

          <div className="options">
            {questions[current]?.options.map((opt, i) => (
              <label
                key={i}
                className={`option-label ${
                  selectedAnswers[current] === opt ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`q-${current}`}
                  checked={selectedAnswers[current] === opt}
                  onChange={() => handleOptionClick(opt)}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="footer">
            <span>
              {current + 1}/{questions.length}
            </span>
            <button className="submit-btn" onClick={handleNext}>
              {current === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result-box">
          <h2>Your Score: {score} / {questions.length}</h2>
          <h4>Category: {category.toUpperCase()}</h4>
          <table>
            <thead>
              <tr>
                <th>Q.No</th>
                <th>Your Answer</th>
                <th>Correct Answer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, index) => {
                const isCorrect = selectedAnswers[index] === q.correct;
                return (
                  <tr
                    key={q.id}
                    className={!isCorrect ? "clickable-row" : ""}
                    onClick={() => !isCorrect && setReviewQuestion(q)}
                  >
                    <td>{index + 1}</td>
                    <td>{selectedAnswers[index] || "Not Attempted"}</td>
                    <td>{q.correct}</td>
                    <td>{isCorrect ? "✅ Correct" : "❌ Wrong / Not Attempted"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Review Popup */}
          {reviewQuestion && (
            <div className="review-popup">
              <div className="review-content">
                <h3>Review Question</h3>
                <p><b>{reviewQuestion.text}</b></p>
                <ul>
                  {reviewQuestion.options.map((opt, i) => (
                    <li
                      key={i}
                      className={
                        opt === reviewQuestion.correct
                          ? "correct"
                          : selectedAnswers[questions.indexOf(reviewQuestion)] === opt
                          ? "wrong"
                          : ""
                      }
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
                <button className="close-btn" onClick={() => setReviewQuestion(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;


