import { ExampleDTO, createController, createDocument } from './fixtures';

describe('decorators', () => {
    it('generates OpenAPI spec', async () => {
        const ExampleController = createController(ExampleDTO);

        const document = await createDocument(ExampleController);

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
