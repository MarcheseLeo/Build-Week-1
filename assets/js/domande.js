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
        endQuiz()
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

///modifica per fine quiz e calcolo del rislutato

//dichiaro le variabili per gli oggetti del DOM

let countQ=document.querySelector("#counterQuestions")
let mainCont=document.querySelector("main")
let endQuizPar=document.createElement("p")
let endQuizBtn=document.createElement("button")

let resultPointsPar=document.createElement("p")
let resultFeedBCont=document.createElement("div")

//funzione di fine quiz

function endQuiz() {

    //Elimino il contatore delle domande
    
    mainCont.innerHTML=""


    //sistemo il main

    mainCont.style.display="flex"
    mainCont.style.flexDirection="column"
    mainCont.style.alignItems="center"
    mainCont.style.justifyContent="spece-evenly"
    mainCont.style.marginTop="10%"


    //faccio apparire il paragraph di fine quiz

    endQuizPar.innerHTML="Il quiz è terminato"
    endQuizPar.id="endQuizparagraph"

    mainCont.appendChild(endQuizPar)

    //appendo un Button già attivo che attiva la funzione di calcolo punteggio

    //endQuizBtnLink=document.createElement("a")
    //endQuizBtnLink.href="result.html"
    
    endQuizBtn.id="endButton"
    endQuizBtn.innerHTML="SHOW RESULT"
    endQuizBtn.addEventListener("click", ()=>{showResult(score,questionsLength)})
    mainCont.appendChild(endQuizBtn)

    //endQuizBtnLink.appendChild(endQuizBtn)  

}

/*funzione di calcolo punteggio e restituzione giudizio*//////

function showResult(pointsGained,totPoints){

    //svuoto il main

    mainCont.innerHTML=""    


    //mostro il paragraph del risultato
    
    
    

    resultPointsPar.innerHTML="Hai totalizzato un <span>punteggio</span> di <span>"+ pointsGained+"</span>/"+totPoints
    resultPointsPar.id="resultPar"

    mainCont.appendChild(resultPointsPar)


    //calcolo la percentuale di risposte esatte//

    let percentCorrect=(pointsGained*100)/totPoints


    //confronto la percentuale con il 60%, e restituisco un feedback dinamico//

    resultFeedBCont.id="feedbackCont"

    if(percentCorrect>=60){
        resultFeedBCont.innerHTML="<h1>Congratulazioni</h1><p>Hai superato l'esame</p>"
    }else{
        resultFeedBCont.innerHTML="<h1>Che peccato!</h1><p>Non hai superato l'esame</p>"
    }

    mainCont.appendChild(resultFeedBCont)
}

////////////////////////////////////




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