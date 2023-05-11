<?php

    /**
    * Cargar los controladores
    */

    require_once 'Controladores/UsuariosCtrl.php';
    require_once 'Controladores/BarriosCtrl.php';
    require_once 'Controladores/CiudadesCtrl.php';    


    header ( 'content-type: application/json; charset=utf-8' );
    header ( 'Access-Control-Allow-Origin: *' );
    header ( 'Access-Control-Allow-Methods: POST' );

    $respuesta;
    $instancia;

    if (isset($_GET['PATH_INFO'])) {
        $peticion = explode( '/', $_GET['PATH_INFO']);
        $recurso = array_shift($peticion); // Obtener el recurso a solicitar
        
        $recursosExistentes = array (
            'UsuariosCtrl',
            'BarriosCtrl',
            'CiudadesCtrl'
        ); // Definimos los recursos existentes y validamos que la solicitud exista

        if (in_array($recurso,$recursosExistentes)) {
            // Por seguridad validamos el método para que sea POST
            $metodo = strtolower($_SERVER['REQUEST_METHOD']);

            if ($metodo == 'post') {
                // Enrutamos a donde la petición o desea ir
                switch ($recurso) {
                    case 'UsuariosCtrl' :
                        $instancia = new UsuariosCtrl($peticion);
                        break;
                    case 'BarriosCtrl' :
                        $instancia = new BarriosCtrl($peticion);
                        break;
                    case 'CiudadesCtrl' :
                        $instancia = new CiudadesCtrl($peticion);
                        break;
                }

                $respuesta = $instancia->respuesta;
              } else {
                $respuesta = array(
                    'estado'  => 2,
                    'mensaje' => 'No se reconocio el método'
                );

            }
          } else {
            $respuesta = array(
                'estado'  => 2,
                'mensaje' => 'No se reconocio el recurso'
            );
        }
      } else {
        $respuesta = array(
            'estado'  => 2,
            'mensaje' => 'No se reconocio la petición'
        );
    }

    print(json_encode($respuesta));

?>