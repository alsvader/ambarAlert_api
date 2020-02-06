export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      tile: 'Alerta amber API',
      description:
        'Documentación de los servicios que expone el api de la app alerta amber',
      contact: {
        name: 'Soporte API',
        url: 'http://localhost:5000/support',
        email: 'suppot@example.com'
      },
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Servidor de desarrollo local'
      }
    ]
  },
  apis: ['./server/swagger-docs/schemas/*.yaml']
};
