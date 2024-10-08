import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/global/role.type';

export const ROLES_KEY = 'ROLES_KEY';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
