import React, { useState } from 'react';

const TravelStyleQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [travelStyle, setTravelStyle] = useState('');
  const [answers, setAnswers] = useState({
    adventure: 0,
    relaxation: 0,
    culture: 0,
    luxury: 0,
    budget: 0
  });

  const questions = [
    {
      text: "How do you prefer to spend your free time?",
      options: [
        { text: "Hiking and outdoor activities", category: "adventure", score: 2 },
        { text: "Visiting museums and historical sites", category: "culture", score: 2 },
        { text: "Relaxing by the beach or pool", category: "relaxation", score: 2 },
        { text: "Exploring high-end restaurants and spas", category: "luxury", score: 2 }
      ]
    },
    {
      text: "What's your ideal vacation budget?",
      options: [
        { text: "Budget-friendly, looking for deals", category: "budget", score: 2 },
        { text: "Moderate, willing to spend for comfort", category: "relaxation", score: 1 },
        { text: "No limits, I want the best experience", category: "luxury", score: 2 }
      ]
    },
    {
      text: "What type of accommodations do you prefer?",
      options: [
        { text: "Hostels or camping", category: "adventure", score: 2 },
        { text: "Boutique hotels with local charm", category: "culture", score: 2 },
        { text: "All-inclusive resorts", category: "luxury", score: 2 },
        { text: "Affordable, clean hotels", category: "budget", score: 2 }
      ]
    },
    {
      text: "How do you like to experience local cuisine?",
      options: [
        { text: "Street food and local markets", category: "adventure", score: 2 },
        { text: "Fine dining and gourmet restaurants", category: "luxury", score: 2 },
        { text: "Cooking classes and food tours", category: "culture", score: 2 },
        { text: "Simple, familiar meals", category: "budget", score: 2 }
      ]
    },
    {
      text: "What's your preferred travel pace?",
      options: [
        { text: "Packed itinerary, see everything possible", category: "adventure", score: 2 },
        { text: "Slow and relaxed, plenty of downtime", category: "relaxation", score: 2 },
        { text: "Balanced mix of activities and rest", category: "culture", score: 1 },
        { text: "Guided tours and structured experiences", category: "luxury", score: 2 }
      ]
    }
  ];

  const travelStyleDescriptions = {
    adventure: "You're an Adventure Traveler! You love active, exciting trips that challenge you physically and offer unique experiences.",
    relaxation: "You're a Relaxation Traveler! Your ideal trip is about unwinding, recharging, and escaping from daily stress.",
    culture: "You're a Cultural Traveler! You're passionate about exploring local traditions, history, and experiencing new ways of life.",
    luxury: "You're a Luxury Traveler! You enjoy high-end experiences, comfort, and premium services.",
    budget: "You're a Budget Traveler! You're smart about spending, focusing on value and making the most of your travel funds."
  };

  const handleAnswer = (option) => {
    const newAnswers = { ...answers };
    newAnswers[option.category] += option.score;
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswers(newAnswers);
    } else {
      determineResult(newAnswers);
    }
  };

  const determineResult = (finalScores) => {
    const maxScore = Math.max(...Object.values(finalScores));
    const topCategories = Object.keys(finalScores)
      .filter(category => finalScores[category] === maxScore);

    let result = '';
    if (topCategories.length === 1) {
      result = topCategories[0];
    } else if (topCategories.length > 1) {
      result = topCategories.join(' and ');
    }

    setTravelStyle(result);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizCompleted(false);
    setTravelStyle('');
    setAnswers({
      adventure: 0,
      relaxation: 0,
      culture: 0,
      luxury: 0,
      budget: 0
    });
  };

  if (quizCompleted) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100%'}}>
        <div className="w-100">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="card-title mb-3">{travelStyle.toUpperCase()} Traveler</h2>
              <p className="card-text text-muted mb-4">
                {travelStyleDescriptions[travelStyle.split(' and ')[0]]}
              </p>
              <button 
                onClick={resetQuiz} 
                className="btn btn-primary w-100"
              >
                Take Quiz Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '100%'}}>
      <div className="w-100">
        <div className="text-center">
          <div className="card-body">
            <h5 className="card-title mb-4">{currentQuestionData.text}</h5>
            <div className="d-grid gap-2">
              {currentQuestionData.options.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswer(option)} 
                  className="btn btn-outline-primary"
                >
                  {option.text}
                </button>
              ))}
            </div>
            <p className="mt-3 text-muted">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelStyleQuiz;