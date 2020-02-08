import userSchema from './userSchema';
import loginSchema from './loginSchema';
import validateCodeSchema from './validateCodeSchema';
import changePassword from './changePassword';
import updateUser from './updateUser';

const chooseSchema = schema => {
  let val = null;
  switch (schema) {
    case 'userSchema':
      val = userSchema;
      break;
    case 'loginSchema':
      val = loginSchema;
      break;
    case 'validateCodeSchema':
      val = validateCodeSchema;
      break;
    case 'changePassword':
      val = changePassword;
      break;
    case 'updateUser':
      val = updateUser;
      break;
    default:
      val = null;
      break;
  }
  return val;
};

export default chooseSchema;
