//----------- BRANCH JS/MEMORY---------------

/* TODO: Memorizzazione risposte*//////

/*funzione di calcolo punteggio e restituzione giudizio*//////

function showResult(pointsGained,totPoints){

let resultPointsCont=document.querySelector("#resultCont")
resultPointsCont.innerHTML="<p>Hai totalizzato un <span>punteggio</span> di <span>"+pointsGained+"</span>/"+totPoints+"</p>"

//calcolo la percentuale di risposte esatte//

let percentCorrect=(pointsGained*100)/totPoints

//confronto la percentuale con il 60%, e restituisco un feedback dinamico//

let resultFeedBCont=document.querySelector("#feedbackCont")

if(percentCorrect>=60){
    resultFeedBCont.innerHTML="<h1>Congratulazioni</h1><p>Hai superato l'esame</p>"
}else{
    resultFeedBCont.innerHTML="<h1>Che peccato!</h1><p>Non hai superato l'esame</p>"
}
}


////////////////////////////////////