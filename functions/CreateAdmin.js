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
    const uid = "6BWaB7Pw7mRm34vO6QRliKtub3x1"
    
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

//   admin.firestore().collection('mail').add({
//     to:'kbb2053@gmail.com',
//     message: {
//       subject: 'This is a Test',
//       html: 'This is an <code>HTML</code> email body.',
//     },
//   })
}
catch(error) {
    console.log(error.message)
}

