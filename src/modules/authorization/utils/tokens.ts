import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import config from 'configs/app.config';

import { AuthJwtPayload, AuthPayload } from '../interfaces';

const { secrets, ttl } = config.security;

export const generateAccessToken = (payload: AuthPayload): string => {
  return jwt.sign(payload, secrets.accessToken, { expiresIn: ttl.accessToken });
};

export const verifyAccessToken = (token: string): AuthJwtPayload => {
  try {
    return jwt.verify(token, secrets.accessToken) as AuthJwtPayload;
  } catch (err) {
    throw new UnauthorizedException('Invalid access token');
  }
};

export const generateRefreshToken = (payload: Partial<AuthPayload>): string => {
  return jwt.sign(payload, secrets.refreshToken, { expiresIn: ttl.refreshToken });
};

export const verifyRefreshToken = (token: string): AuthJwtPayload => {
  try {
    return jwt.verify(token, secrets.refreshToken) as AuthJwtPayload;
  } catch (err) {
    throw new UnauthorizedException('Invalid refresh token');
  }
};
