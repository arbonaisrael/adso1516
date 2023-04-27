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
                        code += '<td class="edit" onclick="DesactivarUsuario(' + index + ')"> <span class="bg-success glyphicon glyphicon-ok"></span>Activo</td>';
                    else 
                        code += '<td class="edit" onclick="ActivarUsuario(' + index + ')"> <span class="bg-danger glyphicon glyphicon-remove"></span>Activo</td>';
                    
                    code += '<td class="edit" onclick="EditarUsuario(' + index + ')"> <center><span class="bg-primary glyphicon glyphicon-pencil"></span></center></td>';
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
    //ActualizarUsuarios(datos);
}

function ActivarUsuario(index) {
    datos = {
        username : Usuarios[index].usuario,
        clave    : Usuarios[index].clave,
        estado   : 2,
        rol      : Usuarios[index].rol
    }
    //ActualizarUsuarios(datos);
}