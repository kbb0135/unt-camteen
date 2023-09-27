const functions = require("firebase-functions")
const admin = require("firebase-admin")

const FIREBASE_STORAGE_BUCKET ="unt-canteen.appspot.com"

const apiFirebaseOptions = {
    ...functions.config().firebase,
    credential: admin.credential.applicationDefault()
};

admin.initializeApp(apiFirebaseOptions)

const firebase = admin.firestore();
const settings = {timestampsInSnapshots: true};
firebase.settings(settings);
const storageBucket = admin.storage().bucket(FIREBASE_STORAGE_BUCKET)
module.exports = {functions, auth, firestore, storageBucket,admin }