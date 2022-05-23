import { Constructor, Target } from '@hippo-oss/dto-decorators';

import { pickOpenAPIProperties } from './openapi';

/* Create a derived DTO class from the `Base` DTO class.
 */
export function derive<T extends Target>(
    Base: Constructor<T>,
    name: string,
): Constructor<T> {
    // NB: anonymous classes are named via their assigned variable
    return {
        [name]: class extends Base { },
    }[name];
}

/* Create a derived class that narrows the `Base` class by picking fields.
 */
export function pick<T extends Target, F extends keyof T, I extends keyof T>(
    Base: Constructor<T>,
    name: string,
    fields: F[],
    ignoreFields: I[] = [],
): Constructor<Pick<T, F>> {

    const operators = [
        pickOpenAPIProperties,
    ];

    return operators.reduce(
        (cls, operator) => operator(cls, fields, ignoreFields),
        derive(Base, name),
    );
}
