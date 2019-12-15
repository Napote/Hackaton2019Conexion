
function addConsulta(database,idPaciente){
    var idConsulta = "C00001";
    var consulta = {
        centroMedico: "Hospital Nacional de San Vicente",
        diagnostico: "Cancer terminal",
        doctor: "Alberto Peluca",
        examenes: "Examen de tumor",
        fechaConsulta: "14/12/2019",
        incapacidad: "de por vida, se murio",
        medicamentosSuministrados: "Parecetamol/Peluca" 
    }
    database.ref("expedientes/"+idPaciente+"/consultas").child(idConsulta).set(consulta);
}

module.exports = addConsulta;