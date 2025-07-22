import { controllerHandler } from "./controllerHandler";
import { isBodyPresent } from "./isBodyPresent";
import { jwtExpire } from "./jwtExpire";

export const Middleware = { isBodyPresent, jwtExpire, controllerHandler };
