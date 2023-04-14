<?php

    /**
     * Cargamos la conexión unicamente se realiza en este archivo,
     * pues es el primero en cargar * index
     */

    require_once 'Datos/ConexionDB.php';

    class UsuariosCtrl {

        public $repuesta = null;

        function __construct($peticion) {
            switch ($peticion[0]) {
                case 'Listar' :
                    return self::Listar($this);
                    break;
                case 'Registrar' :
                    return self::Registrar($this);
                    break;
                case 'Actualizar' :
                    return self::Actualizar($this);
                    break;
                case 'Logear' :
                    return self::Logear($this);
                    break;
                default :
                    $this->respuesta = array (
                        'estado'  => 2,
                        'mensaje' => 'No se reconoce el método del recurso'
                    );
            }
        }

        private static function Listar($obj) {

        }
        private static function Registrar($obj) {
            
        }
        private static function Actualizar($obj) {
            
        }
        private static function Logear($obj) {
            $usuario = $_POST['datos'];
            
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();
            $sql = "select u.usuario, u.clave, u.rol from usuarios as u where u.usuario = '" . $usuario['username'] . "' and 
            u.clave = '" . $usuario['clave'] . "' and u.estado = 1;";

            $sentencia = $pdo->prepare($sql);

            if ($sentencia->execute()) {
                $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
                if ($resultado) {
                    $obj->respuesta = array (
                        'estado' => 1,
                        'mensaje' => 'Bienvenidos',
                        'usuarios' => $resultado
                    );
                  } else {
                    $obj->respuesta = array (
                        'estado' => 2,
                        'mensaje' => "Error de autenticación, usuario o contraseña incorrecta."
                    );
                }
              } else {
                $obj->respuesta = "sin respuesta";
            }
        }

    }

?>