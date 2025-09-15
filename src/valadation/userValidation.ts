import Joi from 'joi';
import { EStatus, type IDataResponse } from '../types/response';
import { type IChangePasswordReq } from '../types/user';

const changePasswordSchema = Joi.object({
  id: Joi.number().required(),
  newPassword: Joi.string().min(6).max(30).required(),
});

function changePasswordValidation(
  body: IChangePasswordReq,
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

export { changePasswordValidation };
