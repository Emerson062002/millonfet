let score = 0;
let timer;
let timeLeft = 40; // Tiempo para cada pregunta
let usedFiftyFifty = false;

const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById("game-container");
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const messageElement = document.getElementById("message");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const fiftyFiftyButton = document.getElementById("fifty-fifty");
const restartButton = document.getElementById("restart-button");
const restartScreen = document.getElementById("restart-screen");
const startScreen = document.getElementById("start-screen");

// Definimos las preguntas y respuestas para cada nivel
const questions = {
    level1: [
        { question: "¿Cuál es la capital de Francia?", answers: ["París", "Londres", "Madrid", "Roma"], correctAnswerIndex: 0 },
        { question: "¿En qué continente está Egipto?", answers: ["África", "Asia", "Europa", "Oceanía"], correctAnswerIndex: 0 },
        { question: "¿Cuál es el color de la hierba?", answers: ["Verde", "Rojo", "Azul", "Amarillo"], correctAnswerIndex: 0 },
        { question: "¿Cuántos días tiene un año?", answers: ["365", "360", "366", "400"], correctAnswerIndex: 0 },
        { question: "¿Qué animal dice 'miau'?", answers: ["Gato", "Perro", "Vaca", "Pájaro"], correctAnswerIndex: 0 }
    ],
    level2: [
        { question: "¿Cuál es la capital de Japón?", answers: ["Tokio", "Pekín", "Seúl", "Bangkok"], correctAnswerIndex: 0 },
        { question: "¿Quién escribió 'Cien años de soledad'?", answers: ["Gabriel García Márquez", "Mario Vargas Llosa", "Julio Cortázar", "Pablo Neruda"], correctAnswerIndex: 0 },
        { question: "¿Cuál es el continente más grande?", answers: ["Asia", "África", "América", "Europa"], correctAnswerIndex: 0 },
        { question: "¿En qué año llegó el hombre a la Luna?", answers: ["1969", "1959", "1979", "1989"], correctAnswerIndex: 0 },
        { question: "¿Cuál es el río más largo del mundo?", answers: ["Amazonas", "Nilo", "Yangtsé", "Mississippi"], correctAnswerIndex: 0 }
    ],
    level3: [
        { question: "¿Cuál es la teoría de la relatividad?", answers: ["Einstein", "Newton", "Darwin", "Maxwell"], correctAnswerIndex: 0 },
        { question: "¿Qué elemento químico tiene el símbolo 'O'?", answers: ["Oxígeno", "Oro", "Osmio", "Ozono"], correctAnswerIndex: 0 },
        { question: "¿Cuál es el valor de Pi?", answers: ["3.14", "2.14", "3.24", "4.14"], correctAnswerIndex: 0 },
        { question: "¿En qué año se fundó la ONU?", answers: ["1945", "1920", "1950", "1939"], correctAnswerIndex: 0 },
        { question: "¿Quién es conocido como el padre de la física moderna?", answers: ["Albert Einstein", "Isaac Newton", "Nikola Tesla", "Marie Curie"], correctAnswerIndex: 0 }
    ]
};

let currentLevel = 1;
let currentQuestionIndex = 0;

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
fiftyFiftyButton.addEventListener("click", useFiftyFifty);

function startGame() {
    startScreen.style.display = "none";
    gameContainer.style.display = "block";
    showQuestion();
    startTimer();
}

function restartGame() {
    restartScreen.style.display = "none";
    startScreen.style.display = "block";
    score = 0;
    timeLeft = 40;
    usedFiftyFifty = false;
    currentLevel = 1;
    currentQuestionIndex = 0;
    scoreElement.textContent = "$ " + score;
}

function showQuestion() {
    // Obtener las preguntas correspondientes al nivel actual
    const currentQuestions = questions[`level${currentLevel}`];
    const currentQuestion = currentQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.disabled = false; // Habilitar los botones antes de cada pregunta
        button.style.backgroundColor = "#4CAF50"; // Resetea el color de fondo

        button.addEventListener("click", () => checkAnswer(index));
    });

    // Reiniciar el tiempo cada vez que se muestra una nueva pregunta
    timeLeft = 40;
    timerElement.textContent = `⏰ Tiempo: ${timeLeft}`;
    restartTimer();
}

function checkAnswer(selectedIndex) {
    const currentQuestions = questions[`level${currentLevel}`];
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
        messageElement.textContent = "¡Respuesta Correcta!";
        score += 10; // Aumenta los puntos
        scoreElement.textContent = "$ " + score;
    } else {
        messageElement.textContent = "¡Respuesta Incorrecta!";
        score -= 5; // Resta puntos por error
        scoreElement.textContent = "$ " + score;
    }

    // Deshabilitar todas las respuestas después de que se haya respondido
    answerButtons.forEach(button => button.disabled = true);

    // Avanzar a la siguiente pregunta o nivel después de un breve mensaje
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            // Si se responden todas las preguntas del nivel correctamente, avanzar al siguiente nivel
            if (currentLevel < 3) {
                currentLevel++;
                currentQuestionIndex = 0;
                messageElement.textContent = `¡Nivel ${currentLevel}!`;
                setTimeout(() => showQuestion(), 1000); // Mostrar la primera pregunta del siguiente nivel
            } else {
                gameOver();
            }
        }
    }, 1000);
}

function gameOver() {
    gameContainer.style.display = "none";
    restartScreen.style.display = "block";
    messageElement.textContent = "¡Juego terminado!";
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `⏰ Tiempo: ${timeLeft}`;

        if (timeLeft === 0) {
            clearInterval(timer);
            messageElement.textContent = "¡Se acabó el tiempo!";
            gameOver();
        }
    }, 1000);
}

// Reiniciar el temporizador
function restartTimer() {
    clearInterval(timer); // Detener cualquier temporizador anterior
    startTimer(); // Iniciar un nuevo temporizador
}

function useFiftyFifty() {
    if (usedFiftyFifty) return; // Si ya se ha usado, no permitir usarlo de nuevo
    usedFiftyFifty = true;

    const currentQuestions = questions[`level${currentLevel}`];
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correctAnswerIndex;
    const incorrectAnswers = [...currentQuestion.answers];
    incorrectAnswers.splice(correctAnswerIndex, 1); // Eliminar la respuesta correcta

    // Elegir dos respuestas incorrectas aleatorias
    const [incorrectAnswer1, incorrectAnswer2] = incorrectAnswers.sort(() => Math.random() - 0.5).slice(0, 2);

    // Encontrar los botones que contienen las respuestas incorrectas
    answerButtons.forEach((button, index) => {
        if (index !== correctAnswerIndex && (button.textContent === incorrectAnswer1 || button.textContent === incorrectAnswer2)) {
            button.disabled = true;
            button.style.backgroundColor = "gray"; // Desactivar las respuestas incorrectas
        }
    });

    // Desactivar el botón de 50/50 después de usarlo
    fiftyFiftyButton.disabled = true;
    fiftyFiftyButton.style.backgroundColor = "gray"; // Cambiar el color para indicar que ya fue usado
}
