import userSchema from './userSchema';

const chooseSchema = schema => {
  let val = null;
  switch (schema) {
    case 'userSchema':
      val = userSchema;
      break;
    default:
      val = null;
      break;
  }
  return val;
};

export default chooseSchema;
