console.log("Here")
const functions = require("firebase-functions")
const admin = require("firebase-admin")
const serviceAccount = require('./AdminCredential.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
console.log("1")

try {
    const prompt = require('prompt-sync')();
    const email = prompt("Admin Email:");
    admin.auth().createUser({
        email: email,
        password: "test123",
        displayName: email
    })


    console.log("User Created Successfully")
}
catch(error) {
    console.log(error.message)
}
