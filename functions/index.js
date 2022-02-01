const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.updatePastAuctions = functions.firestore
    .document("/auctions/{auctionId}")
    .onWrite((change, context) => {
      const document = change.after.exists ? change.after.data() : null;
      const endDate = document.end_date.seconds * 1000;
      const status = document.status;
      const now = Date.now();
      const auctionRef = change.after.ref;

      if ((now > endDate) && (status === "active")) {
        functions.logger.log("Past auction: ", document.title);
        try {
          auctionRef.update({
            status: "past",
          });
        } catch (error) {
          functions.logger.log("Error update data: ", error);
        }
      } else {
        functions.logger.log("Active auction: ", document.title);
      }

      return auctionRef;
    });
