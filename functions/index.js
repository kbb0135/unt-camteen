const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

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
