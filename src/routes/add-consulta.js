
function zeroPad(num, largo) {
    return num.toString().padStart(largo, "0");
}

function numeroConsulta(id){
    id += 1;
    return nuevoId = 'C' + zeroPad(id, 5);
}

function addConsulta(database,idPaciente,consulta,idC){
    var idConsulta = numeroConsulta(idC);
    database.ref("expedientes/"+idPaciente+"/consultas").child(idConsulta).set(consulta);
    return true;
}



module.exports = addConsulta;