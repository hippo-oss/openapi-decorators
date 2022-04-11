import { IsBooleanOptions } from '@hippo-oss/dto-decorators';
import { ApiProperty } from '@nestjs/swagger';

import { createBaseApiPropertyOptions } from './base';

export function IsBoolean(options: IsBooleanOptions = {}): PropertyDecorator {
    return ApiProperty({
        ...createBaseApiPropertyOptions(options),

        type: 'boolean',
    });
}
