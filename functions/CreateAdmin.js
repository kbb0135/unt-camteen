console.log("Here")
const functions = require("firebase-functions")
const admin = require("firebase-admin")
const serviceAccount = require('./AdminCredential.json')
const FIREBASE_STORAGE_BUCKET = "https://unt-canteen.firebaseio.com"
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

try {
    const prompt = require('prompt-sync')();
    const email = prompt("Admin Email:");
    admin.auth().createUser({
        email: email,
        password: "test123",
        displayName: email
    })
    functions.firestore.document("test/$(test)").onCreate(
        {         admin: true  
        }
    )


    console.log("Admin Created Successfully")
}
catch(error) {
    console.log(error.message)
}
