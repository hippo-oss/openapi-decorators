import { IsNumberOptions } from '@hippo-oss/dto-decorators';
import { ApiProperty } from '@nestjs/swagger';

import { createBaseApiPropertyOptions } from './base';

export function IsNumber(options: IsNumberOptions): PropertyDecorator {
    return ApiProperty({
        ...createBaseApiPropertyOptions(options),

        type: 'number',
        maximum: options.maxValue,
        minimum: options.minValue,
    });
}
