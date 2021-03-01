
let authorize = false
const input = document.querySelector('button#confirm')
const nickText = document.querySelector('input#inp')
input.addEventListener('click',(e) => {
    setNick(nickText.value)
})
document.addEventListener('DOMContentLoaded', function() {
    try {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
                    if (doc && doc.exists) {
                        if (doc.data().name) {
                            window.location.assign('/index.html')
                        } else {
                            authorize = true
                        }
                    } else {
                        authorize = true
                    }
                }).catch(function(error) {
                    authorize = true
                })
            } else {
                window.location.assign('/index.html')
            }
        })
    } catch(e) {
        
        console.error(e)
    }
})



function validateForm(nick) {
    

    if (nick != '' && nick != " " && nick != '   ' && authorize == true) {
        return true
    } else {
        return false
    }
}

function setNick(nick) {
    
    
    if(validateForm(nick)) {
        
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
            name: nick
        }).then(function(nada) {
            alert('Nome registrado com sucesso!')
            window.location.assign('/index.html')
        }).catch(function(error) {
            alert(error)
        })
    }
}