export enum EmailStatus {
  VERIFIED = 'VERIFIED',
  NOT_VERIFIED = 'NOT_VERIFIED',
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  CUSTOMER = 'CUSTOMER',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  FROZEN = 'FROZEN',
  DELETED = 'DELETED',
}

export enum ResponseCode {
  ALREADY_EXIST = 403,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  SUCCESS = 200,
  SERVER_ERROR = 500,
  INVALID_DATA = 422,
}
