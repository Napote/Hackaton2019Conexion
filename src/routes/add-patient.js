
function addPatient(database){
    var idPaciente = "P1000002";
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

    database.ref("expedientes").child(idPaciente).set(paciente);
}

module.exports = addPatient;