import { Controller, Get, Type } from '@nestjs/common';
import { ApiOkResponse, DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';

import {
    IsBoolean,
    IsDate,
    IsDateString,
    IsEnum,
    IsInteger,
    IsNested,
    IsNumber,
    IsString,
    IsUUID,
} from '../decorators';

enum ExampleEnum {
    Value = 'Value',
}

class NestedRequiredExample {
    @IsString()
    requiredStringValue!: string;
}

class NestedOptionalExample {
    @IsString({
        optional: true,
    })
    optionalStringValue?: string;
}

class NestedNullableExample {
    @IsString({
        nullable: true,
    })
    nullableStringValue!: string | null;
}

export class ExampleDTO {

    /* Create one property of each type that is required. */

    @IsNested({
        isArray: true,
        type: NestedRequiredExample,
    })
    requiredObjectArrayValue!: NestedRequiredExample[];

    @IsNumber({
        isArray: true,
    })
    requiredPrimitiveArrayValue!: number[];

    @IsBoolean()
    requiredBooleanValue!: boolean;

    @IsDateString()
    requiredDateStringValue!: string;

    @IsDate()
    requiredDateValue!: Date;

    @IsEnum({
        enum: ExampleEnum,
        enumName: 'Example',
    })
    requiredEnumValue!: ExampleEnum;

    @IsInteger()
    requiredIntegerValue!: number;

    @IsNested({
        type: NestedRequiredExample,
    })
    requiredNestedValue!: NestedRequiredExample;

    @IsNumber()
    requiredNumberValue!: number;

    @IsString()
    requiredStringValue!: string;

    @IsUUID()
    requiredUUIDValue!: string;

    @IsNested({
        isArray: true,
        type: NestedOptionalExample,
        optional: true,
    })
    optionalObjectArrayValue?: NestedOptionalExample[];

    @IsNested({
        isArray: true,
        type: Number,
        optional: true,
    })
    optionalPrimitiveArrayValue?: number[];

    @IsBoolean({
        optional: true,
    })
    optionalBooleanValue?: boolean;

    @IsDateString({
        optional: true,
    })
    optionalDateStringValue?: string;

    @IsDate({
        optional: true,
    })
    optionalDateValue?: Date;

    @IsEnum({
        enum: ExampleEnum,
        enumName: 'Example',
        optional: true,
    })
    optionalEnumValue?: ExampleEnum;

    @IsInteger({
        optional: true,
    })
    optionalIntegerValue?: number;

    @IsNested({
        type: NestedOptionalExample,
        optional: true,
    })
    optionalNestedValue?: NestedOptionalExample;

    @IsNumber({
        optional: true,
    })
    optionalNumberValue?: number;

    @IsString({
        optional: true,
    })
    optionalStringValue?: string;

    @IsUUID({
        optional: true,
    })
    optionalUUIDValue?: string;

    /* Create one property of each type that is nullable. */

    @IsNested({
        isArray: true,
        type: NestedNullableExample,
        nullable: true,
    })
    nullableObjectArrayValue!: NestedNullableExample[] | null;

    @IsNested({
        isArray: true,
        type: Number,
        nullable: true,
    })
    nullablePrimitiveArrayValue!: number[] | null;

    @IsBoolean({
        nullable: true,
    })
    nullableBooleanValue!: boolean | null;

    @IsDateString({
        nullable: true,
    })
    nullableDateStringValue!: string | null;

    @IsDate({
        nullable: true,
    })
    nullableDateValue!: Date | null;

    @IsEnum({
        enum: ExampleEnum,
        enumName: 'Example',
        nullable: true,
    })
    nullableEnumValue!: ExampleEnum | null;

    @IsInteger({
        nullable: true,
    })
    nullableIntegerValue!: number | null;

    @IsNested({
        type: NestedNullableExample,
        nullable: true,
    })
    nullableNestedValue!: NestedNullableExample | null;

    @IsNumber({
        nullable: true,
    })
    nullableNumberValue!: number | null;

    @IsString({
        nullable: true,
    })
    nullableStringValue!: string | null;

    @IsUUID({
        nullable: true,
    })
    nullableUUIDValue!: string | null;

    // test casing

    @IsString({
        name: 'string_value_with_different_casing',
    })
    stringValueWithDifferentCasing!: string;
}

export function createController(DTO: Type): Type {

    @Controller('example')
    class ExampleController {

        @Get()
        // NB: we normally rely on the OpenAPI CLI plugin to inject response decorators
        @ApiOkResponse({
            type: DTO,
        })
        public find(): typeof DTO {
            return {} as unknown as typeof DTO;
        }
    }

    return ExampleController;
}

export async function createDocument(ExampleController: Type): Promise<OpenAPIObject> {
    const moduleRef = await Test.createTestingModule({
        controllers: [
            ExampleController,
        ],
    }).compile();

    const app = moduleRef.createNestApplication();

    const options = new DocumentBuilder()
        .setTitle('Example')
        .build();

    return SwaggerModule.createDocument(app, options);
}
