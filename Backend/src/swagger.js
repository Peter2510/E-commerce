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
      },
      "/api/v1/administracion/getTipoUsuarios": {
        "get": {
          "summary": "Obtener todos los tipos de usuarios",
          "operationId": "getTipoUsuarios",
          "tags": ["Administracion"],
          "responses": {
            "200": {
              "description": "Lista de tipos de usuarios",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "tipoUsuarios": {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/TipoUsuario"
                        },
                        "example": [
                          {
                            "id": 1,
                            "tipo": "Administrador"
                          },
                          {
                            "id": 2,
                            "tipo": "Cliente"
                          },
                          {
                            "id": 3,
                            "tipo": "Asistente"
                          }
                        ]
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error al obtener tipos de usuarios",
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
                        "example": "Error al obtener tipo de usuario"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/crearTipoUsuario": {
        "post": {
          "summary": "Crear un nuevo tipo de usuario",
          "operationId": "crearTipoUsuario",
          "tags": ["Administracion"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/tipoUsuario"
                },
                example: {
                  tipo: "Administrador"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Tipo de usuario creado correctamente",
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
                        "example": "Tipo de usuario creado correctamente"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Error en la creación del tipo de usuario",
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
                        "example": "Error en la creación del tipo de usuario"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/crearFormaPago": {
        "post": {
          "summary": "Crear una nueva forma de pago",
          "operationId": "crearFormaPago",
          "tags": ["Administracion"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/formaPago"
                },
                example: {
                  tipo: "A domicilio"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Forma de pago creada correctamente",
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
                        "example": "Forma de pago creada correctamente"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Error en la creación de la forma de pago",
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
                        "example": "Error en la creación de la forma de pago"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/getFormasPago": {
        "get": {
          "summary": "Obtener todas las formas de pago",
          "operationId": "getFormasPago",
          "tags": ["Administracion"],
          "responses": {
            "200": {
              "description": "Lista de formas de pago",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "formaPagos": {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/FormaPago"
                        },
                        example: [
                          {
                            id: 1,
                            tipo: "A domicilio"
                          },
                          {
                            id: 2,
                            tipo: "Recoger en tienda"
                          }
                        ]
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error al obtener formas de pago",
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
                        "example": "Error al obtener formas de pago"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/editarTipoUsuario": {
        "post": {
          "summary": "Editar un tipo de usuario existente",
          "operationId": "editarTipoUsuario",
          "tags": ["Administracion"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "example": 1
                    },
                    "nuevoNombre": {
                      "type": "string",
                      "example": "Administrador"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Tipo de usuario actualizado correctamente",
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
                        "example": "Tipo de usuario actualizado correctamente"
                      }
                    }
                  }
                }
              }
            },
            "409": {
              "description": "Tipo de usuario ya existe",
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
                        "example": "El tipo de usuario ya existe"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Error en la actualización del tipo de usuario",
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
                        "example": "Error en la actualización del tipo de usuario"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/editarFormaPago": {
        "post": {
          "summary": "Editar una forma de pago existente",
          "operationId": "editarFormaPago",
          "tags": ["Administracion"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "example": 1
                    },
                    "nuevoNombre": {
                      "type": "string",
                      "example": "Tarjeta de Crédito"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Forma de pago actualizada correctamente",
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
                        "example": "Forma de pago actualizada correctamente"
                      }
                    }
                  }
                }
              }
            },
            "409": {
              "description": "Forma de pago ya registrada",
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
                        "example": "Forma de pago ya registrada"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Error en la actualización de la forma de pago",
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
                        "example": "Error en la actualización de la forma de pago"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/obtenerAdminPorId/{id}": {
        "get": {
          "summary": "Obtener un administrador por ID",
          "operationId": "obtenerAdminPorId",
          "tags": ["Administracion"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID del administrador a obtener",
              "required": true,
              "schema": {
                "type": "integer",
                "example": 12
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Detalles del administrador y persona",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      usuario:{
                        type: "object",
                          example: {
                            "usuario": {
                              "id": 1,
                              "nombreUsuario": "Jhony19",
                              "a2fActivo": true,
                              "idPersona": 1,
                              "idTipoUsuario": 1,
                              "activo": true
                            },
                            "persona": {
                              "id": 1,
                              "nombre": "Jhony Fuentes",
                              "correoElectronico": "reyesif268@albarulo.com",
                              "fechaCreacion": "2024-08-20T05:21:02.204Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Administrador no encontrado",
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
                        "example": "Usuario no encontrado"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error al obtener el administrador",
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
                        "example": "Error al obtener el administrador"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/obtenerEmpleados": {
        "get": {
          "summary": "Obtener todos los empleados, tanto adminstradores como asistentes",
          "operationId": "obtenerEmpleados",
          "tags": ["Administracion"],
          "responses": {
            "200": {
              "description": "Lista de empleados",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "empleados": {
                        "type": "array",
                        example: [
                          {
                              "usuario": {
                                  "id": 2,
                                  "nombreUsuario": "Jhony19",
                                  "a2fActivo": true,
                                  "idPersona": 2,
                                  "idTipoUsuario": 1,
                                  "activo": true
                              },
                              "persona": {
                                  "id": 2,
                                  "nombre": "Jhony Fuentes",
                                  "correoElectronico": "a1@a.com",
                                  "fechaCreacion": "2024-08-20T06:15:43.557Z"
                              }
                          },
                          {
                              "usuario": {
                                  "id": 1,
                                  "nombreUsuario": "Jhony19",
                                  "a2fActivo": true,
                                  "idPersona": 1,
                                  "idTipoUsuario": 1,
                                  "activo": true
                              },
                              "persona": {
                                  "id": 1,
                                  "nombre": "Jhony Fuentes",
                                  "correoElectronico": "reyesif268@albarulo.com",
                                  "fechaCreacion": "2024-08-20T05:21:02.204Z"
                              }
                          },
                          {
                              "usuario": {
                                  "id": 13,
                                  "nombreUsuario": "admin2",
                                  "a2fActivo": false,
                                  "idPersona": 11,
                                  "idTipoUsuario": 1,
                                  "activo": true
                              },
                              "persona": {
                                  "id": 11,
                                  "nombre": "Nombre12",
                                  "correoElectronico": "admin@a.com",
                                  "fechaCreacion": "2024-08-21T19:08:08.378Z"
                              }
                          }
                      ]
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "No se encontraron usuarios",
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
                        "example": "No se encontraron usuarios"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error al obtener empleados",
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
                        "example": "Error al obtener empleados"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/crearAdmin": {
        "post": {
          "summary": "Crear un nuevo administrador",
          "operationId": "crearAdmin",
          "tags": ["Administracion"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  type: "object",
                  properties: {
                    nombreUsuario: {
                      type: "string",
                      example: "adminUser"
                    },
                    contrasenia: {
                      type: "string",
                      example: "Password123"
                    },
                    persona: {
                      type: "object",
                      example: {
                        "nombre": "Nombre prueba",
                        "correoElectronico": "admin123@a.com",
                        "direccion": "Mi direccion",
                        "nit": "2368547"
                      }
                    }
                  },
                  required: ["nombreUsuario", "contrasenia", "persona"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Administrador creado correctamente",
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
              "description": "Error en la creación del administrador",
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
                        "example": "Error en la creación del administrador"
                      }
                    }
                  }
                }
              }
            },
            "409": {
              "description": "Conflicto, correo electrónico ya registrado",
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
            }
          }
        }
      },
      "/api/v1/administracion/obtenerClientes": {
        "get": {
          "summary": "Obtener todos los clientes",
          "operationId": "obtenerClientes",
          "tags": ["Cliente"],
          "responses": {
            "200": {
              "description": "Clientes obtenidos exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "clientes": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 1
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "Jhony19"
                                },
                                "a2fActivo": {
                                  "type": "boolean",
                                  "example": true
                                },
                                "idPersona": {
                                  "type": "integer",
                                  "example": 1
                                },
                                "idTipoUsuario": {
                                  "type": "integer",
                                  "example": 2
                                },
                                "activo": {
                                  "type": "boolean",
                                  "example": true
                                }
                              }
                            },
                            "persona": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 1
                                },
                                "nombre": {
                                  "type": "string",
                                  "example": "Jhony Fuentes"
                                },
                                "correoElectronico": {
                                  "type": "string",
                                  "example": "reyesif268@albarulo.com"
                                },
                                "fechaCreacion": {
                                  "type": "string",
                                  "format": "date-time",
                                  "example": "2024-08-20T05:21:02.204Z"
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
            "404": {
              "description": "No se encontraron usuarios",
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
                        "example": "No se encontraron usuarios"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/obtenerClientePorId/{id}": {
        "get": {
          "summary": "Obtener un cliente por ID",
          "operationId": "obtenerClientePorId",
          "tags": ["Cliente"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "example": 1
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Cliente obtenido exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "usuario": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "nombreUsuario": {
                            "type": "string",
                            "example": "Jhony19"
                          },
                          "a2fActivo": {
                            "type": "boolean",
                            "example": true
                          },
                          "idPersona": {
                            "type": "integer",
                            "example": 1
                          },
                          "idTipoUsuario": {
                            "type": "integer",
                            "example": 2
                          },
                          "activo": {
                            "type": "boolean",
                            "example": true
                          }
                        }
                      },
                      "persona": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "nombre": {
                            "type": "string",
                            "example": "Jhony Fuentes"
                          },
                          "correoElectronico": {
                            "type": "string",
                            "example": "reyesif268@albarulo.com"
                          },
                          "fechaCreacion": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-20T05:21:02.204Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Usuario no encontrado",
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
                        "example": "Usuario no encontrado"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/editarCliente": {
        "post": {
          "summary": "Editar datos de un cliente",
          "operationId": "editarCliente",
          "tags": ["Cliente"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "example": 1
                    },
                    "nombreUsuario": {
                      "type": "string",
                      "example": "Jhony19"
                    },
                    "a2fActivo": {
                      "type": "boolean",
                      "example": true
                    },
                    "persona": {
                      "type": "object",
                      "properties": {
                        "nombre": {
                          "type": "string",
                          "example": "Jhony Fuentes"
                        },
                        "direccion": {
                          "type": "text",
                          "example": "Guatemala, Guatemala"
                        },
                        "nit": {
                          "type": "string",
                          "example": "536987001"
                        },
                        "idTipoFormaPago": {
                          "type": "integer",
                          "example": "2"
                        },
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Cliente actualizado correctamente",
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
                        "example": "Actualización realizada correctamente"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Usuario no encontrado",
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
                        "example": "Usuario no encontrado"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error al actualizar cliente",
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
                        "example": "Error al actualizar cliente"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/administracion/actualizarContrasenia": {
        "post": {
          "summary": "Actualizar la contraseña de un cliente",
          "operationId": "actualizarContrasenia",
          "tags": ["Cliente"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "example": 1
                    },
                    "contrasenia": {
                      "type": "string",
                      "example": "nuevaContraseña123"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Contraseña actualizada correctamente",
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
                        "example": "Contraseña actualizada correctamente"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Error de validación de la contraseña",
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
                        "example": "La contraseña es requerida"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Usuario no encontrado",
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
                        "example": "Usuario no encontrado"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error al actualizar la contraseña",
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
                        "example": "Error al actualizar la contraseña"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/crearProducto": {
        "post": {
          "summary": "Crea un nuevo producto",
          "tags": [
            "Productos"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/producto",
                  "properties": {
                    "nombre": {
                      "type": "string",
                      "example": "Monitor Full HD"
                    },
                    "precio": {
                      "type": "decimal",
                      "example": "195.00"
                    },
                    "descripcion": {
                      "type": "string",
                      "example": "Pantalla full hd para pc"
                    },
                    "minimoInventario": {
                      "type": "integer",
                      "example": 20
                    },
                    "idCategoria": {
                      "type": "integer",
                      "example": 3
                    },
                    "idMarca": {
                      "type": "integer",
                      "example": 3
                    },
                    "imagenes": {
                      "type": "array",
                      "description": "Arreglo de imagen o imágenes del producto",
                      "items": {
                        "type": "img"
                      }
                    }
                  },
                  "required": ["nombre", "precio", "descripcion", "minimoInventario", "idCategoria", "idMarca", "imagenes"]
                },
                "examples": {
                  "producto": {
                    "value": {
                      "nombre": "Monitor Full HD",
                      "precio": "195.00",
                      "descripcion": "Pantalla full hd para pc",
                      "minimoInventario": 20,
                      "idCategoria": 3,
                      "idMarca": 3,
                      "imagenes": [
                        "file1.jpg",
                        "file2.png"
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Producto creado con éxito",
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
                        "example": "Producto creado con éxito"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Error en la solicitud",
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
                        "example": "Error al subir imagen"
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
                        "example": "Error interno del servidor"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/producto/{id}": {
        "get": {
          "summary": "Obtiene un producto por ID",
          "tags": [
            "Productos"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "description": "ID del producto",
                "example": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Producto encontrado con éxito",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "producto": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 10
                          },
                          "nombre": {
                            "type": "string",
                            "example": "Monitor Full HD"
                          },
                          "idCategoria": {
                            "type": "integer",
                            "example": 3
                          },
                          "descripcion": {
                            "type": "string",
                            "example": "Pantalla full hd para pc"
                          },
                          "precio": {
                            "type": "string",
                            "example": "195.00"
                          },
                          "minimoInventario": {
                            "type": "integer",
                            "example": 20
                          },
                          "idMarca": {
                            "type": "integer",
                            "example": 3
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-23T02:41:28.087Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-23T02:41:28.087Z"
                          },
                          "marca": {
                            "type": "string",
                            "example": "Marca X"
                          },
                          "categoria": {
                            "type": "string",
                            "example": "Categoría Y"
                          },
                          "url_imagenes": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "nombre": {
                                  "type": "string",
                                  "example": "cf854ed066707b18b3836f6d8342c4a9.png"
                                },
                                "url": {
                                  "type": "string",
                                  "description": "URL de la imagen del producto, es necesario almacenar el nombre para actualizar o eliminar la imagen",
                                  "format": "uri",
                                  "example": "bucket.s3.amazonaws.com/cf854ed066707b18b3836f6d8342c4a9.png"
                                }
                              },
                              "example": [
                                {
                                  "nombre": "cf854ed066707b18b3836f6d8342c4a9.png",
                                  "url": "https://bucket.s3.amazonaws.com/cf854ed066707b18b3836f6d8342c4a9.png"
                                },
                                {
                                  "nombre": "2b192bdc328aa66d66d2fa15a6586ccf.png",
                                  "url": "https://bucket.s3.amazonaws.com/2b192bdc328aa66d66d2fa15a6586ccf.png"
                                },
                                {
                                  "nombre": "d397d0c9a8237862a17895a71b94e1a2.png",
                                  "url": "https://bucket.s3.amazonaws.com/d397d0c9a8237862a17895a71b94e1a2.png"
                                }
                              ]
                              
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Producto no encontrado",
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
                        "example": "Producto no encontrado"
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
                        "example": "Error interno del servidor"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/editarProducto": {
        "put": {
          "summary": "Edita un producto existente",
          "tags": [
            "Productos"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "example": 10
                    },
                    "nombre": {
                      "type": "string",
                      "example": "Monitor Full HD"
                    },
                    "precio": {
                      "type": "string",
                      "example": "195.00"
                    },
                    "descripcion": {
                      "type": "string",
                      "example": "Pantalla full hd para pc"
                    },
                    "minimoInventario": {
                      "type": "integer",
                      "example": 20
                    },
                    "idCategoria": {
                      "type": "integer",
                      "example": 3
                    },
                    "idMarca": {
                      "type": "integer",
                      "example": 3
                    },
                    "imagenesEliminar": {
                      "type": "array",
                      "description": "Arreglo de los nombres de la imagen o imagenes que se eliminaran del producto",
                      "items": {
                        "type": "string"
                      }
                    },
                    "imagenes": {
                      "type": "array",
                      "description": "Arreglo de imagen o imágenes que se agregaran al producto",
                      "items": {
                        "type": "string",
                        "format": "binary"
                      }
                    }
                  },
                  "required": ["id", "nombre", "precio", "descripcion", "minimoInventario", "idCategoria", "idMarca"]
                },
                "examples": {
                  "producto": {
                    "value": {
                      "id": 10,
                      "nombre": "Monitor Ultra HD",
                      "precio": "250.00",
                      "descripcion": "Pantalla ultra hd para pc",
                      "minimoInventario": 15,
                      "idCategoria": 4,
                      "idMarca": 2,
                      "imagenesEliminar": [
                        "imagen123.jpg"
                      ],
                      "imagenes": [
                        "file3.jpg",
                        "file4.png"
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Producto editado con éxito",
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
                        "example": "Producto editado con éxito"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Error en la solicitud",
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
                        "example": "Error al subir imagen"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Producto no encontrado",
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
                        "example": "Producto no encontrado"
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
                        "example": "Error interno del servidor"
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
