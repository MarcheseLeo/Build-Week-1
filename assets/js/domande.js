//----------- BRANCH JS/DOMANDE ---------------
    
/* TODO: Domande + random risposta esatta + counter domande*/

const boxContainer = document.getElementById('boxQuestions')
let questionCounter = 0
let score = 0
let currentQuestion = {}
const questionsLength = questions.length
const counterContainer = document.getElementById('counterQuestions')
///
let resultAnswersArr=[]
let resultAnswersQuest={}
///

function renderQuestion() {
    //Verifica della domanda corrente
    if (questionCounter >= questionsLength) {
        endQuiz()
        return;
    }
    //Aggiotnamento indicatore Domanda corrente
    counterContainer.innerHTML = ""
    counterContainer.innerHTML = `<p class="count">QUESTION <span class="increasingNumber">${questionCounter+1}</span> / <span class="allQuestions">${questionsLength}</span></p>`
    
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

            ///creo array per riepilogo finale risposte
            
            resultAnswersQuest={
                quest: currentQuestion["question"],
                givenAns: radio.value,
                correctAns:currentQuestion["correct_answer"],
            }

            resultAnswersArr.push(resultAnswersQuest)

            ///

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
let ansReviewBtn=document.createElement("button")

//funzione di fine quiz

function endQuiz() {

    //Elimino il contatore delle domande
    
    mainCont.innerHTML=""


    //sistemo il main

    mainCont.style.display="flex"
    mainCont.style.flexDirection="column"
    mainCont.style.alignItems="center"
    mainCont.style.justifyContent="spece-evenly"


    //faccio apparire il paragraph di fine quiz

    endQuizPar.innerHTML="Il quiz è terminato"
    endQuizPar.id="endQuizparagraph"

    mainCont.appendChild(endQuizPar)

    //appendo un Button già attivo che attiva la funzione di calcolo punteggio
    
    endQuizBtn.id="endButton"
    endQuizBtn.innerHTML="SHOW RESULT"
    endQuizBtn.addEventListener("click", ()=>{showResult(score,questionsLength)})
    mainCont.appendChild(endQuizBtn)

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


    //aggiungo il button che rimanda a AnswersReview()

    ansReviewBtn.innerHTML="Answers Review"
    ansReviewBtn.addEventListener("click", AnswersReview)

    mainCont.appendChild(ansReviewBtn)

}


///funzione per riepilogare le risposte

function AnswersReview(){

    //svuoto il main

    mainCont.innerHTML=""

    //
    console.log(resultAnswersArr)
    //

    let i=1

    for(qst of resultAnswersArr){

        //creo il div

        let repAnsCont=document.createElement("div")
        repAnsCont.classList.add("revAnsCont")
        mainCont.appendChild(repAnsCont)

        //inserisco la domanda

        let QstNumPar=document.createElement("p")
        QstNumPar.innerHTML="Domanda "+i+":"
        repAnsCont.appendChild(QstNumPar)

        let QstPar=document.createElement("p")
        QstPar.innerHTML=qst["quest"]
        repAnsCont.appendChild(QstPar)

        //controllo la risposta e do feedback

        if(qst["givenAns"]===qst["correctAns"]){

            let CorrAnsPar=document.createElement("p")
            CorrAnsPar.innerHTML="RISPOSTA ESATTA"
            repAnsCont.appendChild(CorrAnsPar)

            let GivenAnsPar=document.createElement("p")
            GivenAnsPar.innerHTML="Risposta data: "+qst["givenAns"]
            repAnsCont.appendChild(GivenAnsPar)

        }else{

            let WrongAnsPar=document.createElement("p")
            WrongAnsPar.innerHTML="RISPOSTA ERRATA"
            repAnsCont.appendChild(WrongAnsPar)

            let GivenAnsPar=document.createElement("p")
            GivenAnsPar.innerHTML="Risposta data: "+qst["givenAns"]
            repAnsCont.appendChild(GivenAnsPar)

            let CorrAnsPar=document.createElement("p")
            CorrAnsPar.innerHTML="Risposta corretta: "+qst["correctAns"]
            repAnsCont.appendChild(CorrAnsPar)
        }

        i++
    }

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

//prova