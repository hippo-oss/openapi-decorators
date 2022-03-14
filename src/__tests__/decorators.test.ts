import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';

import { ExampleController } from './fixtures';

describe('decorators', () => {
    it('generates OpenAPI spec', async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [
                ExampleController,
            ],
        }).compile();

        const app = moduleRef.createNestApplication();

        const options = new DocumentBuilder()
            .setTitle('Example')
            .build();

        const document = SwaggerModule.createDocument(app, options);

        const response = document.paths['/example']?.get?.responses[200];
        expect(response).toMatchObject({
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ExampleDTO',
                    },
                },
            },
        });

        expect(document).toMatchSnapshot();
    });
});
