import {
    IsBoolean,
    IsDate,
    IsDateString,
    IsEnum,
    IsInteger,
    IsNested,
    IsNumber,
    IsString,
    IsUUID,
} from '../decorators';

describe('decorators', () => {
    it('transforms and validates', () => {
        enum FixtureEnum {
            Foo = 'Foo',
            Bar = 'Bar',
        }

        class FixtureChild {
            @IsString({
            })
            name!: string;
        }

        class Fixture {
            @IsBoolean({
            })
            booleanValue!: boolean;

            @IsDate({
            })
            dateValue!: Date;

            @IsDateString({
            })
            dateStringValue!: string;

            @IsEnum({
                enum: FixtureEnum,
            })
            enumValue!: FixtureEnum;

            @IsInteger({
            })
            integerValue!: number;

            @IsNested({
                type: FixtureChild,
            })
            nestedValue!: FixtureChild;

            @IsNumber({
            })
            numberValue!: number;

            @IsString({
            })
            stringValue!: string;

            @IsUUID({
            })
            uuidValue!: string;
        }

        expect(Fixture).toBeDefined();
    });
});
