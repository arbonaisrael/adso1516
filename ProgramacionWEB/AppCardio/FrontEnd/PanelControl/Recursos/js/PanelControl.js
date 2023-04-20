$('#CerrarSesion').click(function(){
    sessionStorage.removeItem('user');
    Recargar('../PanelControl');
});