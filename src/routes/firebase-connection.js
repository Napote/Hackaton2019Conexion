//Conexión a firebase
const admin = require("firebase-admin");

function firebaseConnection(){
    var serviceAccount = require("../../proyecto-hackathon-2019-firebase-adminsdk-3hdo6-4c1b005ced.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://proyecto-hackathon-2019.firebaseio.com/"
    });

    return admin.database();
}

module.exports = firebaseConnection;