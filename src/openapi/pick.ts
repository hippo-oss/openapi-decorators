import 'reflect-metadata';
import { Constructor, Target } from '@hippo-oss/dto-decorators';
import { trimStart } from 'lodash';

/* @nestjs/swagger does not expose its internal metadata operations, so we partially
 * reproduce them here. Obviously, this code takes advantage of internal functionality
 * and may be subject to regression if the underlying library changes its implementation.
 */

/* The Reflect metadata key used to store the array of OpenAPI properties.
 */
const OPENAPI_PROPERTIES_ARRAY = 'swagger/apiModelPropertiesArray';

/* Set the the OpenAPI properties array.
 */
export function setPropertiesArray<T, F extends keyof T>(cls: Constructor<T>, fields: F[]): void {
    const propertiesArray = fields.map(
        (name: F): string => `:${String(name)}`,
    );

    // eslint-disable-next-line @typescript-eslint/ban-types
    Reflect.defineMetadata(OPENAPI_PROPERTIES_ARRAY, propertiesArray, cls.prototype as {});
}

/* Get the the OpenAPI properties array as fields.
 */
export function getPropertiesArray<T, F extends keyof T>(cls: Constructor<T>): F[] {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const propertiesArray = Reflect.getMetadata(OPENAPI_PROPERTIES_ARRAY, cls.prototype as {}) as unknown as string[];

    return (propertiesArray || []).map(
        (name: string) => trimStart(name, ':') as F,
    );
}

/* Narrow OpenAPI properties by picking the provided fields.
 */
export function pickOpenAPIProperties<T extends Target, F extends keyof T, I extends keyof T>(
    cls: Constructor<T>,
    fields: F[],
    ignoreFields: I[] = [],
): Constructor<T> {
    const propertiesArray: (keyof T)[] = getPropertiesArray(cls);

    setPropertiesArray(
        cls,
        propertiesArray.filter(
            (field) => fields.includes(field as F) && !ignoreFields.includes(field as I),
        ),
    );

    return cls;
}
