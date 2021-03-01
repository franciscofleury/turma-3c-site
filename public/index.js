const welcomeText = document.querySelector('h1#welcome')
const agenda = document.querySelector('div#agenda')
let nome = ''
let deveres = []


document.addEventListener('DOMContentLoaded', function() {
    try { 
        var db = firebase.firestore();
        //Runs when user is logged in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                getName(user.uid)
                agendaUpdate()
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

function getName(uid) {
    firebase.firestore().collection('users').doc(uid).get().then(function(doc) {
        if (doc && doc.exists) {
            welcomeText.innerText = 'Bem-vindo '+doc.data().name+'!'
        } else {
            return('')
        }
    }).catch(function(error) {
        console.error(error)
        return('')
    })
}

function agendaUpdate() {
    firebase.firestore().collection('AGENDA').doc('Agenda').onSnapshot(function(doc) {
        if (doc && doc.exists) {
            agenda.innerHTML = ''
            let entradas = Object.entries(doc.data())
            for (let i = 0; i < entradas.length;i++) {
                let p = document.createElement('p')
                let data = new Date(entradas[i][1].toDate())
                let newData = new Date()
                newData.setDate(data.getDate()+1)
                let prazo = newData.toDateString()
                let pData = document.createElement('p')
                p.innerText = entradas[i][0]
                console.log(prazo)
                pData.innerHTML = prazo +'<br><br>'
                agenda.appendChild(p)
                agenda.appendChild(pData)
            }
        }
    })
}