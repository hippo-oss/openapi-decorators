import { ArraySizeOptions, BaseOptions } from '@hippo-oss/dto-decorators';
import { ApiPropertyOptions } from '@nestjs/swagger';

export function toArraySizeOptions(options: BaseOptions): ArraySizeOptions | undefined {
    if (options.isArray === undefined || options.isArray === false || options.isArray === true) {
        return undefined;
    }

    return options.isArray;
}

export function createBaseApiPropertyOptions(options: BaseOptions): ApiPropertyOptions {
    const arraySizeOptions = toArraySizeOptions(options);

    return {
        example: options.example,
        name: options.name,
        description: options.description,
        isArray: !!options.isArray,
        maxItems: arraySizeOptions?.maxItems,
        minItems: arraySizeOptions?.minItems,
        nullable: options.nullable,
        required: !options.optional,
        deprecated: options.deprecated,
    };
}
