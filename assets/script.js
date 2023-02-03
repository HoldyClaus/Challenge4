var startEl = document.querySelector("#start")
var startMessage = document.querySelector("#start-message")
var hideQuestion = document.querySelector("#question")
var timeLeft = 60;
var questionNumber = 0;

var highScores = document.getElementById('high-scores')
highScores.style.visibility = "hidden";

function hiddenQuestion() {
    document.getElementById('question').style.visibility = "hidden";

}
hiddenQuestion();

startEl.addEventListener("click", function (event) {
    event.preventDefault();
    startMessage.textContent = ('');
    showQuestionOne();
    document.getElementById('question').style.visibility = "visible";
    var timerEl = document.getElementById('countdown');

    function countdown() {
        var timeInterval = setInterval(function () {
            if (timeLeft > 1) {
                timerEl.textContent = timeLeft + ' Seconds';
                timeLeft--;
            } else if (timeLeft === 1) {
                timerEl.textContent = timeLeft + ' Second';
                timeLeft--;
            } else {
                timerEl.textContent = "Failed";
                clearInterval(timeInterval);
            }
        }, 1000);
    }
    countdown();
    console.log(countdown);

})

function loseTime() {
    timeLeft = timeLeft - 9;
}

var questionBank = [{

    question: "What is the first index in an Array?",
    answers: ["Null", "0", "1", "-1"],
    correct: "0"
},
// var questionBankTwo = {
{
    question: "What does OOP stand for?",
    answers: ["Object-Oriented Programming", "One-Oriented Programming", "Object-Open Programming", "Optional-Oriented Programming"],
    correct: "Object-Oriented Programming"
},
// var questionBankThree = 
{
    question: "Which of these is a float value?",
    answers: ["0.8", "5", "1/2", "-1"],
    correct: "0.8"
},
// var questionBankFour =
{
    question: "Who is considered the father of modern Computer Science?",
    answers: ["Bill Gates", "Steve Wasniac", "Steve Jobs", "Alan Turing"],
    correct: "Alan Turing"
},
// var questionBankFive =
{
    question: "What computer company uses a logo in the shape of a fruit?",
    answers: ["Apple", "IBM", "Dell", "Microsoft"],
    correct: "Apple"
}
]
var removeButton = document.getElementsByClassName('button');
var currentQuestion = 0;

function showQuestionOne() {
    console.log(questionNumber);
    if (questionNumber < 5) {

        var stimulus = document.getElementById('question-text-1');
        stimulus.innerHTML = ""
        stimulus.textContent = questionBank[questionNumber].question;
        var correctAnswer = questionBank[questionNumber].correct;
        var wrongNote = document.createElement("h4");
        var rightNote = document.createElement("h4");

        stimulus.append(wrongNote);
        wrongNote.textContent = ('');
        stimulus.append(rightNote);
        rightNote.textContent = ('');

        for (var i = 0; i < questionBank[questionNumber].answers.length; i++) {
            var button = document.createElement("button");
            button.setAttribute("class", "input");
            button.setAttribute("class", "button");
            button.style.display = "block";
            button.textContent = questionBank[questionNumber].answers[i];

            button.addEventListener('click', function (event) {
                event.preventDefault();
                var clickedBtn = event.target
                var userChoice = event.target.textContent;
                console.log('userchoice:' + userChoice);
                function greenBtn() {
                    clickedBtn.style.backgroundColor = "green";
                }
                function redBtn() {
                    clickedBtn.style.backgroundColor = "red";
                }
                if (userChoice !== correctAnswer) {
                    wrongNote.textContent = ("Wrong One!");
                    redBtn();
                    loseTime();
                } else {
                    rightNote.textContent = "Great Job Keep it up!"
                    greenBtn();
                    timeLeft = timeLeft + 1
                }
                questionNumber++;
                setTimeout(showQuestionOne, 1200);
            })
            stimulus.append(button);
        }
    } else {
        initialsPage();
    }

}
let scorePara = document.createElement("p");
let initialsPage = () => {
    document.getElementById('question-text-1').innerHTML = ""

    scorePara.setAttribute("class", "questions");
    if (timeLeft < 0) {
        timeLeft = 0
    }
    scorePara.innerHTML = "Your score is " + timeLeft + "!";
    let initialsDiv = document.createElement("div");
    initialsDiv.style.display = "flex"
    initialsDiv.setAttribute("id", "question");
    let initialsInput = document.createElement("input");
    initialsInput.setAttribute("id", "initials");
    initialsInput.placeholder = "Enter your initials!"
    let submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "input");
    submitBtn.setAttribute("class", "button");
    submitBtn.style.display = "block"
    submitBtn.textContent = "Submit"
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let inputValue = document.getElementById("initials").value;
        console.log(inputValue);
        saveToLocalStorage(inputValue, timeLeft);
        console.log(initialsInput);

    })
    scorePara.appendChild(initialsInput);
    scorePara.appendChild(submitBtn);
    document.getElementById('question-text-1').appendChild(scorePara, initialsDiv);

}
function saveToLocalStorage(initials, score) {
    let localStorageData = JSON.parse(localStorage.getItem("quizScore"));
    let data = {
        initials: initials,
        score: score
    }
    if (localStorageData === null) {
        localStorageData = [];
        localStorageData.push(data)
    } else {
        localStorageData.push(data)
    }
    localStorage.setItem("quizScore", JSON.stringify(localStorageData))
    finalPage();
}

function finalPage() {
    alert("Thanks for playing!")
    loadHighScores();
}
function loadHighScores() {
    highScores.style.visibility = "visible"
    let localStorageData = JSON.parse(localStorage.getItem("quizScore"));
    console.log(localStorageData);
    for (var i = 0; i < localStorageData.length; i++) {
        var newLi = document.createElement('li');
        var scoreList = document.getElementById("score-list");
        newLi.textContent = "Initials: " + localStorageData[i].initials + " Score " + localStorageData[i].score;
        scoreList.appendChild(newLi);

    }
    restart();
}

function restart() {
    let playAgain = document.createElement("button");
    playAgain.setAttribute("class", "input");
    playAgain.setAttribute("class", "button");
    playAgain.textContent = "Play Again"
    scorePara.appendChild(playAgain);
    playAgain.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    })

}