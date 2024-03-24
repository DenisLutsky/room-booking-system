import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import dayjs from 'dayjs';

export function IsDateValid(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      name: 'isDateValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, _: ValidationArguments) {
          return dayjs(value, 'YYYY-MM-DD', true).isValid(); // Validating the date format, to represent the 'date' data type in PostgreSQL
        },
        defaultMessage: (_: ValidationArguments) => {
          return `${propertyName} must be a valid date in the format 'YYYY-MM-DD'`;
        },
      },
    });
  };
}
