const questions = [
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
            "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
];

const shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const quizContainer = document.getElementById("quiz");

// Created make quiz function. Later on I uset it to make second quiz
const makeQuizFunc = function (questionsForQiuiz) {
    const output = [];
    questionsForQiuiz.forEach((question, number) => {
        // console.log(question);

        question["choices"] = (
            question.incorrect_answers.join() + `,${question.correct_answer}`
        ).split(",");
        question["choices"] = shuffleArray(question.choices);
        // console.log(question.choices);

        let outputChoices = [];

        question.choices.forEach((choice) => {
            outputChoices.push(
                `<label>
                <input type="radio" name="question${number}" value="${choice}">
                    ${choice}
                </label>`
            );
        });

        output.push(
            `<div class="page">
                <div class="question">
                    ${question.question}
                </div>
                <div class="answers">${outputChoices.join("")}</div>
            </div>
            `
        );
        // console.log(outputChoices.join());
    });
    return output;
};

document.addEventListener("DOMContentLoaded", () => {
    //IF YOU ARE DISPLAYING ALL THE QUESTIONS TOGETHER:
    //HINT: for each question, create a container with the "question"
    //create a radio button https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio with, as option the both the correct answer and the incorrect answers
    //when EVERY question has an answer (google for how to get a value from a radio button with JS)
    //IF YOU ARE DISPLAYING ONE QUESTION AT A TIME
    //Display first question with a title + radio button
    //when the user select the answer, pick the next question and remove this from the page after added in a varible the users' choice.
    // Storing all of the questions and answer choices
    // const output = [];
    // questions.forEach((question, number) => {
    //     // console.log(question);

    outputFirstQuiz = makeQuizFunc(questions);
    quizContainer.innerHTML = outputFirstQuiz.join("");

    const pages = quizContainer.querySelectorAll(".page");
    const startButton = document.getElementById("start");
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const submitButton = document.getElementById("submit");
    const h2 = document.querySelector("h2");

    const nextQuizButton = document.getElementById("next-quiz");

    pages.forEach((page) => {
        page.style.display = "none";
    });
    let currentPageNumber = 0;
    console.log(currentPageNumber);

    // Start quiz function runs when start bunnton clicked
    const startQuizFunc = function () {
        h2.innerText = "Select one of them";
        startButton.style.display = "none";
        nextButton.style.display = "inline-block";
        pages[currentPageNumber].style.display = "block";

        // Increase current page number by one
        console.log("quiz started", currentPageNumber);
    };

    nextQuizButton.addEventListener("click", function () {
        fetch(
            "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy"
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results);
                outputSecondQuiz = makeQuizFunc(data.results);
                console.log(outputSecondQuiz);
                quizContainer.innerHTML = outputSecondQuiz.join("");

                //
                previousButton.style.display = "none";
                nextQuizButton.style.display = "none";
                currentPageNumber = 0;

            });
    });

    // First time user clics start button
    startButton.addEventListener("click", startQuizFunc);

    // When next button clicked
    nextButton.addEventListener("click", function () {
        if (currentPageNumber < questions.length - 1) {
            pages[currentPageNumber].style.display = "none";
            currentPageNumber += 1;
            pages[currentPageNumber].style.display = "block";

            if (currentPageNumber === 9) {
                nextButton.style.display = "none";
            }
        }
        submitButton.style.display = "inline-block";
        previousButton.style.display = "inline-block";

        console.log("next button", currentPageNumber);
    });

    // When pevious buttin clicked
    previousButton.addEventListener("click", function () {
        if (currentPageNumber > 0) {
            pages[currentPageNumber].style.display = "none";
            currentPageNumber -= 1;
            pages[currentPageNumber].style.display = "block";
            nextButton.style.display = "inline-block";
        } else {
            previousButton.style.display = "none";
        }
    });

    // When the submit button clicked
    submitButton.addEventListener("click", function () {
        const resultContainer = document.getElementById("result");

        const answerContainers = quizContainer.getElementsByClassName(
            "answers"
        );

        const questionContainers = quizContainer.getElementsByClassName(
            "question"
        );

        // console.log(answerContainers);

        // To store user's correct answers
        let correctAnswers = 0;

        const input = quizContainer.querySelectorAll("input");
        console.log(input);
        input.forEach((input) => {
            input.disabled = true;
        });

        // }
        questions.forEach((question, number) => {
            const answerContainer = answerContainers[number];
            const questionContainer = questionContainers[number];

            // console.log(answerContainer);
            //

            const selector = `input[name=question${number}]:checked`;

            userAnswer = (answerContainer.querySelector(selector) || {}).value;
            console.log(userAnswer);

            if (userAnswer === question.correct_answer) {
                correctAnswers++;
                questionContainer.style.color = "#26de26";

                console.log(correctAnswers);
            } else {
                questionContainer.style.color = "red";
            }
        });
        let userScore = (correctAnswers / questions.length) * 100;
        resultContainer.innerHTML = `Your score ${userScore}%`;
        submitButton.disabled = true;

        // More advanced quiz
        if (userScore >= 0) {
            nextQuizButton.style.display = "block";
        }
    });
    // const buttonNextQuiz = document.querySelector("#next-quiz");
});
//HOW TO calculate the result
//You can do it in 2 ways:
//If you are presenting all questions together, just take all the radio buttons and check if the selected answer === correct_answer
//If you are presenting one question at a time, just add one point or not to the user score if the selected answer === correct_answer
