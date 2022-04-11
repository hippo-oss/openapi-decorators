import { IsStringOptions } from '@hippo-oss/dto-decorators';
import { ApiProperty } from '@nestjs/swagger';

import { createBaseApiPropertyOptions } from './base';

export function IsString(options: IsStringOptions = {}): PropertyDecorator {
    return ApiProperty({
        ...createBaseApiPropertyOptions(options),

        type: 'string',
        maxLength: options.maxLength,
        minLength: options.minLength,
    });
}
