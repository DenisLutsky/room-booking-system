import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCVV(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      name: 'isCVV',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, _: ValidationArguments): boolean {
          const regExp = new RegExp('^[0-9]{3,4}$');
          return typeof value === 'string' && regExp.test(value);
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a valid CVV (3 or 4 digits)`;
        },
      },
    });
  };
}
