import { DTODecoratorFactories } from '@hippo-oss/dto-decorators';

const noop = () => null;
const noopFactory = () => noop;

export const OPENAPI_DECORATORS: DTODecoratorFactories = {
    IsBoolean: noopFactory,
    IsDate: noopFactory,
    IsDateString: noopFactory,
    IsEnum: noopFactory,
    IsInteger: noopFactory,
    IsNested: noopFactory,
    IsNumber: noopFactory,
    IsString: noopFactory,
    IsUUID: noopFactory,
};

export const {
    IsBoolean,
    IsDate,
    IsDateString,
    IsEnum,
    IsInteger,
    IsNested,
    IsNumber,
    IsString,
    IsUUID,
} = OPENAPI_DECORATORS;
