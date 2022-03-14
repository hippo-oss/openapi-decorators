import { IsDateStringOptions } from '@hippo-oss/dto-decorators';
import { ApiProperty } from '@nestjs/swagger';

import { createBaseApiPropertyOptions } from './base';

export function IsDateString(options: IsDateStringOptions): PropertyDecorator {
    return ApiProperty({
        ...createBaseApiPropertyOptions(options),

        // OpenAPI expresses dates and datetimes as a string format (either 'date' or 'date-time')
        type: 'string',
        format: options?.format ?? 'date',
    });
}
