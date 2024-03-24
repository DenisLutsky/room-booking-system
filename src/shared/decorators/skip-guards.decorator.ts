import { CanActivate, CustomDecorator, SetMetadata } from '@nestjs/common';
import { MetaDataKey } from '../enums';

// eslint-disable-next-line @typescript-eslint/ban-types
export const SkipGuards = (...guards: (CanActivate | Function)[]): CustomDecorator<MetaDataKey> => {
  return SetMetadata(MetaDataKey.GUARDS, guards);
};
