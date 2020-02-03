import userSchema from './userSchema';
import loginSchema from './loginSchema';

const chooseSchema = schema => {
  let val = null;
  switch (schema) {
    case 'userSchema':
      val = userSchema;
      break;
    case 'loginSchema':
      val = loginSchema;
      break;
    default:
      val = null;
      break;
  }
  return val;
};

export default chooseSchema;
