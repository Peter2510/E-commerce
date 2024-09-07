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
        Marca: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID de la marca, clave primaria, autoincrementable",
              example: 1,
            },
            nombreMarca: {
              type: "string",
              description: "Nombre de la marca, no puede ser nulo o vacio",
              example: "Adidas"
            }
          },
          required: [
            "nombreMarca"
          ],
          example: {
            id: 1,
            nombreMarca: "Adidas"
          },
        },

        Categoria: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID de la categoria, clave primaria, autoincrementable",
              example: 1,
            },
            nombreMarca: {
              type: "string",
              description: "Nombre de la Categoria, no puede ser nulo o vacio",
              example: "Ropa"
            }
          },
          required: [
            "nombreCategoria"
          ],
          example: {
            id: 1,
            nombreCategoria: "Ropa"
          }
          }
          , Producto: {
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
              "activo": {
                "type": "boolean",
                "description": "Define si el producto está disponible para la venta",
                "example": true
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
          UrlImagen: {
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
          },
          "Compra": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "example": 1
              },
              "nit": {
                "type": "string",
                "example": "123456789"
              },
              "precioTotal": {
                "type": "number",
                "format": "decimal",
                "example": 100.00
              },
              "fecha": {
                "type": "string",
                "format": "date-time",
                "example": "2024-09-07T05:37:11.143Z"
              },
              "recargo": {
                "type": "number",
                "format": "decimal",
                "example": 5.00
              },
              "direccionEntrega": {
                "type": "string",
                "example": "123 Calle Principal"
              },
              "usuario": {
                "$ref": "#/components/schemas/Usuario"
              },
              "estadoCompra": {
                "$ref": "#/components/schemas/EstadoCompra"
              },
              "formaEntrega": {
                "$ref": "#/components/schemas/TipoEntrega"
              },
              "detalleCompra": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/DetalleCompra"
                }
              }
            }
          },
          "EstadoCompra": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "example": 1
              },
              "estado": {
                "type": "string",
                "example": "Pendiente"
              }
            }
          },
          "TipoEntrega": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "example": 1
              },
              "tipo": {
                "type": "string",
                "example": "A domicilio"
              }
            }
          },
          "DetalleCompra": {
            "type": "object",
            "properties": {
              "cantidadProducto": {
                "type": "integer",
                "example": 2
              },
              "precioUnitario": {
                "type": "number",
                "format": "decimal",
                "example": 25.00
              },
              "precioTotal": {
                "type": "number",
                "format": "decimal",
                "example": 50.00
              },
              "productos": {
                "$ref": "#/components/schemas/Producto"
              }
            }
          } 
      }
    },
    "paths": {
      "/api/v1/auth/crearCliente": {
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
      "/api/v1/auth/login": {
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
      "/api/v1/auth/logOut": {
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
      "/api/v1/auth/verify-2fa": {
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
                          "$ref": "#/components/schemas/formaPago"
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
                      usuario: {
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
      "/api/v1/cliente/obtenerClientes": {
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
      "/api/v1/clientes/obtenerClientePorId/{id}": {
        "get": {
          "summary": "Obtener un cliente por Id de usuario",
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
                          },
                          "idTipoFormaPago": {
                            "type": "integer",
                            "example": 2
                          },
                          "tipoFormaPago": {
                            "type": "string",
                            "example": "Recoger en tienda"
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
      "/api/v1/cliente/editarCliente": {
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
                      "description": "ID del usuario a editar",
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
      "/api/v1/cliente/actualizarContrasenia": {
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
                      "description": "ID del usuario a editar",
                      "example": 1,
                    },
                    "contraseniaActual": {
                      "type": "string",
                      "descrption": "Contraseña actual del usuario",
                      "example": "ddf58c"
                    },
                    "nuevaContrasenia": {
                      "type": "string",
                      "descrption": "Nueva contrasenia",
                      "example": "dlg99()8"
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
            "401": {
              "description": "Contrasenia actual incorrecta",
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
                        "example": "La contrasenia actual no es correcta"
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
      "/api/v1/producto/crearProducto": {
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
                  "$ref": "#/components/schemas/Producto",
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
                      "description": "Arreglo de archivos de imagen o imágenes del producto",
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
      "/api/v1/productos/producto/{id}": {
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
      "/api/v1/productos/editarProducto": {
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
                      "description": "Arreglo de archivos de la imagen o imágenes que se agregaran al producto",
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
      },
      "/api/v1/productos/cambiarEstadoProducto/{id}": {
        "put": {
          "summary": "Habilitar o deshabilitar un producto",
          "tags": [
            "Productos"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID del producto a dehabilitar",
              "required": true,
              "schema": {
                "type": "integer",
                "example": 12
              }
            },
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  type: "object",
                  properties: {
                    estado: {
                      type: "boolean",
                      descripcion: "Estado del producto",
                      example: "true"
                    }
                  },
                  required: ["estado"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Producto deshabilitado con éxito",
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
                        "example": "Producto deshabilitado con éxito",
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
      "/api/v1/productos/productosRandom/{cantidad}": {
        "get": {
          "sumary": "Obtiene  productos aleatorios",
          "tags": [
            "Productos"
          ],
          "parameters": [
            {
              "name": "cantidad",
              "in": "path",
              "description": "Cantidad de productos a obtener",
              "required": true,
              "schema": {
                "type": "integer",
                "example": 5
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Cantidad de productos obtendidosa con éxito",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "productos": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "description": "Objeto con los datos del producto",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": "45"
                            },
                            "nombre": {
                              "type": "string",
                              "example": "Monitor Full HD"
                            },
                            "precio": {
                              "type": "decimal",
                              "example": "263.25"
                            },
                            "marca": {
                              "type": "array",
                              "description": "Objeto con el nombre de la marca",
                              "example": {
                                "marca": {
                                  "nombreMarca": "Marca X"
                                }
                              }
                            },
                            "categoria": {
                              "type": "array",
                              "description": "Objeto con el nombre de la categoria",
                              "example": {
                                "categoria": {
                                  "nombreCategoria": "Tecnologia"
                                }
                              }
                            },
                            "url_imagenes": {
                              "type": "string",
                              "description": "URL de la imagen del producto",
                              "example": "bucket.s3.amazonaws.com/cf854ed066707b18b3836f6d8342c4a9.png"
                            }
                          },
                          "example": [
                            {
                              "id": 45,
                              "nombre": "Monitor Full HD",
                              "precio": "263.25",
                              "marca": {
                                "nombreMarca": "Marca X"
                              },
                              "categoria": {
                                "nombreCategoria": "Tecnologia"
                              },
                              "url_imagenes": [{
                                "nombre": "cf854ed066707b18b3836f6d8342c4a9.png",
                                "url": "https://bucket.s3.amazonaws.com/cf854ed066707b18b3836f6d8342c4a9.png"
                              },
                              {
                                "nombre": "cf854ed066707b18b3836f6d8342c4a9.png",
                                "url": "https://bucket.s3.amazonaws.com/cf854ed066707b18b3836f6d8342c4a9.png"
                              }
                              ]
                            },
                            {
                              "id": 46,
                              "nombre": "Monitor Ultra HD",
                              "precio": "300.00",
                              "marca": {
                                "nombreMarca": "Marca Y"
                              },
                              "categoria": {
                                "nombreCategoria": "Tecnologia"
                              },
                              "url_imagenes": [{
                                "nombre": "cf854ed066707b18b3836f6d8342c4a9.png",
                                "url": "https://bucket.s3.amazonaws.com/cf854ed066707b18b3836f6d8342c4a9.png"
                              }]
                            },
                            {
                              "id": 47,
                              "nombre": "Monitor Ultra HD",
                              "precio": "300.00",
                              "marca": {
                                "nombreMarca": "Marca Y"
                              },
                              "categoria": {
                                "nombreCategoria": "Tecnologia"
                              },
                              "url_imagenes": [{
                                "nombre": "cf854ed066707b18b3836f6d8342c4a9.png",
                                "url": "https://bucket.s3.amazonaws.com/cf854ed066707b18b3836f6d8342c4a9.png"
                              },
                              {
                                "nombre": "cf854ed066707b18b3836f6d8342c4a9.png",
                                "url": "https://bucket.s3.amazonaws.com/cf854ed066707b18b3836f6d8342c4a9.png"
                              }]
                            }
                          ]

                        }
                      }

                    }
                  }
                }
              }
            },
            "404": {
              "description": "No se encontraron productos",
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
                        "example": "No se encontraron productos"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error al obtener productos",
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
                        "example": "Error al obtener productos"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/productos/filtrar": {
        "get": {
          "summary": "Filtrar productos por varios criterios",
          "tags": [
            "Productos"
          ],
          "parameters": [
            {
              "name": "idMarca",
              "in": "query",
              "required": false,
              "schema": {
                "type": "integer",
                "description": "ID de la marca",
                "example": 3
              }
            },
            {
              "name": "idCategoria",
              "in": "query",
              "required": false,
              "schema": {
                "type": "integer",
                "description": "ID de la categoría",
                "example": 4
              }
            },
            {
              "name": "sortBy",
              "in": "query",
              "required": false,
              "schema": {
                "type": "string",
                "description": "Campo por el cual ordenar los resultados (e.g., nombre, precio)",
                "example": "precio"
              }
            },
            {
              "name": "order",
              "in": "query",
              "required": false,
              "schema": {
                "type": "string",
                "description": "Orden de los resultados (ASC o DESC)",
                "enum": ["ASC", "DESC"],
                "example": "ASC"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Productos filtrados con éxito",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "productos": {
                        "type": "array",
                        "items": {
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
                                    "example": "https://bucket.s3.amazonaws.com/cf854ed066707b18b3836f6d8342c4a9.png"
                                  }
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
              "description": "Productos no encontrados",
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
                        "example": "No se encontraron productos con los criterios especificados"
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


      //INICIO DE CATEGORIAS
      "/api/v1/categorias/obtenerCategorias": {
        "get": {
          "summary": "Obtener todas las categorías",
          "tags": [
            "Categorias"
          ],
          "responses": {
            "200": {
              "description": "Categorías obtenidas con éxito",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "categorias": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 1
                            },
                            "nombreCategoria": {
                              "type": "string",
                              "example": "Electrónica"
                            },
                            "imagen": {
                              "type": "string",
                              "example": "categoria-electronica.png"
                            }
                          }
                        }
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
      "/api/v1/categorias/crearCategoria": {
        "post": {
          "summary": "Crear una nueva categoría",
          "tags": [
            "Categorias"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nombreCategoria": {
                      "type": "string",
                      "description": "Nombre de la categoría",
                      "example": "Electrónica",
                      "nullable": false
                    },
                    "imagen": {
                      "type": "string",
                      "format": "binary",
                      "description": "Archivo de imagen asociado a la categoría",
                      "example": "categoria-electronica.png",
                      "nullable": false
                    }
                  },
                  "required": ["nombreCategoria", "imagen"]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Categoría creada con éxito",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "categoria": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "nombreCategoria": {
                            "type": "string",
                            "example": "Electrónica"
                          },
                          "imagen": {
                            "type": "string",
                            "example": "categoria-electronica.png"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Solicitud incorrecta, errores de validación",
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
                        "example": "El nombre de la categoría o la imagen son requeridos"
                      }
                    }
                  }
                }
              }
            },
            "409": {
              "description": "Conflicto, la categoría ya existe",
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
                        "example": "La categoría ya existe"
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

      "/api/v1/categorias/obtenerCategoria/{id}": {
        "get": {
          "summary": "Obtener una categoría específica por ID",
          "tags": [
            "Categorias"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "description": "ID de la categoría a obtener",
                "example": 1
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Categoría obtenida con éxito",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "categoria": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "nombreCategoria": {
                            "type": "string",
                            "example": "Electrónica"
                          },
                          "imagen": {
                            "type": "string",
                            "example": "categoria-electronica.png"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Categoría no encontrada",
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
                        "example": "Categoría no encontrada"
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
      "/api/v1/categorias/actualizarCategoria/{id}": {
        "put": {
          "summary": "Actualizar una categoría existente por ID",
          "tags": [
            "Categorias"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "description": "ID de la categoría a actualizar",
                "example": 1
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nombreCategoria": {
                      "type": "string",
                      "description": "El nombre de la categoría",
                      "example": "Electrónica",
                      "nullable": true
                    },
                    "imagen": {
                      "type": "string",
                      "description": "Nombre del archivo de imagen asociado a la categoría",
                      "example": "categoria-electronica.png",
                      "nullable": true
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Categoría actualizada con éxito",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "categoria": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "nombreCategoria": {
                            "type": "string",
                            "example": "Electrónica"
                          },
                          "imagen": {
                            "type": "string",
                            "example": "categoria-electronica.png"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Solicitud incorrecta, errores de validación",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": false
                      },
                      "errores": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "El nombre de la categoría no puede estar vacío"
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Categoría no encontrada",
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
                        "example": "Categoría no encontrada"
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
      //FIN DE CATEGORIAS
      "/api/v1/marcas/obtenerMarcas": {
        "get": {
          "summary": "Obtener todas las marcas",
          "tags": [
            "Marcas"
          ],
          "responses": {
            "200": {
              "description": "Marcas obtenidas con éxito",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "marcas": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 1
                            },
                            "nombreMarca": {
                              "type": "string",
                              "example": "Adidas"
                            },
                            "imagen": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "nombre": {
                                    "type": "string",
                                    "example": "adidas-logo.png"
                                  },
                                  "url": {
                                    "type": "string",
                                    "example": "https://example.com/url-adidas-logo"
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
      "/api/v1/marcas/crearMarca": {
        "post": {
          "summary": "Crear una nueva marca",
          "tags": [
            "Marcas"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nombreMarca": {
                      "type": "string",
                      "description": "Nombre de la marca",
                      "example": "Nike",
                      "nullable": false
                    },
                    "imagen": {
                      "type": "string",
                      "format": "binary",
                      "description": "Archivo de imagen asociado a la marca",
                      "example": "nike-logo.png",
                      "nullable": false
                    }
                  },
                  "required": ["nombreMarca", "imagen"]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Marca creada con éxito",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "marca": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "nombreMarca": {
                            "type": "string",
                            "example": "Nike"
                          },
                          "imagen": {
                            "type": "string",
                            "example": "nike-logo.png"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Solicitud incorrecta, errores de validación",
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
                        "example": "El nombre de la marca o la imagen son requeridos"
                      }
                    }
                  }
                }
              }
            },
            "409": {
              "description": "Conflicto, el nombre de la marca ya existe",
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
                        "example": "El nombre de la marca ya existe"
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

      "/api/v1/marcas/obtenerMarca/{id}": {
        "get": {
          "summary": "Obtener una marca por ID",
          "tags": [
            "Marcas"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "ID de la marca"
            }
          ],
          "responses": {
            "200": {
              "description": "Marca obtenida con éxito",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "marca": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "nombreMarca": {
                            "type": "string",
                            "example": "Nike"
                          },
                          "imagen": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "nombre": {
                                  "type": "string",
                                  "example": "nike-logo.png"
                                },
                                "url": {
                                  "type": "string",
                                  "example": "https://example.com/url-nike-logo"
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
              "description": "Marca no encontrada",
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
                        "example": "Marca no encontrada"
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
      "/api/v1/marcas/actualizarMarca/{id}": {
        "put": {
          "summary": "Actualizar una marca existente",
          "tags": [
            "Marcas"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "ID de la marca a actualizar"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nuevoNombre": {
                      "type": "string",
                      "description": "Nuevo nombre de la marca",
                      "example": "Puma"
                    },
                    "nuevaImagen": {
                      "type": "string",
                      "format": "binary",
                      "description": "Nuevo archivo de imagen para la marca",
                      "example": "puma-logo.png"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Marca actualizada con éxito",
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
                        "example": "Marca actualizada correctamente"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Solicitud incorrecta, errores de validación",
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
                        "example": "El nombre de la marca es requerido"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Marca no encontrada",
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
                        "example": "Marca no encontrada"
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



      "/api/v1/productos/productos": {
        "get": {
          "summary": "Obtener todos los productos",
          "tags": [
            "Productos"
          ],
          "description": "Recupera todos los productos registrados con detalles de la marca, categoría e imágenes asociadas.",
          "responses": {
            "200": {
              "description": "Lista de productos obtenida exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "productos": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 1
                            },
                            "nombre": {
                              "type": "string",
                              "example": "Producto Ejemplo"
                            },
                            "precio": {
                              "type": "number",
                              "format": "float",
                              "example": 99.99
                            },
                            "descripcion": {
                              "type": "string",
                              "example": "Descripción del producto"
                            },
                            "minimoInventario": {
                              "type": "integer",
                              "example": 10
                            },
                            "activo": {
                              "type": "boolean",
                              "example": true
                            },
                            "marca": {
                              "type": "object",
                              "properties": {
                                "nombreMarca": {
                                  "type": "string",
                                  "example": "Marca Ejemplo"
                                }
                              }
                            },
                            "categoria": {
                              "type": "object",
                              "properties": {
                                "nombreCategoria": {
                                  "type": "string",
                                  "example": "Categoría Ejemplo"
                                }
                              }
                            },
                            "url_imagenes": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "nombre": {
                                    "type": "string",
                                    "example": "imagen1.png"
                                  },
                                  "url": {
                                    "type": "string",
                                    "example": "https://example.com/imagen1.png"
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
              }
            },
            "404": {
              "description": "No se encontraron productos",
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
                        "example": "No hay productos registrados"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error del servidor",
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
                        "example": "Error al recuperar los productos"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/productos/activos": {
        "get": {
          "summary": "Obtener productos activos",
          "tags": [
            "Productos"
          ],
          "description": "Recupera todos los productos que están marcados como activos, junto con detalles de la marca, categoría e imágenes asociadas.",
          "responses": {
            "200": {
              "description": "Lista de productos activos obtenida exitosamente o mensaje de que no hay productos activos",
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
                        "example": "No hay productos activos"
                      },
                      "productos": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 1
                            },
                            "nombre": {
                              "type": "string",
                              "example": "Producto Ejemplo"
                            },
                            "precio": {
                              "type": "number",
                              "format": "float",
                              "example": 99.99
                            },
                            "descripcion": {
                              "type": "string",
                              "example": "Descripción del producto"
                            },
                            "minimoInventario": {
                              "type": "integer",
                              "example": 10
                            },
                            "activo": {
                              "type": "boolean",
                              "example": true
                            },
                            "marca": {
                              "type": "object",
                              "properties": {
                                "nombreMarca": {
                                  "type": "string",
                                  "example": "Marca Ejemplo"
                                }
                              }
                            },
                            "categoria": {
                              "type": "object",
                              "properties": {
                                "nombreCategoria": {
                                  "type": "string",
                                  "example": "Categoría Ejemplo"
                                }
                              }
                            },
                            "url_imagenes": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "nombre": {
                                    "type": "string",
                                    "example": "imagen1.png"
                                  },
                                  "url": {
                                    "type": "string",
                                    "example": "https://example.com/imagen1.png"
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
              }
            },
            "500": {
              "description": "Error del servidor",
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
                        "example": "Error al recuperar los productos activos"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/productos/desactivados": {
        "get": {
          "summary": "Obtener productos desactivados",
          "tags": [
            "Productos"
          ],
          "description": "Recupera todos los productos que están marcados como desactivados, junto con detalles de la marca, categoría e imágenes asociadas.",
          "responses": {
            "200": {
              "description": "Lista de productos desactivados obtenida exitosamente o mensaje de que no hay productos desactivados",
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
                        "example": "No hay productos desactivados"
                      },
                      "productos": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 1
                            },
                            "nombre": {
                              "type": "string",
                              "example": "Producto Ejemplo"
                            },
                            "precio": {
                              "type": "number",
                              "format": "float",
                              "example": 99.99
                            },
                            "descripcion": {
                              "type": "string",
                              "example": "Descripción del producto"
                            },
                            "minimoInventario": {
                              "type": "integer",
                              "example": 10
                            },
                            "activo": {
                              "type": "boolean",
                              "example": false
                            },
                            "marca": {
                              "type": "object",
                              "properties": {
                                "nombreMarca": {
                                  "type": "string",
                                  "example": "Marca Ejemplo"
                                }
                              }
                            },
                            "categoria": {
                              "type": "object",
                              "properties": {
                                "nombreCategoria": {
                                  "type": "string",
                                  "example": "Categoría Ejemplo"
                                }
                              }
                            },
                            "url_imagenes": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "nombre": {
                                    "type": "string",
                                    "example": "imagen1.png"
                                  },
                                  "url": {
                                    "type": "string",
                                    "example": "https://example.com/imagen1.png"
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
              }
            },
            "500": {
              "description": "Error del servidor",
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
                        "example": "Error al recuperar los productos desactivados"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/registrarCompra": {
        "post": {
          "summary": "Registrar una nueva compra",
          "description": "Permite registrar una nueva compra en el sistema.",
          "operationId": "registrarCompra",
          "tags": ["Compras"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "idUsuario": {
                      "type": "integer",
                      "example": 1
                    },
                    "nit": {
                      "type": "string",
                      "example": "1234567890"
                    },
                    "direccionEntrega": {
                      "type": "string",
                      "example": "123 Calle Falsa, Ciudad, País"
                    },
                    "idFormaEntrega": {
                      "type": "integer",
                      "example": 2
                    },
                    "productos": {
                      "type": "array",
                      "description": "Lista de productos a comprar",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "cantidad": {
                            "type": "integer",
                            "example": 3
                          }
                        },
                        "required": ["id", "cantidad"]
                      }
                    }
                  },
                  "required": ["idUsuario", "nit", "direccionEntrega", "idFormaEntrega", "productos"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Compra registrada correctamente.",
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
                        "example": "Pedido registrado correctamente"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Solicitud inválida.",
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
                        "example": "Error en la solicitud"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "No se encontró el recurso. El mensaje varia según el error.",
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
            }
          }
        }
      },
      "/api/v1/compras/compras": {
        "get": {
          "summary": "Obtener todas las compras",
          "tags": ["Compras"],
          "description": "Recupera una lista de todas las compras con detalles relacionados, incluyendo usuarios, estados, formas de pago, y productos.",
          "responses": {
            "200": {
              "description": "Lista de compras obtenida exitosamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
            "500": {
              "description": "Error en el servidor al obtener las compras.",
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
                        "example": "Error en el servidor."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorUsuario/{idUsuario}": {
        "get": {
          "summary": "Obtener compras por usuario",
          "tags": ["Compras"],
          "description": "Recupera una lista de todas las compras realizadas por un usuario específico con detalles relacionados, incluyendo usuarios, estados, formas de pago, y productos.",
          "parameters": [
            {
              "name": "idUsuario",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "example": 15
              },
              "description": "ID del usuario para el cual se buscan las compras."
            }
          ],
          "responses": {
            "200": {
              "description": "Lista de compras obtenida exitosamente para el usuario especificado.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
            "500": {
              "description": "Error en el servidor al obtener las compras para el usuario especificado.",
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
                        "example": "Error en el servidor."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorFecha/{fecha}": {
        "get": {
          "summary": "Obtener compras por fecha",
          "tags": ["Compras"],
          "description": "Obtiene una lista de compras filtradas por la fecha.",
          "parameters": [
            {
              "name": "fecha",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "format": "date",
                "example": "2024-09-07"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Compras obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
            "400": {
              "description": "Fecha no válida",
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
                        "example": "Fecha no válida"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Compras no encontradas",
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
                        "example": "Compras no encontradas"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorEstadoCompra/{idEstadoCompra}": {
        "get": {
          "summary": "Obtener compras por estado de la compra",
          "tags": ["Compras"],
          "description": "Obtiene una lista de compras filtradas por el estado de compra.",
          "parameters": [
            {
              "name": "idEstadoCompra",
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
              "description": "Compras obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
              "description": "Recurso no encontrado",
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
                        "example": "Estado de Compra no encontrado"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Error en el servidor al obtener las compras para el usuario especificado.",
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
                        "example": "Error en el servidor."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorUsuarioYEstadoCompra/{idUsuario}/{idEstadoCompra}": {
        "get": {
          "summary": "Obtener compras por usuario y estado",
          "tags": ["Compras"],
          "description": "Obtiene una lista de compras filtradas por el ID de usuario y el estado de compra.",
          "parameters": [
            {
              "name": "idUsuario",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "example": 15
              }
            },
            {
              "name": "idEstadoCompra",
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
              "description": "Compras obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
              "description": "Compras no encontradas",
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
                        "example": "Compras no encontradas"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorUsuarioYFecha/{idUsuario}/{fecha}": {
        "get": {
          "summary": "Obtener compras por usuario y fecha",
          "tags": ["Compras"],
          "description": "Obtiene una lista de compras filtradas por el ID de usuario y la fecha.",
          "parameters": [
            {
              "name": "idUsuario",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "example": 15
              }
            },
            {
              "name": "fecha",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "format": "date",
                "example": "2024-09-07"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Compras obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
            "400": {
              "description": "Fecha no válida",
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
                        "example": "Fecha no válida"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Compras no encontradas",
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
                        "example": "Compras no encontradas"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorFormaEntrega/{idFormaEntrega}": {
        "get": {
          "summary": "Obtener compras por forma de entrega",
          "tags": ["Compras"],
          "description": "Obtiene una lista de compras filtradas por la forma de entrega.",
          "parameters": [
            {
              "name": "idFormaEntrega",
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
              "description": "Compras obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
              "description": "Recurso no encontrado",
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
                        "example": "Compras no encontradas"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorUsuarioYFormaEntrega/{idUsuario}/{idFormaEntrega}": {
        "get": {
          "summary": "Obtener compras por usuario y forma de entrega",
          "tags": ["Compras"],
          "description": "Obtiene una lista de compras filtradas por el ID de usuario y la forma de entrega.",
          "parameters": [
            {
              "name": "idUsuario",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "example": 15
              }
            },
            {
              "name": "idFormaEntrega",
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
              "description": "Compras obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
              "description": "Compras no encontradas",
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
                        "example": "Compras no encontradas"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorEstadoCompraYFormaEntrega/{idEstadoCompra}/{idFormaEntrega}": {
        "get": {
          "summary": "Obtener compras por estado de compra y forma de entrega",
          "tags": ["Compras"],
          "description": "Obtiene una lista de compras filtradas por el estado de compra y la forma de entrega.",
          "parameters": [
            {
              "name": "idEstadoCompra",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "example": 1
              }
            },
            {
              "name": "idFormaEntrega",
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
              "description": "Compras obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
              "description": "Compras no encontradas",
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
                        "example": "Compras no encontradas"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorFechaYEstadoCompra/{fecha}/{idEstadoCompra}": {
        "get": {
          "summary": "Obtener compras por fecha y estado de la compra",
          "tags": ["Compras"],
          "description": "Obtiene una lista de compras filtradas por la fecha y el estado de compra.",
          "parameters": [
            {
              "name": "fecha",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "format": "date",
                "example": "2024-09-07"
              }
            },
            {
              "name": "idEstadoCompra",
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
              "description": "Compras obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
            "400": {
              "description": "Fecha no válida",
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
                        "example": "Fecha no válida"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Compras no encontradas",
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
                        "example": "Compras no encontradas"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorFechaYFormaEntrega/{fecha}/{idFormaEntrega}": {
        "get": {
          "summary": "Obtener compras por fecha y forma de entrega",
          "tags": ["Compras"],
          "description": "Obtiene una lista de compras filtradas por la fecha y la forma de entrega.",
          "parameters": [
            {
              "name": "fecha",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "format": "date",
                "example": "2024-09-07"
              }
            },
            {
              "name": "idFormaEntrega",
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
              "description": "Compras obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
            "400": {
              "description": "Fecha no válida",
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
                        "example": "Fecha no válida"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Compras no encontradas",
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
                        "example": "Compras no encontradas"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/comprasPorFechaYEstadoCompraYFormaEntrega/{fecha}/{idEstadoCompra}/{idFormaEntrega}": {
        "get": {
          "summary": "Obtener compras por fecha, estado de compra y forma de entrega",
          "tags": ["Compras"],
          "description": "Obtiene una lista de compras filtradas por la fecha, el estado de compra y la forma de entrega.",
          "parameters": [
            {
              "name": "fecha",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "format": "date",
                "example": "2024-09-07"
              }
            },
            {
              "name": "idEstadoCompra",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "example": 1
              }
            },
            {
              "name": "idFormaEntrega",
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
              "description": "Compras obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compras": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 23
                            },
                            "nit": {
                              "type": "string",
                              "example": "CF"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "3130.46"
                            },
                            "fecha": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2024-09-07T05:37:11.143Z"
                            },
                            "recargo": {
                              "type": "string",
                              "example": "313.05"
                            },
                            "direccionEntrega": {
                              "type": "string",
                              "example": "Xela"
                            },
                            "usuario": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 15
                                },
                                "nombreUsuario": {
                                  "type": "string",
                                  "example": "simon1234"
                                },
                                "persona": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 13
                                    },
                                    "nombre": {
                                      "type": "string",
                                      "example": "simon"
                                    }
                                  }
                                }
                              }
                            },
                            "estadoCompra": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "estado": {
                                  "type": "string",
                                  "example": "Pendiente de entregar"
                                }
                              }
                            },
                            "formaEntrega": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": "1"
                                },
                                "tipo": {
                                  "type": "string",
                                  "example": "A domicilio"
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
            "400": {
              "description": "Fecha no válida",
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
                        "example": "Fecha no válida"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Compras no encontradas",
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
                        "example": "Compras no encontradas"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/detalleCompra/{idCompra}": {
        "get": {
          "summary": "Obtener detalle de la compra",
          "tags": ["Compras"],
          "description": "Obtiene el detalle de una compra específica por su ID, incluyendo información del producto, marca y categoría.",
          "parameters": [
            {
              "name": "idCompra",
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
              "description": "Detalle de compra obtenido exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "detalleCompra": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "cantidadProducto": {
                              "type": "integer",
                              "example": 2
                            },
                            "precioUnitario": {
                              "type": "string",
                              "example": "15.50"
                            },
                            "precioTotal": {
                              "type": "string",
                              "example": "31.00"
                            },
                            "producto": {
                              "type": "object",
                              "properties": {
                                "nombre": {
                                  "type": "string",
                                  "example": "Laptop"
                                },
                                "descripcion": {
                                  "type": "string",
                                  "example": "Laptop con procesador Intel Core i7"
                                },
                                "precio": {
                                  "type": "string",
                                  "example": "1500.00"
                                },
                                "marca": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 1
                                    },
                                    "nombreMarca": {
                                      "type": "string",
                                      "example": "Dell"
                                    }
                                  }
                                },
                                "categoria": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "integer",
                                      "example": 2
                                    },
                                    "nombreCategoria": {
                                      "type": "string",
                                      "example": "Electrónica"
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
                }
              }
            },
            "404": {
              "description": "Compra no encontrada",
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
                        "example": "Detalle de compra no encontrado"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/compraYDetalleCompra/{idCompra}": {
        "get": {
          "summary": "Obtener compra y su detalle",
          "tags": ["Compras"],
          "description": "Obtiene una compra específica junto con su detalle, incluyendo información de productos, estado de compra y otros datos relacionados.",
          "parameters": [
            {
              "name": "idCompra",
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
              "description": "Compra y su detalle obtenidos exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ok": {
                        "type": "boolean",
                        "example": true
                      },
                      "compra": {
                        "type": "object",
                        "properties": {
                          "idCompra": {
                            "type": "integer",
                            "example": 1
                          },
                          "fecha": {
                            "type": "string",
                            "example": "2024-09-07T10:00:00Z"
                          },
                          "total": {
                            "type": "string",
                            "example": "150.00"
                          },
                          "detalleCompra": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "cantidadProducto": {
                                  "type": "integer",
                                  "example": 2
                                },
                                "precioUnitario": {
                                  "type": "string",
                                  "example": "75.00"
                                },
                                "precioTotal": {
                                  "type": "string",
                                  "example": "150.00"
                                },
                                "producto": {
                                  "type": "object",
                                  "properties": {
                                    "nombre": {
                                      "type": "string",
                                      "example": "Smartphone"
                                    },
                                    "descripcion": {
                                      "type": "string",
                                      "example": "Smartphone de última generación"
                                    },
                                    "precio": {
                                      "type": "string",
                                      "example": "75.00"
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
                }
              }
            },
            "404": {
              "description": "Compra no encontrada",
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
                        "example": "Compra no encontrada"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/compras/actualizarEstadoCompra": {
        "patch": {
          "summary": "Actualizar estado de la compra",
          "tags": ["Compras"],
          "description": "Actualiza el estado de una compra específica.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "idCompra": {
                      "type": "integer",
                      "example": 1
                    },
                    "idEstadoCompra": {
                      "type": "integer",
                      "description": "ID del nuevo estado de compra",
                      "example": 2
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Estado de compra actualizado exitosamente",
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
                        "example": "Estado de compra actualizado"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Compra no encontrada",
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
                        "example": "Compra no encontrada"
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

