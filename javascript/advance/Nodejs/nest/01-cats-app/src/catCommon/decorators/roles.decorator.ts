import { SetMetadata } from "../../common";

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
