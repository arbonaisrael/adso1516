if (sessionStorage.getItem('user') != null) {
    var UsuarioActual = jQuery.parseJSON(sessionStorage.getItem('user'));
    if (UsuarioActual[0].rol > 1) {
        $('#contenido').load('Paginas/menuusuario.html');
    } else {
        $('#contenido').load('Paginas/menu.html');
    }
} else {
    $('#contenido').load('Paginas/login.html');
}

function Recargar(url) {
    location.href = url;
}