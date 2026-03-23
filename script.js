// Banco de dados de perguntas
const quizData = [
    {
        question: "Qual é o maior animal terrestre do mundo?",
        options: ["Rinoceronte", "Elefante Africano", "Girafa", "Hipopótamo"],
        correct: 1
    },
    {
        question: "Qual destes animais é conhecido por ser o mais rápido da terra?",
        options: ["Leão", "Antílope", "Guepardo (Guepardo)", "Cavalo"],
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
        question: "Qual é o maior mamífero do mundo (terrestre ou marinho)?",
        options: ["Elefante", "Tubarão Baleia", "Baleia Azul", "Lula Gigante"],
        correct: 2
    },
    {
        question: "Qual réptil é capaz de mudar de cor para se camuflar?",
        options: ["Lagartixa", "Jacaré", "Iguana", "Camaleão"],
        correct: 3
    }
];

// Variáveis de estado do jogo
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Referências aos elementos do DOM
const quizContainer = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const progressEl = document.getElementById('progress');
const nextBtn = document.getElementById('next-btn');
const resultScreen = document.getElementById('result-screen');
const scoreText = document.getElementById('score-text');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');

// Inicializar o quiz
function loadQuiz() {
    selectedAnswer = null; // Reseta seleção
    const currentQuizData = quizData[currentQuestion];

    // Atualiza texto do progresso e da pergunta
    progressEl.innerText = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    questionEl.innerText = currentQuizData.question;

    // Limpa opções anteriores
    optionsEl.innerHTML = '';

    // Cria os botões das alternativas
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.innerText = option;
        button.addEventListener('click', () => selectOption(index, button));
        optionsEl.appendChild(button);
    });
}

// Lógica ao selecionar uma opção
function selectOption(index, button) {
    // Remove classe 'selected' de todos os botões
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    // Adiciona classe ao botão clicado
    button.classList.add('selected');
    selectedAnswer = index;
}

// Lógica do botão "Próxima"
nextBtn.addEventListener('click', () => {
    if (selectedAnswer === null) {
        alert("Por favor, selecione uma resposta antes de prosseguir!");
        return;
    }

    // Verifica se acertou
    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }

    // Avança para próxima pergunta ou mostra resultado
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

// Mostrar tela final
function showResult() {
    quizContainer.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    scoreText.innerText = `${score}/${quizData.length}`;

    // Mensagens personalizadas por desempenho
    if (score <= 4) {
        messageEl.innerText = "Continue aprendendo sobre os animais! 🐾";
    } else if (score <= 7) {
        messageEl.innerText = "Muito bem! Você sabe bastante! 🦒";
    } else {
        messageEl.innerText = "Excelente! Você é fera no mundo animal! 🦁";
    }
}

// Reiniciar o jogo
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuiz();
});

// Início imediato
loadQuiz();