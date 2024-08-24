const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Opciones de configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Ecommerce",
      version: "1.0.0",
      description: "Documentación API Ecommerce ",
    },
    components: {
      schemas: {
        formaPago: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description:
                "ID de la forma de pago, clave primaria, autoincrementable",
              example: 1,
            },
            tipo: {
              type: "string",
              description:
                "Nombre de la forma de pago, es única, no puede repetirse",
              example: "A domicilio",
            },
          },
          required: ["id", "tipo"],
          example: {
            id: 1,
            tipo: "A domicilio",
          },
        },
        tipoUsuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description:
                "ID del tipo de usuario, clave primaria, autoincrementable",
              example: 1,
            },
            tipo: {
              type: "string",
              description:
                "Nombre del tipo de usuario, es único, no puede repetirse",
              example: "Administrador",
            },
          },
          required: ["id", "tipo"],
          example: {
            id: 1,
            tipo: "Administrador",
          },
        },
        Persona: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description:
                "ID de la persona, clave primaria, autoincrementable",
              example: 1,
            },
            nombre: {
              type: "string",
              description: "Nombre de la persona. No puede ser nulo ni vacío",
              example: "Juan Pérez",
            },
            nit: {
              type: "string",
              description: "Número de Identificación Tributaria. Opcional",
              example: "1234567890",
            },
            correoElectronico: {
              type: "string",
              description:
                "Correo electrónico de la persona. Debe ser único y válido",
              example: "juan.perez@example.com",
            },
            direccion: {
              type: "string",
              description: "Dirección de la persona. Opcional",
              example: "Calle Falsa 123",
            },
            fechaCreacion: {
              type: "string",
              format: "date-time",
              description: "Fecha y hora en la que se creó el registro",
              example: "2024-08-20T12:34:56Z",
            },
            ultimoInicioSesion: {
              type: "string",
              format: "date-time",
              description: "Fecha y hora del último inicio de sesión",
              example: "2024-08-20T12:34:56Z",
            },
            idTipoFormaPago: {
              type: "integer",
              description:
                "LLave foránea que referencia al tipo de forma de pago",
              example: 2,
            },
          },
          required: [
            "nombre",
            "correoElectronico",
            "fechaCreacion",
            "ultimoInicioSesion",
            "idTipoFormaPago",
          ],
          example: {
            id: 1,
            nombre: "Juan Pérez",
            nit: "1234567890",
            correoElectronico: "juan.perez@example.com",
            direccion: "Calle Falsa 123",
            fechaCreacion: "2024-08-20T12:34:56Z",
            ultimoInicioSesion: "2024-08-20T12:34:56Z",
            idTipoFormaPago: 2,
          },
        },
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID del usuario, clave primaria, autoincrementable",
              example: 1,
            },
            nombreUsuario: {
              type: "string",
              description:
                "Nombre de usuario registrado. No puede ser nulo ni vacío",
              example: "miNombr3Usuario",
            },
            contrasenia: {
              type: "string",
              description:
                "Contraseña para acceder a la plataforma. No puede ser nula ni vacía",
              example: "kd9fñc..s",
            },
            activo: {
              type: "boolean",
              description:
                "Define si el usuario tiene permitido iniciar sesión",
              default: true,
              example: true,
            },
            a2fActivo: {
              type: "boolean",
              description:
                "Define si el usuario tiene activo la autentificación de doble factor",
              default: false,
              example: false,
            },
            idPersona: {
              type: "integer",
              description:
                "LLave foránea que referencia a la persona asociada al perfil",
              example: 2,
            },
            idTipoUsuario: {
              type: "integer",
              description: "LLave foránea que define el tipo de usuario",
              example: 0,
            },
          },
          required: [
            "nombreUsuario",
            "contrasenia",
            "activo",
            "a2fActivo",
            "idPersona",
            "idTipoUsuario",
          ],
          example: {
            id: 1,
            nombreUsuario: "miNombr3Usuario",
            contrasenia: "kd9fñc..s",
            activo: true,
            a2fActivo: false,
            idPersona: 2,
            idTipoUsuario: 0,
          },
        }, 
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID del usuario, clave primaria, autoincrementable",
              example: 1,
            },
            nombreUsuario: {
              type: "string",
              description:
                "Nombre de usuario registrado. No puede ser nulo ni vacío",
              example: "miNombr3Usuario",
            },
            contrasenia: {
              type: "string",
              description:
                "Contraseña para acceder a la plataforma. No puede ser nula ni vacía",
              example: "kd9fñc..s",
            },
            activo: {
              type: "boolean",
              description:
                "Define si el usuario tiene permitido iniciar sesión",
              default: true,
              example: true,
            },
            a2fActivo: {
              type: "boolean",
              description:
                "Define si el usuario tiene activo la autentificación de doble factor",
              default: false,
              example: false,
            },
            idPersona: {
              type: "integer",
              description:
                "LLave foránea que referencia a la persona asociada al perfil",
              example: 2,
            },
            idTipoUsuario: {
              type: "integer",
              description: "LLave foránea que define el tipo de usuario",
              example: 0,
            },
          },
          required: [
            "nombreUsuario",
            "contrasenia",
            "activo",
            "a2fActivo",
            "idPersona",
            "idTipoUsuario",
          ],
          example: {
            id: 1,
            nombreUsuario: "miNombr3Usuario",
            contrasenia: "kd9fñc..s",
            activo: true,
            a2fActivo: false,
            idPersona: 2,
            idTipoUsuario: 0,
          },
        },
        Marca:{
          type: "object",
          properties:{
            id:{
              type: "integer",
              description: "ID de la marca, clave primaria, autoincrementable",
              example: 1,
            },
            nombreMarca:{
              type: "string",
              description: "Nombre de la marca, no puede ser nulo o vacio",
              example: "Adidas"
            }
          },
          required:[
            "nombreMarca"
          ],
          example:{
            id:1,
            nombreMarca: "Adidas"
          }, 
        },

      Categoria:{
        type: "object",
        properties:{
          id:{
            type: "integer",
            description: "ID de la categoria, clave primaria, autoincrementable",
            example: 1,
          },
          nombreMarca:{
            type: "string",
            description: "Nombre de la Categoria, no puede ser nulo o vacio",
            example: "Ropa"
          }
        },
        required:[
          "nombreCategoria"
        ],
        example:{
          id:1,
          nombreCategoria: "Ropa"
        }
        
    }

      },
    },
    "paths": {
      "/personas": {
        "get": {
          "summary": "Obtener la lista de personas",
          "responses": {
            "200": {
              "description": "Lista de personas",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Persona"
                    }
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Crear una nueva persona",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Persona"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Persona creada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Persona"
                  }
                }
              }
            }
          }
        }
      },
      "/personas/{id}": {
        "get": {
          "summary": "Obtener una persona por ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Persona encontrada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Persona"
                  }
                }
              }
            },
            "404": {
              "description": "Persona no encontrada"
            }
          }
        },
        "put": {
          "summary": "Actualizar una persona existente",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Persona"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Persona actualizada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Persona"
                  }
                }
              }
            },
            "404": {
              "description": "Persona no encontrada"
            }
          }
        },
        "delete": {
          "summary": "Eliminar una persona",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Persona eliminada"
            },
            "404": {
              "description": "Persona no encontrada"
            }
          }
        }
      },

      "/categorias": {
        "get": {
          "summary": "Obtener la lista de categorias",
          "responses": {
            "200": {
              "description": "Lista de categorias",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Categoria"
                    }
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Crear una nueva persona",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Persona"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Categoria creada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Categoria"
                  }
                }
              }
            }
          }
        }
      },
      "/categoria/{id}": {
        "get": {
          "summary": "Obtener una categoria por ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Categoria encontrada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Categoria"
                  }
                }
              }
            },
            "404": {
              "description": "Categoria no encontrada"
            }
          }
        },
        "put": {
          "summary": "Actualizar una categoria existente",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Categoria"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Categoria actualizada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Categoria"
                  }
                }
              }
            },
            "404": {
              "description": "Categoria no encontrada"
            }
          }
        },
        "delete": {
          "summary": "Eliminar una categoria",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Categoria eliminada"
            },
            "404": {
              "description": "Categoria no encontrada"
            }
          }
        }
      },

      "/marcas": {
        "get": {
          "summary": "Obtener la lista de marcas",
          "responses": {
            "200": {
              "description": "Lista de marcas",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Marca"
                    }
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Crear una nueva marca",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Marca"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Marca creada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Marca"
                  }
                }
              }
            }
          }
        }
      },
      "/marcas/{id}": {
        "get": {
          "summary": "Obtener una marca por ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Marca encontrada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Marca"
                  }
                }
              }
            },
            "404": {
              "description": "Marca no encontrada"
            }
          }
        },
        "put": {
          "summary": "Actualizar una marca existente",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Marca"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Marca actualizada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Marca"
                  }
                }
              }
            },
            "404": {
              "description": "Marca no encontrada"
            }
          }
        },
        "delete": {
          "summary": "Eliminar una marca",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Marca eliminada"
            },
            "404": {
              "description": "Marca no encontrada"
            }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js"],
};

// Generar la especificación Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
