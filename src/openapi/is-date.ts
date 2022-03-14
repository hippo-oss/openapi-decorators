import { IsDateOptions } from '@hippo-oss/dto-decorators';
import { ApiProperty } from '@nestjs/swagger';

import { createBaseApiPropertyOptions } from './base';

export function IsDate(options: IsDateOptions): PropertyDecorator {
    return ApiProperty({
        ...createBaseApiPropertyOptions(options),

        // OpenAPI expresses dates as a string format (either 'date' or 'date-time')
        type: 'string',
        format: options?.format ?? 'date-time',
    });
}
