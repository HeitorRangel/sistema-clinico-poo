import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Clínica Odontológica POO',
            version: '1.0.0',
            description: 'Documentação automática das rotas geradas via TypeScript.',
        },
        servers: [
            {
                url: 'http://localhost:8080/api',
                description: 'Servidor Local (Desenvolvimento)',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'CPF', // Utilizando CPF como formato de validação do token
                }
            }
        }
    },
    apis: ['./src/infrastructure/http/routes/*.ts'], // Caminho dos roteadores para extração do JSDoc
};

const swaggerSpec = swaggerJsDoc(options);

export function configSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('[Swagger] Documentação ativa em http://localhost:8080/api-docs');
}
