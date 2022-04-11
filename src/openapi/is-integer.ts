import { IsIntegerOptions } from '@hippo-oss/dto-decorators';
import { ApiProperty } from '@nestjs/swagger';

import { createBaseApiPropertyOptions } from './base';

export function IsInteger(options: IsIntegerOptions = {}): PropertyDecorator {
    return ApiProperty({
        ...createBaseApiPropertyOptions(options),

        type: 'integer',
        maximum: options.maxValue,
        minimum: options.minValue,
    });
}
