//----------- BRANCH JS/DOMANDE ---------------
    
/* TODO: Domande + random risposta esatta + counter domande*/

const boxContainer = document.getElementById('boxQuestions')
let questionCounter = 0
let score = 0
let currentQuestion = {}
const questionsLength = questions.length
let counterText = document.querySelector('.count')


function renderQuestion() {
    //Verifica della domanda corrente
    if (questionCounter >= questionsLength) {
        showResult()
        return;
    }
    //Aggiotnamento indicatore Domanda corrente
    counterText.textContent = `Question ${questionCounter + 1}/${questionsLength}`

    //Randomizzazione della domanda corrente
    currentQuestion = getRandomQuestion()

    
    //Creazione dell/array per le risposte
    let options = []
    options.push(currentQuestion["correct_answer"])
    currentQuestion["incorrect_answers"].forEach(answer => {
        options.push(answer)
    })

    //Randomizzazione delle risposte
    let randomOptions = randomizeAnswers(options)

    boxContainer.innerHtml = ""

    //Creazione container testo domanda
    const titleContainer = document.createElement('div')
    titleContainer.classList.add("titleContainer")
    boxContainer.appendChild(titleContainer)

    //Creazione testo Domanda
    const titleQuestion = document.createElement('h2')
    titleQuestion.classList.add("titleQuestion")
    titleQuestion.textContent = currentQuestion["question"]
    titleContainer.appendChild(titleQuestion)

    //Creazione del container risposte
    const answersGroup = document.createElement('div')
    answersGroup.classList.add("answersGroup")
    boxContainer.appendChild(answersGroup)

    //Creazione del form
    const form = document.createElement('form')
    form.action = "answersForm"
    answersGroup.appendChild(form)

    randomOptions.forEach((option, index) => {


        //Creazione dell'input radio
        const radio = document.createElement('input')
        radio.type = 'radio'
        radio.name = "answer"
        radio.id = `radio${index}`
        radio.value = option

        //Creazione della label
        const label = document.createElement('label')
        label.htmlFor = `radio${index}`
        label.textContent = option
        label.classList.add('styleButton')

        radio.addEventListener('change', () => {
            if (radio.value === currentQuestion["correct_answer"]) {
                score++;
            }
            console.log(`Risposta data: ${radio.value}`)
            console.log(`Risposta corretta: ${currentQuestion["correct_answer"]}`)
            console.log(`Score: ${score}`)
            boxContainer.innerHTML = ""
            setTimeout(nextQuestion, 100);
        })
      
        form.appendChild(radio)
        form.appendChild(label)

    })
}

function getRandomQuestion() {
    let randomIndex = Math.floor(Math.random() * questions.length)
    let question = questions[randomIndex]

    questions.splice(randomIndex, 1)
    return question
}


function nextQuestion() {
    questionCounter++;
    renderQuestion();
}

function showResult() {

}
function randomizeAnswers(options) {
    let arr = []
    let copy = []
    options.forEach(option => {
        copy.push(option)
    })
    for (let i = 0; i < options.length; i++) {
        let rand = Math.floor(Math.random() * copy.length)
        arr.push(copy[rand])
        copy.splice(rand, 1)

    }
    return arr
}


window.addEventListener('load', () => {
    renderQuestion()
})