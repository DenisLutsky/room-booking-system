import { createParamDecorator } from '@nestjs/common';

import { RequestContext } from 'shared/utils/async-storage';
import { AsyncStoreEntity } from 'shared/enums';
import { AuthPayload } from 'modules/authorization/interfaces';

export const User = createParamDecorator((key: keyof AuthPayload): unknown => {
  const user = RequestContext.get<AuthPayload>(AsyncStoreEntity.USER);

  if (!user) throw new Error('User was not found in request');

  return key ? user[key] : user;
});
