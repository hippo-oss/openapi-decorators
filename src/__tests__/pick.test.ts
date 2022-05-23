import { get } from 'lodash';

import { IsNested, IsInteger, IsString } from '../decorators';
import { pick } from '../pick';
import { createController, createDocument } from './fixtures';

type Obj = Record<string, unknown>;

describe('pick', () => {
    class Child {
        @IsString()
        baz!: string;

        @IsString()
        qux!: string;
    }

    class Parent {
        @IsString()
        foo!: string;

        @IsString()
        bar!: string;

        @IsNested({
            type: Child,
        })
        child!: Child;
    }

    it('picks a single field', async () => {
        const ParentFixture = pick(Parent, 'ParentFixture', ['foo']);

        const Controller = createController(ParentFixture);

        const document = await createDocument(Controller);
        const response = document.paths['/example']?.get?.responses[200];
        expect(response).toMatchObject({
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ParentFixture',
                    },
                },
            },
        });

        const properties = get(document, 'components.schemas.ParentFixture.properties') as unknown as Obj;
        const required = get(document, 'components.schemas.ParentFixture.required') as unknown[];
        expect(Object.keys(properties)).toEqual(['foo']);
        expect(required).toEqual(['foo']);

        expect(document).toMatchSnapshot();
    });
    it('picks zero fields', async () => {
        const ParentFixture = pick(Parent, 'ParentFixture', []);

        const Controller = createController(ParentFixture);

        const document = await createDocument(Controller);
        const response = document.paths['/example']?.get?.responses[200];
        expect(response).toMatchObject({
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ParentFixture',
                    },
                },
            },
        });

        const properties = get(document, 'components.schemas.ParentFixture.properties') as unknown as Obj;
        const required = get(document, 'components.schemas.ParentFixture.required') as unknown[];
        expect(Object.keys(properties)).toEqual([]);
        expect(required).not.toBeDefined();

        expect(document).toMatchSnapshot();
    });
    it('picks child fields', async () => {
        const ParentFixture = pick(Parent, 'ParentFixture', ['child']);

        const Controller = createController(ParentFixture);

        const document = await createDocument(Controller);
        const response = document.paths['/example']?.get?.responses[200];
        expect(response).toMatchObject({
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ParentFixture',
                    },
                },
            },
        });

        const parentProperties = get(document, 'components.schemas.ParentFixture.properties') as unknown as Obj;
        const parentRequired = get(document, 'components.schemas.ParentFixture.required') as unknown[];
        expect(Object.keys(parentProperties)).toEqual(['child']);
        expect(parentRequired).toEqual(['child']);

        const childProperties = get(document, 'components.schemas.Child.properties') as unknown as Obj;
        const childRequired = get(document, 'components.schemas.Child.required') as unknown[];
        expect(Object.keys(childProperties)).toEqual(['baz', 'qux']);
        expect(childRequired).toEqual(['baz', 'qux']);

        expect(document).toMatchSnapshot();
    });
    it('picks one field and one child field', async () => {
        const ChildFixture = pick(Child, 'ChildFixture', ['baz']);
        const ParentBase = pick(Parent, 'ParentBase', ['foo'], ['child']);

        class ParentFixture extends ParentBase {
            @IsNested({
                type: ChildFixture,
            })
            child!: typeof ChildFixture;
        }

        const Controller = createController(ParentFixture);

        const document = await createDocument(Controller);
        const response = document.paths['/example']?.get?.responses[200];
        expect(response).toMatchObject({
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ParentFixture',
                    },
                },
            },
        });

        const parentProperties = get(document, 'components.schemas.ParentFixture.properties') as unknown as Obj;
        const parentRequired = get(document, 'components.schemas.ParentFixture.required') as unknown[];
        expect(Object.keys(parentProperties)).toEqual(['foo', 'child']);
        expect(parentRequired).toEqual(['foo', 'child']);

        const childProperties = get(document, 'components.schemas.ChildFixture.properties') as unknown as Obj;
        const childRequired = get(document, 'components.schemas.ChildFixture.required') as unknown[];
        expect(Object.keys(childProperties)).toEqual(['baz']);
        expect(childRequired).toEqual(['baz']);

        expect(document).toMatchSnapshot();
    });
    it('redefines a field from a grand parent', async () => {
        class GrandParentFixture {
            @IsString()
            keep!: string;

            @IsString()
            redefine!: string;
        }

        const ParentFixture = pick(GrandParentFixture, 'Parent', ['keep'], ['redefine']);

        class ChildFixture extends ParentFixture {
            @IsInteger({
                optional: true,
            })
            redefine!: number;
        }

        const Controller = createController(ChildFixture);

        const document = await createDocument(Controller);
        const response = document.paths['/example']?.get?.responses[200];
        expect(response).toMatchObject({
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ChildFixture',
                    },
                },
            },
        });

        const childProperties = get(document, 'components.schemas.ChildFixture.properties') as unknown as Obj;
        const childRequired = get(document, 'components.schemas.ChildFixture.required') as unknown[];
        expect(Object.keys(childProperties)).toEqual(['keep', 'redefine']);
        expect(get(childProperties, 'redefine.type')).toEqual('integer');
        expect(childRequired).toEqual(['keep']);

        expect(document).toMatchSnapshot();
    });
});
