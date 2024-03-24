import { User } from 'modules/users/interfaces';
import { CreateUserDto } from 'modules/users/dto';

export class RegistrationDto extends CreateUserDto implements User {}
