import userSchema from './userSchema';
import loginSchema from './loginSchema';
import validateCodeSchema from './validateCodeSchema';
import changePassword from './changePassword';
import updateUser from './updateUser';
import childSchema from './childSchema';
import denunciaSchema from './denunciaSchema';

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
    case 'childSchema':
      val = childSchema;
      break;
    case 'denunciaSchema':
      val = denunciaSchema;
      break;
    default:
      val = null;
      break;
  }
  return val;
};

export default chooseSchema;
