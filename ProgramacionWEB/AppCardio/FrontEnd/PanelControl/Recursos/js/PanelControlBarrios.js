var Barrios = [];

$('#agregarBarrio').click( function(e){
    $('#crearBarrio').removeClass('hidden');
    $('#editarBarrio').addClass('hidden');
});

$('#cancelarCrearBarrio').click(function(e){
    $('#crearBarrio').addClass('hidden');
});


function listarBarrios() {
    $.post('../../ApiREST/BarriosCtrl/Listar',
        {datos: null},
        function(data) {
            if (data.estado == 1) {
                $('#tBarrios').html('');
                Barrios = data.barrios;
                $.each(Barrios, function (index, val) {
                    code  = '';
                    code += '<tr class="white">';
                    code += '<td>' + val.id_barrio + '</td>';
                    code += '<td>' + val.nombre + '</td>';
                    code += '<td class="edit" onclick="EditarBarrio(' + index + ')"> <center><span class="bg-primary glyphicon glyphicon-pencil">Editar</span></center></td>';
                    code += '</tr>'
                    $('#tBarrios').append(code);

                });
            }
        });
}


$('#crearBarrio').submit(function(e){

        alerta = '';
        datos = {
            nombre : $('#creaBarrioNombre').val(),
        }

        $.post('../../ApiREST/BarriosCtrl/Registrar',
            {datos: datos},
            function(res){
                if( res.estado == 1 ) {
                    alerta  = '<div class="alert alert-success alert-dismissible" role="alert"';
                    alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
                    alerta += res.mensaje + '</div>';
                    $('#crearBarrio').addClass('hidden');
                    listarBarrios()
                 } else {
                    alerta  = '<div class="alert alert-danger alert-dismissible" role="alert"';
                    alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
                    alerta += res.mensaje + '</div>';
                } 

                $('#alertaBarrios').html(alerta);
            }
        );
        return false;
});


function EditarBarrio(index) {
    $('#editarBarrio').removeClass('hidden');
    $('#crearBarrio').addClass('hidden');
    
    $('#editBarrioId').val(Barrios[index].id_barrio);
    $('#editBarrioNombre').val(Barrios[index].nombre);
}

$('#cancelarActualizarBarrio').click(function(e){
    $('#editarBarrio').addClass('hidden');
});

$('#editarBarrio').submit(function(e){
    alerta = '';
    datos = {
        id_barrio : $('#editBarrioId').val(),
        nombre    : $('#editBarrioNombre').val(),
    }

    ActualizarBarrios(datos);
    $('#editarBarrio').addClass('hidden');

    return false;
});


function ActualizarBarrios(datos) {
    alerta = '';
    $.post('../../ApiREST/BarriosCtrl/Actualizar',
        {datos: datos},
        function(res){
            if( res.estado == 1 ) {
                alerta  = '<div class="alert alert-success alert-dismissible" role="alert"';
                alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
                alerta += res.mensaje + '</div>';
                listarBarrios()
             } else {
                alerta  = '<div class="alert alert-danger alert-dismissible" role="alert"';
                alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
                alerta += res.mensaje + '</div>';
            }

            $('#alertaBarrios').html(alerta);
        }

    );
}