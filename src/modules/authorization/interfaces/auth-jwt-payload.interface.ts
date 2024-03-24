import * as jwt from 'jsonwebtoken';
import { AuthPayload } from './auth-payload.interface';

export interface AuthJwtPayload extends jwt.JwtPayload, AuthPayload {}
