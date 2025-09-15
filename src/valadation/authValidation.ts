import Joi from 'joi';
import {
  IConfirmOtpRegister,
  type IUserLogin,
  type IUserRegister,
} from '../types/auth';
import { EStatus, type IDataResponse } from '../types/response';
import { type Request } from 'express';

const registerSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
  fullName: Joi.string().required(),
  deviceId: Joi.string().optional(),
  email: Joi.string().required(),
});
function registerValidation(
  req: Request<unknown, unknown, IUserRegister>,
): IDataResponse | undefined {
  const valid = registerSchema.validate(req.body ?? {});

  if (valid.error) {
    const dataResponse: IDataResponse = {
      status: EStatus.ERROR,
      message: valid.error?.details[0].message,
    };
    return dataResponse;
  }
}

const loginSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
  deviceId: Joi.string().optional(),
  fcmToken: Joi.string().optional(),
});

function loginValidation(
  req: Request<unknown, unknown, IUserLogin>,
): IDataResponse | undefined {
  const valid = loginSchema.validate(req.body ?? {});
  if (valid.error) {
    const dataResponse: IDataResponse = {
      status: EStatus.ERROR,
      message: valid.error?.details[0].message,
    };
    return dataResponse;
  }
}

const confirmOtpRegisterSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  otp: Joi.string().min(4).max(4).required(),
});
function confirmOtpRegisterValidation(
  data?: IConfirmOtpRegister,
): IDataResponse | undefined {
  const valid = confirmOtpRegisterSchema.validate(data ?? {});

  if (valid.error) {
    const dataResponse: IDataResponse = {
      status: EStatus.ERROR,
      message: valid.error?.details[0].message,
    };
    return dataResponse;
  }
}

export {
  registerValidation,
  loginValidation,
  confirmOtpRegisterValidation,
};
