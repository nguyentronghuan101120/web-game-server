export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export const HttpMessage = {
  OK: 'OK',
  CREATED: 'Created',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  CONFLICT: 'Duplicate data',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  USER_ALREADY_EXISTS: 'User/Email already exists',
  USER_NOT_FOUND: 'User not found',
  PASSWORD_INCORRECT: 'Password is incorrect',
  SIGN_IN_SUCCESS: 'Sign in success',
  SIGN_UP_SUCCESS: 'Sign up success',
};
