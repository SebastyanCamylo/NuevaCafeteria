export const handleErrors = (code) => {
    if (!code) {
      return {
        status: 500,
        message: "server error, unknown code", // Error del servidor, código desconocido
      };
    }
  
    switch (code) {
      case "22P02":
        return {
          status: 400,
          message: "invalid format, only numbers allowed", // Formato no válido, solo se permiten números
        };
      case "28P01":
        return {
          status: 400,
          message: "Incorrect postgres password", // Contraseña de postgress incorrecta
        };
      case "42601":
        return {
          status: 400,
          message: "Incorrect Postgres Failure", // Fallo postgres incorrecto
        };
      case "42P01":
        return {
          status: 400,
          message: "The non-existent relationship name table", // La tabla de nombres de relación no existente
        };
      case "3D000":
        return {
          status: 400,
          message: "Database does not exist", // La base de datos no existe
        };
      case "ECONNREFUSED":
        return {
          status: 400,
          message: "Error connecting to existing database", // Error al conectarse a la base de datos existente
        };
      case "400":
        return {
          status: 404,
          message: "All fields are required: description, img, title", // Todos los campos son obligatorios: descripción, img, titulo
        };
      case "404":
        return {
          status: 404,
          message: "The file is not registered", // El archivo no se encuentra registrado
        };
      default:
        return {
          status: 500,
          message: "Internal Server Error", // Error interno del servidor
        };
    }
  };