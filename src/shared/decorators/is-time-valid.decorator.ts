import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import dayjs from 'dayjs';

export function IsTimeValid(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      name: 'isTimeValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, _: ValidationArguments) {
          return dayjs(value, 'HH:mm:ss', true).isValid(); // Validating the time format, to represent the 'time' data type in PostgreSQL
        },
        defaultMessage: (_: ValidationArguments) => {
          return `${propertyName} must be a valid time in the format 'HH:mm:ss`;
        },
      },
    });
  };
}
