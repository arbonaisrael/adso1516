var ControlUsuarios = false;
var ControlBarrios  = false;
var ControlCiudades = false;


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

$('#ControlPanelBarrios').click(function (event){
    if (!ControlBarrios) {
        $('#n_img').addClass('hidden');
        listarBarrios();
        ControlBarrios = true;
    } else {
        ControlBarrios = false;
    }
});

$('#ControlPanelCiudades').click(function (event){
    if (!ControlCiudades) {
        $('#n_img').addClass('hidden');
        listarCiudades();
        ControlCiudades = true;
    } else {
        ControlCiudades = false;
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