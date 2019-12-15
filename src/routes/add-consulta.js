
function addConsulta(database,idPaciente,consulta){
    var idConsulta = "C00001";
    database.ref("expedientes/"+idPaciente+"/consultas").child(idConsulta).set(consulta);
}

module.exports = addConsulta;