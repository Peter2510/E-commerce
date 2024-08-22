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
        "Producto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": 1
            },
            "nombre": {
              "type": "string",
              "example": "Laptop Dell"
            },
            "idCategoria": {
              "type": "integer",
              "example": 2
            },
            "descripcion": {
              "type": "string",
              "example": "Una laptop de alta gama con procesador Intel i7"
            },
            "precio": {
              "type": "number",
              "format": "decimal",
              "example": 1200.99
            },
            "minimoInventario": {
              "type": "integer",
              "description": "Cantidad mínima de inventario que debe haber",
              "example": 10
            },
            "idMarca": {
              "type": "integer",
              "example": 3
            }
          }, 
          "required": ["nombre", "idCategoria", "precio", "minimoInventario", "idMarca"],
          "example": {
            "id": 1,
            "nombre": "Laptop Dell",
            "idCategoria": 2,
            "descripcion": "Una laptop de alta gama con procesador Intel i7",
            "precio": 1200.99,
            "minimoInventario": 10,
            "idMarca": 3
          }
        },
          "UrlImagen": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "example": 1
              },
              "ulrImagen": {
                "type": "string",
                "description": "URL de la imagen del producto, la imagen sera almacenana en el servicio S3 de AWS",
                "example": "https://example.com/images/producto1.jpg"
              },
              "idProducto": {
                "type": "integer",
                "example": 1
              }
            },
            "required": ["urlImagen", "idProducto"],
            "example": {
              "id": 1,
              "urlImagen": "https://aws.com/images/producto1.jpg",
              "idProducto": 1
            }
        }
      }
    },
    "paths": {
      "/api/v1/crearCliente": {
          "post": {
            "summary": "Crear un nuevo cliente",
            "operationId": "crearCliente",
            "tags": ["Auth"],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      { "$ref": "#/components/schemas/Usuario" },
                      { "$ref": "#/components/schemas/Persona" }
                    ]
                  },
                  "example": {
                    "nombreUsuario": "admin",
                    "contrasenia": "12345678",
                    "persona": {
                      "nombre": "Nombre prueba",
                      "correoElectronico": "admin@a.com",
                      "direccion": "Mi direccion",
                      "idTipoFormaPago": 1,
                      "nit": "2368547"
                    },
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "Cliente registrado correctamente",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "ok": {
                          "type": "boolean",
                          "example": true
                        },
                        "mensaje": {
                          "type": "string",
                          "example": "Registrado correctamente"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error en la creación del cliente",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "ok": {
                          "type": "boolean",
                          "example": false
                        },
                        "mensaje": {
                          "type": "string",
                          "example": "La contraseña debe tener al menos 8 caracteres"
                        },
                      },
                      "examples": {
                        "shortPassword": {
                          "summary": "Contraseña demasiado corta",
                          "value": {
                            "ok": false,
                            "mensaje": "La contraseña debe tener al menos 8 caracteres"
                          }
                        },
                        "passwordRequired": {
                          "summary": "Contraseña no proporcionada",
                          "value": {
                            "ok": false,
                            "mensaje": "La contraseña debe tener al menos 8 caracteres"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "409": {
                "description": "Correo electrónico ya registrado",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "ok": {
                          "type": "boolean",
                          "example": false
                        },
                        "mensaje": {
                          "type": "string",
                          "example": "Correo electrónico ya registrado"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Error interno del servidor",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "ok": {
                          "type": "boolean",
                          "example": false
                        },
                        "mensaje": {
                          "type": "string",
                          "example": "Error interno del servidor: [detalle del error]"
                        }
                      }
                    }
                  }
                }
              }
            }
                      
          }
      },
      "/api/v1/login": {
        "post": {
          "summary": "Inicia sesión y retorna un token JWT",
          "operationId": "login",
          "tags": ["Auth"],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "correoElectronico": {
                      "type": "string",
                      "example": "usuario@ejemplo.com"
                    },
                    "contrasenia": {
                      "type": "string",
                      "example": "contraseña123"
                    }
                  },
                  "required": ["correoElectronico", "contrasenia"]
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Inicio de sesión exitoso, retorna un token JWT y estado 2FA",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "a2f": {
                        "type": "boolean",
                        "example": false
                      },
                      "mensaje": {
                        "type": "string",
                        "example": "Inicio de sesión correcto"
                      },
                      "token": {
                        "type": "string",
                        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpZFR5cG9Vc2Vhc... (token)"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Credenciales incorrectas o usuario deshabilitado",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": false
                      },
                      "mensaje": {
                        "type": "string",
                        "example": "Credenciales incorrectas"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Se requiere completar la autenticación de dos factores",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "a2f": {
                        "type": "boolean",
                        "example": true
                      },
                      "mensaje": {
                        "type": "string",
                        "example": "Codigo enviado al correo electronico"
                      }
                    }
                  }
                }
              }
            }
          }
        },
      },
      "/api/v1/logOut": {
        "post": {
          "summary": "Cerrar sesión del usuario actual",
          "operationId": "logOut",
          "tags": ["Auth"],
          "responses": {
            "200": {
              "description": "Sesión cerrada correctamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "mensaje": {
                        "type": "string",
                        "example": "Sesión cerrada correctamente"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error al cerrar sesión",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": false
                      },
                      "mensaje": {
                        "type": "string",
                        "example": "Error al cerrar sesión"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/verify-2fa": {
        "post": {
          "summary": "Verificar el código de autenticación de dos factores",
          "operationId": "verificar2FA",
          "tags": ["Auth"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "correoElectronico": {
                      "type": "string",
                      "example": "usuario@ejemplo.com"
                    },
                    "token": {
                      "type": "string",
                      "example": "123456"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Inicio de sesión correcto",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "mensaje": {
                        "type": "string",
                        "example": "Inicio de sesión correcto"
                      },
                      "token": {
                        "type": "string",
                        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.7JirEYJir8Ys6zzGMLq_MJ2WVeZUMeL90BhvD7aRmk8"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Código expirado, no encontrado, o no válido",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "estado": {
                        "type": "string",
                        "example": "error"
                      },
                      "mensaje": {
                        "type": "string",
                        "example": "Código no válido"
                      }
                    }
                  }
                }
              }
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
