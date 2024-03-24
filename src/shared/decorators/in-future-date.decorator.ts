import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import dayjs from 'dayjs';

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, _: ValidationArguments) {
          const now = dayjs().startOf('day');
          const date = dayjs(value);
          return date.isAfter(now);
        },
        defaultMessage: (_: ValidationArguments) => {
          return `${propertyName} must be a future date`;
        },
      },
    });
  };
}
