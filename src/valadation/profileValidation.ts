import Joi from 'joi';
import { EStatus, type IDataResponse } from '../types/response';
import {
  type IUpdateUserReq,
  type IChangePasswordUserReq,
} from '../types/user';

const changePasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
});

const updateUserSchema = Joi.object({
  fullName: Joi.string().required(),
  cccd: Joi.string().required(),
  sex: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  dateOfBith: Joi.string().required(),
  job: Joi.string().required(),
  income: Joi.string().required(),
  loanPurpose: Joi.string().required(),
  address: Joi.string().required(),
  phoneNumberRelatives: Joi.string().required(),
  relationship: Joi.string().required(),
});

function changePasswordValidation(
  body: IChangePasswordUserReq,
): IDataResponse | undefined {
  const valid = changePasswordSchema.validate(body);
  if (valid.error) {
    const dataResponse: IDataResponse = {
      status: EStatus.ERROR,
      message: valid.error?.details[0].message,
    };
    return dataResponse;
  }
}

function updateUserValidation(
  body: IUpdateUserReq,
): IDataResponse | undefined {
  const valid = updateUserSchema.validate(body);
  if (valid.error) {
    const dataResponse: IDataResponse = {
      status: EStatus.ERROR,
      message: valid.error?.details[0].message,
    };
    return dataResponse;
  }
}

export { changePasswordValidation, updateUserValidation };
