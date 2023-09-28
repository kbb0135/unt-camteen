const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

<<<<<<< HEAD
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
=======
exports.setAdminClaim = functions.https.onCall(async (data, context) => {
    const uid = "uLig9v5ThrQ3PYYFAeYfIi7W3Q32"
  
    try {
        // Set custom claim for the user
        await admin.auth().setCustomUserClaims(uid, { admin: true });
    
        return { success: true, message: "Custom claim set as admin" };
      } catch (error) {
        console.error("Error setting custom claim:", error);
        throw new functions.https.HttpsError(
          "internal",
          "Error setting custom claim"
        );
      }
    });
>>>>>>> 07fb0e12aae5a23f7fb4362427d996f2da75f08f
