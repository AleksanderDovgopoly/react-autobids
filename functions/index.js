const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


exports.updatePastAuctions = functions.firestore
    .document("/auctions/{auctionId}")
    .onWrite(async (change, context) => {
      const now = admin.firestore.Timestamp.fromDate(new Date());
      // const getAuctionWinner = async (auctionId) => {
      //   const bidsRef = functions.firestore.document("comments_bids");
      //   return bidsRef.get();
      // };
      const oldAuctionsRef = change.after.ref.parent
          .where("end_date", "<=", now)
          .where("status", "==", "active");
      const endedAuctions = await oldAuctionsRef.get();
      endedAuctions.forEach( (snapshot) => {
        snapshot.ref.update({
          status: "past",
        });
        // getAuctionWinner(snapshot.ref.get());
        functions.logger.log("Auction Update!");
      });
      // const realtimeDbRef = await admin.database()
      //     .ref("/notifications/pmnktF3A5ZfinTFi9GRuHXC92PQ2/0")
      //     .get();
      // functions.logger.log(realtimeDbRef);
    });
