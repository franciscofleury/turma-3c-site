//UI configuration
function uiConfig() {
    return {
        callbacks: {
            signInSuccessWithAuthResult: (t,e)=>(console.log("redirect to /profile"),
            !1)
        },
        signInFlow: 'popup',
        signInSuccessUrl: 'draft',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    }
}
//Configure login
function configureLogin() {
    ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firecontainer', uiConfig())

}

function removeLogin() {
    document.getElementById('firecontainer').innerHTML = `Quem bom ver voce ${firebase.auth().currentUser.displayName}!<br>
    <a href="#" onClick="logout()">Logout</a>`
}
//Logout
function logout() {
    firebase.auth().signOut()
    location.reload()
}