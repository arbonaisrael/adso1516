<?php

    /*
    * La conexión unicamente se carga en el primer controlador
    */

    class BarriosCtrl
    {

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
                default :
                    $this->respuesta = array (
                        'estado'  => 2,
                        'mensaje' => 'No se reconoce el método del recurso'
                    );
            }
        }

        private static function Listar($obj) {
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();

            $sql = "SELECT 
                    barrios.id_barrio as id_barrio,
                    barrios.nombre as nombre
                    FROM
                    barrios";
            
            $sentencia = $pdo->prepare($sql);
            if ($sentencia->execute()) {
                $resultado =  $sentencia->fetchAll( PDO::FETCH_ASSOC );
                if($resultado) {
                    $obj->respuesta =array(
                        'estado' => 1,
                        "barrios" => $resultado
                    );
                } else {
                    $obj->respuesta = array (
                        'estado' => 2,
                        'mensaje' => "Error Inesperado."
                    ); 
                }
            } else {
                $obj->respuesta = array (
                    'estado' => 2,
                    'mensaje' => "Error Inesperado."
                );
            }
        }

        private static function Registrar($obj) {
            $barrio = $_POST['datos'];

            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();

            $insertBarrio = "INSERT INTO barrios (barrios.nombre) VALUES (?)";

            $sentencia = $pdo->prepare( $insertBarrio );
            $sentencia->bindParam( 1, $barrio['nombre'] );

            $resultado = $sentencia->execute();
            if ($resultado) {
                $obj->respuesta = array (
                    'estado' => 1,
                    'mensaje' => "El barrio ha sido creado exitosamente.."
                );
            } else {
                $obj->respuesta = array (
                    'estado' => 2,
                    'mensaje' => "Error Inesperado."
                );
            }
        }

        private static function Actualizar($obj) {
            $barrio = $_POST['datos'];
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();
            
            $sqlUpdate = "UPDATE barrios SET barrios.nombre = ? WHERE barrios.id_barrio = ?";

            $sentencia = $pdo->prepare( $sqlUpdate );
            $sentencia->bindParam( 1, $barrio['nombre'] );
            $sentencia->bindParam( 2, $barrio['id_barrio'] );

            $resultado = $sentencia->execute();

            if($resultado) {
                $obj->respuesta = array (
                    'estado' => 1,
                    'mensaje' => "El barrio ha sido actualizado exitosamente.."
                );    
            } else {
                $obj->respuesta = array (
                    'estado' => 2,
                    'mensaje' => "Error Inesperado."
                );
            }
        }

    }