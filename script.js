const quizData = [
    {
        question: "Qual é o maior animal terrestre do mundo?",
        options: ["Rinoceronte", "Elefante Africano", "Girafa", "Hipopótamo"],
        correct: 1
    },
    {
        question: "Qual destes animais é conhecido por ser o mais rápido da terra?",
        options: ["Leão", "Antílope", "Guepardo", "Cavalo"],
        correct: 2
    },
    {
        question: "Quantos corações tem um polvo?",
        options: ["1", "2", "3", "4"],
        correct: 2
    },
    {
        question: "Qual é a única ave que consegue voar para trás?",
        options: ["Beija-flor", "Andorinha", "Pica-pau", "Papagaio"],
        correct: 0
    },
    {
        question: "Onde se localiza o coração do camarão?",
        options: ["Na cauda", "No abdômen", "Nas patas", "Na cabeça"],
        correct: 3
    },
    {
        question: "Qual animal é conhecido como o 'Rei da Selva'?",
        options: ["Tigre", "Leão", "Gorila", "Elefante"],
        correct: 1
    },
    {
        question: "Qual destes animais é um mamífero que põe ovos?",
        options: ["Canguru", "Morcego", "Ornitorrinco", "Baleia"],
        correct: 2
    },
    {
        question: "Quantos estômagos tem uma vaca?",
        options: ["1 (com 4 compartimentos)", "2", "3", "4 estômagos separados"],
        correct: 0
    },
    {
        question: "Qual é o maior mamífero do mundo?",
        options: ["Elefante", "Tubarão Baleia", "Baleia Azul", "Lula Gigante"],
        correct: 2
    },
    {
        question: "Qual réptil é capaz de mudar de cor para se camuflar?",
        options: ["Lagartixa", "Jacaré", "Iguana", "Camaleão"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizContainer = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const progressTextEl = document.getElementById('progress-text');
const progressFillEl = document.getElementById('progress-fill');
const nextBtn = document.getElementById('next-btn');
const resultScreen = document.getElementById('result-screen');
const scoreText = document.getElementById('score-text');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');

function loadQuiz() {
    answered = false; 
    nextBtn.disabled = true;
    
    const currentQuizData = quizData[currentQuestion];
    
    progressTextEl.innerText = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    
    // Atualiza barra de progresso
    const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
    progressFillEl.style.width = `${progressPercent}%`;

    questionEl.innerText = currentQuizData.question;
    optionsEl.innerHTML = '';

    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.innerText = option;
        button.addEventListener('click', () => handleAnswer(index, button));
        optionsEl.appendChild(button);
    });
}

function handleAnswer(selectedIndex, clickedButton) {
    if (answered) return; 
    answered = true;

    const correctIndex = quizData[currentQuestion].correct;
    const allButtons = document.querySelectorAll('.option-btn');

    if (selectedIndex === correctIndex) {
        clickedButton.classList.add('correct');
        score++;
    } else {
        clickedButton.classList.add('wrong');
        allButtons[correctIndex].classList.add('correct');
    }

    allButtons.forEach(btn => btn.disabled = true);
    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    progressFillEl.style.width = `100%`;

    scoreText.innerText = `${score}/${quizData.length}`;

    if (score <= 4) {
        messageEl.innerText = "Continue aprendendo sobre os animais! 🐾";
    } else if (score <= 7) {
        messageEl.innerText = "Muito bem! Você sabe bastante! 🦒";
    } else {
        messageEl.innerText = "Excelente! Você é fera no mundo animal! 🦁";
    }
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuiz();
});

loadQuiz();