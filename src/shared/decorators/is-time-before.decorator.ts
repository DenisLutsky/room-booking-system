import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ async: true })
export class IsTimeBeforeConstraint implements ValidatorConstraintInterface {
  public validate(startTime: string, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const endTime = (args.object as unknown)[relatedPropertyName];

    return dayjs(startTime, 'HH:mm:ss').isBefore(dayjs(endTime, 'HH:mm:ss'));
  }

  public defaultMessage(args: ValidationArguments): string {
    return `${args.property} may not be after ${args.constraints[0]}`;
  }
}

export function IsTimeBefore(property: string, validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsTimeBeforeConstraint,
    });
  };
}
