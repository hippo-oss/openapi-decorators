import { IsUUIDOptions } from '@hippo-oss/dto-decorators';
import { ApiProperty } from '@nestjs/swagger';

import { createBaseApiPropertyOptions } from './base';

export function IsUUID(options: IsUUIDOptions): PropertyDecorator {
    return ApiProperty({
        ...createBaseApiPropertyOptions(options),

        type: 'string',
        format: 'uuid',
    });
}
