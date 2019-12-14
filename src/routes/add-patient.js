//Conexión a firebase
const admin = require("firebase-admin");

var serviceAccount = require("../../proyecto-hackathon-2019-firebase-adminsdk-3hdo6-4c1b005ced.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://proyecto-hackathon-2019.firebaseio.com/"
});

const db = admin.database();
//Fin de Conexión a firebase


function addPatient(){
    var idPaciente = "P10001";
    var paciente = {
        nombre: "Ricardo Majano",
        direccion: "Urb. San Miguel, casa #10, Mejicanos",
        telefono: "2284-8113",
        dui: "16468981-9",
        fechaExpediente: "14/12/2019",
        fechaNacimiento: "01/07/1999",
        sexo: "masculino",
        ocupacion: "estudiante",
        emergencia: {
            nombre: "Rosa Ramirez",
            telefono: "7896-4562",
            parentesco: "Madre"
        },
        consultas: null
    };

    db.ref("expedientes").child(idPaciente).set(paciente);
}

module.exports = addPatient;