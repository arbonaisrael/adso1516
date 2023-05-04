
$('#agregarUsuario').click( function(e){
    $('#crearUsuario').removeClass('hidden');
    $('#editarUsurio').addClass('hidden');
});

$('#cancelarCrearUsuario').click(function(e){
    $('#crearUsuario').addClass('hidden');
});

$('#crearUsuario').submit(function(e){
    if( (!$('#creaUsuario').val() == '' || !$('#creaPass').val() == '') ){
        alerta = '';
        datos = {
            username : $('#creaUsuario').val(),
            clave    : $('#creaPass').val(),
            estado   : $('#creaEstado').val(),
            rol      : $('#creaRol').val()
        }

        $.post('../../ApiREST/UsuariosCtrl/Registrar',
            {datos: datos},
            function(res){
                if( res.estado == 1 ) {
                    alerta  = '<div class="alert alert-success alert-dismissible" role="alert"';
                    alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
                    alerta += res.mensaje + '</div>';
                    $('#crearUsuario').addClass('hidden');
                    listarUsuarios()
                 } else {
                    alerta  = '<div class="alert alert-danger alert-dismissible" role="alert"';
                    alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
                    alerta += res.mensaje + '</div>';
                } 

                $('#alertaUsuarios').html(alerta);
            }
        );
        return false;
    }
});

function EditarUsuario(index) {
    $('#editarUsuario').removeClass('hidden');
    $('#crearUsuario').addClass('hidden');
    
    $('#editUsuario').val(Usuarios[index].usuario);
    $('#editPass').val(Usuarios[index].clave);
    $('#editEstado').val(Usuarios[index].estado);
    $('#editRol').val(Usuarios[index].rol);
}

$('#cancelarActualizarUsuario').click(function(e){
    $('#editarUsuario').addClass('hidden');
});

$('#editarUsuario').submit(function(e){
    if( (!$('#editUsuario').val() == '' || !$('#editPass').val() == '') ){
        alerta = '';
        datos = {
            username : $('#editUsuario').val(),
            clave    : $('#editPass').val(),
            estado   : $('#editEstado').val(),
            rol      : $('#editRol').val()
        }

        ActualizarUsuarios(datos);
        $('#editarUsuario').addClass('hidden');
    
        return false;
    }
});

function listarUsuarios() {
    $.post('../../ApiREST/UsuariosCtrl/Listar',
        {datos: null},
        function(data) {
            if (data.estado == 1) {
                $('#tUsers').html('');
                Usuarios = data.usuarios;
                $.each(Usuarios, function (index, val) {
                    code  = '';
                    code += '<tr class="white">';
                    code += '<td>' + val.usuario + '</td>';
                    if (val.rol == 1) 
                        code += '<td> Super Administrador </td>';
                    else 
                        code += '<td> Administrador </td>';
                    if (val.estado == 1) 
                        code += '<td class="edit" onclick="DesactivarUsuario(' + index + ')"> <span class="bg-success glyphicon glyphicon-ok">Activo</span></td>';
                    else 
                        code += '<td class="edit" onclick="ActivarUsuario(' + index + ')"> <span class="bg-danger glyphicon glyphicon-remove">Inactivo</span></td>';
                    
                    code += '<td class="edit" onclick="EditarUsuario(' + index + ')"> <center><span class="bg-primary glyphicon glyphicon-pencil">Editar</span></center></td>';
                    code += '</tr>'
                    $('#tUsers').append(code);

                });
            }
        });
}

function DesactivarUsuario(index) {
    datos = {
        username : Usuarios[index].usuario,
        clave    : Usuarios[index].clave,
        estado   : 2,
        rol      : Usuarios[index].rol
    }
    ActualizarUsuarios(datos);
}

function ActivarUsuario(index) {
    datos = {
        username : Usuarios[index].usuario,
        clave    : Usuarios[index].clave,
        estado   : 1,
        rol      : Usuarios[index].rol
    }
    ActualizarUsuarios(datos);
}

function ActualizarUsuarios(datos) {
    alerta = '';
    $.post('../../ApiREST/UsuariosCtrl/Actualizar',
        {datos: datos},
        function(res){
            if( res.estado == 1 ) {
                alerta  = '<div class="alert alert-success alert-dismissible" role="alert"';
                alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
                alerta += res.mensaje + '</div>';
                listarUsuarios()
             } else {
                alerta  = '<div class="alert alert-danger alert-dismissible" role="alert"';
                alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
                alerta += res.mensaje + '</div>';
            }

            $('#alertaUsuarios').html(alerta);
        }

    );
}