const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const feedbackElement = document.getElementById('feedback');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const detailedFeedbackElement = document.getElementById('detailed-feedback');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let totalQuestions = 10;
let userAnswers = [];

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true }
    ]
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "Leo Tolstoy", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false }
    ]
  },
  {
    question: "What is the speed of light?",
    answers: [
      { text: "300,000 km/s", correct: true },
      { text: "150,000 km/s", correct: false },
      { text: "500,000 km/s", correct: false },
      { text: "100,000 km/s", correct: false }
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Claude Monet", correct: false }
    ]
  },
  {
    question: "What is the smallest unit of life?",
    answers: [
      { text: "Organ", correct: false },
      { text: "Cell", correct: true },
      { text: "Tissue", correct: false },
      { text: "Organism", correct: false }
    ]
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "O2", correct: false },
      { text: "CO2", correct: false },
      { text: "HO", correct: false }
    ]
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "K2", correct: false },
      { text: "Mount Kilimanjaro", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Denali", correct: false }
    ]
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Gold", correct: false },
      { text: "Iron", correct: false },
      { text: "Diamond", correct: true },
      { text: "Silver", correct: false }
    ]
  }
];

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    setNextQuestion();
  } else {
    endQuiz();
  }
});
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
  startButton.classList.add('hidden');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, totalQuestions);
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  questionContainer.classList.remove('hidden');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const label = document.createElement('label');
    label.classList.add('block', 'bg-gray-200', 'text-black', 'py-2', 'px-4', 'rounded', 'cursor-pointer');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'answer';
    checkbox.value = answer.text;
    checkbox.classList.add('mr-2');
    
    if (answer.correct) {
      checkbox.dataset.correct = answer.correct;
    }

    checkbox.addEventListener('change', (e) => selectAnswer(e, index));
    
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(answer.text));
    answerButtonsElement.appendChild(label);
  });
}

function resetState() {
  feedbackElement.classList.add('hidden');
  nextButton.classList.add('hidden');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e, index) {
  const selectedCheckbox = e.target;
  const allCheckboxes = document.querySelectorAll('input[name="answer"]');
  allCheckboxes.forEach((checkbox, idx) => {
    if (idx !== index) {
      checkbox.checked = false;
    }
  });
  const correct = selectedCheckbox.dataset.correct;
  if (correct) {
    feedbackElement.innerText = 'Correct!';
    feedbackElement.classList.add('text-green-500');
    feedbackElement.classList.remove('text-red-500');
    score++;
  } else {
    feedbackElement.innerText = 'Incorrect!';
    feedbackElement.classList.add('text-red-500');
    feedbackElement.classList.remove('text-green-500');
  }
  userAnswers.push({
    question: shuffledQuestions[currentQuestionIndex].question,
    answer: selectedCheckbox.value,
    correct: !!correct
  });
  feedbackElement.classList.remove('hidden');
  nextButton.classList.remove('hidden');
}

function endQuiz() {
  questionContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreElement.innerText = `You got ${score} out of ${totalQuestions} questions correct.`;
  showDetailedFeedback();
}

function showDetailedFeedback() {
  let feedbackHtml = '<h3 class="text-lg font-bold mb-2">Detailed Feedback:</h3>';
  userAnswers.forEach((answer, index) => {
    feedbackHtml += `
      <div class=" bg-blue-700 text-black p-4 mb-2 rounded">
        <p><strong>Question ${index + 1}:</strong> ${answer.question}</p>
        <p><strong>Your Answer:</strong> ${answer.answer}</p>
        <p><strong>Result:</strong> ${answer.correct ? 'Correct' : 'Incorrect'}</p>
      </div>
    `;
  });
  detailedFeedbackElement.innerHTML = feedbackHtml;
  detailedFeedbackElement.classList.remove('hidden');
}

function restartQuiz() {
  resultContainer.classList.add('hidden');
  startButton.classList.remove('hidden');
  questionContainer.classList.add('hidden');
  detailedFeedbackElement.classList.add('hidden');
  startQuiz();
}