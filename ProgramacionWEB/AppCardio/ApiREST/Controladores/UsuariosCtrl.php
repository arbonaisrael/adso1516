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
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();

            $sql = "SELECT 
                    usuarios.usuario as usuario,
                    usuarios.clave as clave,
                    usuarios.rol as rol,
                    usuarios.estado as estado
                    FROM
                    usuarios";
            
            $sentencia = $pdo->prepare($sql);
            if ($sentencia->execute()) {
                $resultado =  $sentencia->fetchAll( PDO::FETCH_ASSOC );
                if($resultado) {
                    $obj->respuesta =array(
                        'estado' => 1,
                        "usuarios" => $resultado
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
            $usuario = $_POST['datos'];

            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();
            $validarUsuario = "SELECT 
                               usuarios.Usuario, 
                               usuarios.Clave, 
                               usuarios.Rol, 
                               usuarios.Estado 
                               FROM 
                               usuarios 
                               WHERE 
                               usuarios.Usuario = '" . $usuario['username'] . "';";

            $sentenciaValidarUsuario = $pdo->prepare($validarUsuario);
            if ($sentenciaValidarUsuario->execute()) {
                $respuestaValidarUsuario = $sentenciaValidarUsuario->fetch( PDO::FETCH_OBJ);
                if ($respuestaValidarUsuario){
                    $obj->respuesta = array (
                        'estado' => 2,
                        'mensaje' => "El usuario ya esta registrado"
                    );
                } else {
                    $insertUsuario = "INSERT INTO 
                                      usuarios (usuarios.Usuario, usuarios.Clave, usuarios.Estado, usuarios.Rol) 
                                      VALUES (?, ?, ?, ?)";

                    $sentencia = $pdo->prepare( $insertUsuario );
                    $sentencia->bindParam( 1, $usuario['username'] );
                    $sentencia->bindParam( 2, $usuario['clave'] );
                    $sentencia->bindParam( 3, $usuario['estado'] );
                    $sentencia->bindParam( 4, $usuario['rol'] );

                    $resultado = $sentencia->execute();
                    if ($resultado) {
                        $obj->respuesta = array (
                            'estado' => 1,
                            'mensaje' => "El usuario ha sido creado exitosamente.."
                        );
                    }
                }
            } else {
                $obj->respuesta = array (
                    'estado' => 2,
                    'mensaje' => "Error Inesperado."
                );
            }
        }


        private static function Actualizar($obj) {
            $usuario = $_POST['datos'];
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();
            
            $sqlUpdate = "UPDATE 
                          usuarios 
                          SET 
                          usuarios.Clave = ?, 
                          usuarios.Estado = ?, 
                          usuarios.Rol = ? 
                          WHERE 
                          usuarios.Usuario = ?";

            $sentencia = $pdo->prepare( $sqlUpdate );
            $sentencia->bindParam( 1, $usuario['clave'] );
            $sentencia->bindParam( 2, $usuario['estado'] );
            $sentencia->bindParam( 3, $usuario['rol'] );
            $sentencia->bindParam( 4, $usuario['username'] );

            $resultado = $sentencia->execute();

            if($resultado) {
                $obj->respuesta = array (
                    'estado' => 1,
                    'mensaje' => "El usuario ha sido actualizado exitosamente.."
                );    
            } else {
                $obj->respuesta = array (
                    'estado' => 2,
                    'mensaje' => "Error Inesperado."
                );
            }
        }

        private static function Logear($obj) {
            $usuario = $_POST['datos'];
            
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();
            $sql = "SELECT 
                    u.usuario, 
                    u.clave, 
                    u.rol 
                    FROM 
                    usuarios as u 
                    WHERE 
                    u.usuario = '" . $usuario['username'] . "' and 
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