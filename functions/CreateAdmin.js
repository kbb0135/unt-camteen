console.log("Here")
const functions = require("firebase-functions")
const admin = require("firebase-admin")
const serviceAccount = require('./AdminCredential.json')
const { getAuth } = require("firebase/auth")
const FIREBASE_STORAGE_BUCKET = "https://unt-canteen.firebaseio.com"
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

try {
    
    // const prompt = require('prompt-sync')();
    // const email = prompt("Admin Email:");
    // admin.auth().createUser({
    //     email: email,
    //     password: "test123",
    //     displayName: email
    // })
    const uid = "eM2NfrLpZrhuZJSPdjQFeZT6lLi1"
    // const additionalClaims = {
    //     admin: true,
    // }
    // console.log("Here")
    // admin.auth().createCustomToken(uid, additionalClaims)
    // .then((customToken) => {
    //     console.log(customToken)
    // })
    // .catch((error) => {
    //     console.log('Error creating custom token:', error);
    //   });


    // console.log("Admin Created Successfully")
    admin
    .auth()
    .setCustomUserClaims(uid, {admin:true})
    .then(()=>{
        console.log("Admin created successfully")
    })
}
catch(error) {
    console.log(error.message)
}

