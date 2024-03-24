import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const BEARER_PREFIX = 'Bearer ';

@ValidatorConstraint({ async: false })
class IsBearerConstraint implements ValidatorConstraintInterface {
  public validate(token: string, args: ValidationArguments): boolean {
    if (typeof token === 'string' && token.startsWith(BEARER_PREFIX)) {
      args.object[args.property] = token.slice(BEARER_PREFIX.length);

      return true;
    }
    return false;
  }

  public defaultMessage(args: ValidationArguments): string {
    return `${args.property} is not a Bearer token`;
  }
}

export const IsBearer = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBearerConstraint,
    });
  };
};
