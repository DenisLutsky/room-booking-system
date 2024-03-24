import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ async: true })
export class IsDateBeforeConstraint implements ValidatorConstraintInterface {
  public validate(startDate: string, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const endDate = (args.object as unknown)[relatedPropertyName];

    if (!startDate || !endDate) return true;

    return dayjs(startDate).isBefore(dayjs(endDate));
  }

  public defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be before ${args.constraints[0]}`;
  }
}

export function IsDateBefore(property: string, validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsDateBeforeConstraint,
    });
  };
}
