var ControlUsuarios = false;


var UsuarioActual = jQuery.parseJSON(sessionStorage.getItem('user'));
$('#l_usu').val(UsuarioActual[0].usuario);

$('#ControlPanelUsuarios').click(function (event){
    if (!ControlUsuarios) {
        $('#n_img').addClass('hidden');
        listarUsuarios();
        ControlUsuarios = true;
    } else {
        ControlUsuarios = false;
    }
});


jQuery(document).ready(function() {
    $('.oculto').hide();
    $(".inf").click(function(){
        var nodo = $(this).attr("href");

        if ($(nodo).is(":visible")){
            $(nodo).hide();
            return false;
        } else {
            $(".oculto").hide("slow");
            $(nodo).fadeToggle("fast");
            return false;
        }
    });
});

$('#CerrarSesion').click(function(){
    sessionStorage.removeItem('user');
    Recargar('../PanelControl');
});