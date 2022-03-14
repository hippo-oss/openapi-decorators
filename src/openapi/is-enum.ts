import { IsEnumOptions } from '@hippo-oss/dto-decorators';
import { ApiProperty } from '@nestjs/swagger';

import { createBaseApiPropertyOptions } from './base';

export function IsEnum(options: IsEnumOptions): PropertyDecorator {
    return ApiProperty({
        ...createBaseApiPropertyOptions(options),

        enum: options.enum,
        enumName: options.enumName,
    });
}
