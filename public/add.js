const confirmBut = document.querySelector('button#confirm')
const nomeInput = document.querySelector('input#nomeDever')
const plataformaInp = document.querySelector('input#plataforma')
const materiaInp = document.querySelector('input#materia')
const dataInp = document.querySelector('input#data')

document.addEventListener('DOMContentLoaded', function() {
    try { 
        var db = firebase.firestore();
        //Runs when user is logged in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                
                } else {
                    window.location.assign('/auth.html')
                }
            }
        )
    } catch(e) {
        console.error(e)
        window.location.assign('/auth.html')
    }
})
function checkLegal(nome, plataforma, materia, data) {
    if (nome != '' && plataforma != '' && materia != '') {
        if (data.length == 10 || data.length ==0) {
            return true
        }
    }
    return false
}
function add() {
    if (checkLegal(nomeInput.value,plataformaInp.value,materiaInp.value,dataInp.value)) {
        let objUp = {}
        objUp[nomeDever.value] ={
            nome: nomeDever.value,
            plataforma: plataformaInp.value,
            materia: materiaInp.value,
            dataEnd: dataInp.value
        }
        firebase.firestore().collection('teste').doc('AGENDA').update(objUp).then(alert('Dever adicionado com sucesso'))
    } else {
        alert('Você deixou algum campo em branco')
    }
}