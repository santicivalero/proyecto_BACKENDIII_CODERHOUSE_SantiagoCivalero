import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "AdoptMe API – Users Module",
    version: "1.0.0",
    description:
      "Documentación del módulo **Users**. Proyecto del curso Backend 3 (Coderhouse).",
  },
  servers: [
    { url: "http://localhost:8080", description: "Local" },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "66f7b1c9e1a23a0012ab3456" },
          first_name: { type: "string", example: "Santiago" },
          last_name: { type: "string", example: "Civalero" },
          email: { type: "string", example: "santi@example.com" },
          role: { type: "string", example: "user" },
          pets: {
            type: "array",
            items: { type: "object", properties: { _id: { type: "string" } } },
            example: [],
          },
        },
      },
      UpdateUserInput: {
        type: "object",
        additionalProperties: true,
        example: { first_name: "Santi", role: "admin" },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          status: { type: "string", example: "error" },
          error: { type: "string", example: "User not found" },
        },
      },
    },
  },
  paths: {
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Listar usuarios",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: { type: "array", items: { $ref: "#/components/schemas/User" } },
                  },
                },
              },
            },
          },
          500: { description: "Server Error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/users/{uid}": {
      get: {
        tags: ["Users"],
        summary: "Obtener usuario por ID",
        parameters: [
          { name: "uid", in: "path", required: true, schema: { type: "string" }, example: "66f7b1c9e1a23a0012ab3456" },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          404: { description: "User not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          500: { description: "Server Error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Actualizar usuario",
        parameters: [
          { name: "uid", in: "path", required: true, schema: { type: "string" }, example: "66f7b1c9e1a23a0012ab3456" },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/UpdateUserInput" } },
          },
        },
        responses: {
          200: { description: "User updated", content: { "application/json": { schema: { type: "object", properties: { status: { type: "string", example: "success" }, message: { type: "string", example: "User updated" } } } } } },
          404: { description: "User not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          500: { description: "Server Error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Eliminar usuario",
        parameters: [
          { name: "uid", in: "path", required: true, schema: { type: "string" }, example: "66f7b1c9e1a23a0012ab3456" },
        ],
        responses: {
          200: { description: "User deleted", content: { "application/json": { schema: { type: "object", properties: { status: { type: "string", example: "success" }, message: { type: "string", example: "User deleted" } } } } } },
          404: { description: "User not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          500: { description: "Server Error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
  },
};

export const swaggerSpec = swaggerJsdoc({
  definition: swaggerDefinition,
  apis: [],
});
