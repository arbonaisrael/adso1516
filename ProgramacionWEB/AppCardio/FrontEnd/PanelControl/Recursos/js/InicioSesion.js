var usuarioActual = jQuery.parseJSON(sessionStorage.getItem('user'));

$('#IniciarSesion').click(function(e) {
    e.preventDefault();
    alerta = '';
    data = {
        username : $('#luser').val(),
        clave    : $('#lpass').val()
    };

    /*
        console.log('ingresamos');
        console.log(data);
        alert(JSON.stringify(data));
    */

    $.post('../../ApiREST/UsuariosCtrl/Logear',
    {datos: data},
    function (res) {
        alert('ok');
        if( res.estado == 1 ) {
            alerta  = '<div class="alert alert-success alert-dismissible" role="alert"';
            alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
            alerta += res.mensaje + '</div>';
            //sessionStorage.setItem('user',JSON.stringify(res.usuarios));
            //Recargar('../PanelControl');
            
         } else {
            alerta  = '<div class="alert alert-danger alert-dismissible" role="alert"';
            alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
            alerta += res.mensaje + '</div>';
        }
        $('#alertas').html('');
        $('#alertas').append(alerta);
        
    });
    

});