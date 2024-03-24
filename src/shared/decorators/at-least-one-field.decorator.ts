import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'AtLeastOneField', async: false })
export class AtLeastOneField implements ValidatorConstraintInterface {
  public validate(_: unknown, args: ValidationArguments): boolean {
    const object = args.object;
    const fields = args.constraints;

    return fields.some((field) => object[field] !== undefined && object[field] !== null && object[field] !== '');
  }

  public defaultMessage(args: ValidationArguments): string {
    return `At least one of the following fields must be provided: ${args.constraints.join(', ')}`;
  }
}
